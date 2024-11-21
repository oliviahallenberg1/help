import { useState, useEffect } from 'react';
import { Alert, FlatList,  Text, View, StyleSheet, Button, TextInput} from 'react-native';
import { getDatabase, get, push, ref, onValue } from 'firebase/database'
import { app, auth } from '../../../firebaseConfig';
import { styles } from '../../styles';
import { handleDelete } from '../../utils';


export default function ShoppingList() {

   const database = getDatabase(app);
   const user = auth.currentUser;

   const [shoppingListItem, setShoppinglistItem] = useState({name : ''});
   const [shoppinglistItems, setShoppinglistItems] = useState([]);

   useEffect (() => {
     if (user) {
       const uid = user.uid;
       const itemsRef = ref(database, `/users/${uid}/shoppinglist`);
       onValue(itemsRef, (snapshot) => {
         const data = snapshot.val();
         if (data) {
           const itemsArray = Object.keys(data).map((key, index) => ({
             key: key,            
             ...Object.values(data)[index]
           }));
           setShoppinglistItems(itemsArray); 
         } else {
           setShoppinglistItems([])
         }
       })
     }
   }, [user])

   const handleSave = async () => {
     if (!shoppingListItem.name) {
       Alert.alert('Type your ingredient first');
       return;
     }
     if (user) {
       const uid = user.uid;
       const itemsRef = ref(database, `users/${uid}/shoppinglist`);
       try {
         const snapshot = await get(itemsRef);
         const itemsList = snapshot.exists() ? snapshot.val() : {};
         const itemExists = Object.values(itemsList).some(
           item => item.name.toLowerCase() === shoppingListItem.name.toLowerCase()
         );
         if (itemExists) {
           Alert.alert('Item is already on the list');
           setShoppinglistItem({ name: '' });
         } else {
           await push(itemsRef, shoppingListItem);
           console.log('Item added successfully');  
           setShoppinglistItem({ name: '' });
         }
       } catch (error) {
         console.error('Error checking or adding item:', error);
         Alert.alert('An error occurred while saving the item');
       }
     }
   };

  const deleteItem = (itemKey) => {
    if (user) {
        const uid = user.uid;
        handleDelete(uid, itemKey, "shoppinglist", database);
    }
};
    return (
        <View>
            <TextInput style={{fontSize: 20}}
                placeholder='Add item to shoppinglist'
                onChangeText={text => setShoppinglistItem({...shoppingListItem, name: text})}
                value={shoppingListItem.name} />
            <Button 
                title='Add'
                onPress={handleSave} />
            <FlatList
                data={shoppinglistItems}
                renderItem={({item}) =>
                <View style={filestyles.horizontal}>
                    <Text key={item.key} style={styles.normalText}>{item.name} </Text>
                    <Button style={styles.button} title="Delete" onPress={() => deleteItem(item.key)}></Button>
                </View> 
            }/>
        </View>
    );
}


const filestyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    horizontal: {
      flex: 1,
      flexDirection: 'column'
    }
  });
  