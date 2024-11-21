import { useState, useEffect } from 'react';
import { Alert, FlatList,  Text, View, StyleSheet, Button, TextInput} from 'react-native';
import { getDatabase, get, push, ref, onValue } from 'firebase/database'
import { app, auth } from '../../../firebaseConfig';
import { styles } from '../../styles';
import { handleDelete, saveItem } from '../../utils';

export default function ShoppingList() {

   const database = getDatabase(app);
   const user = auth.currentUser;

   const [shoppingListItem, setShoppinglistItem] = useState({name : ''});
   const [shoppinglistItems, setShoppinglistItems] = useState([]);

   useEffect (() => {
     if (user) {
       const itemsRef = ref(database, `/users/${user.uid}/shoppinglist`);
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


  const handleSave = () => {
      if (user) {
          saveItem(user.uid, database, shoppingListItem, 'shoppinglist', setShoppinglistItem);
      }
  };

  const moveItem = (itemKey) => {
    if (user) {
      
    }
  };

  const deleteItem = (itemKey) => {
    if (user) {
        handleDelete(user.uid, itemKey, "shoppinglist", database);
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
  