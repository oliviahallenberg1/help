import { useState, useEffect } from 'react';
import { FlatList,  Text, View, StyleSheet, Button, TextInput} from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database'
import { app, auth } from '../../../firebaseConfig';
import { styles, colors } from '../../styles';
import { handleDelete, handleMoveItem, handleSave } from '../../utils';

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


  const saveItem = () => {
      if (user) {
          handleSave(user.uid, database, shoppingListItem, 'shoppinglist', setShoppinglistItem);
      }
  };

  const moveItem = async (itemKey) => {
    if (user) {
      const fromPath = `users/${user.uid}/shoppinglist`;
      const toPath = `users/${user.uid}/shelf/ingredients`;
      await handleMoveItem(database, fromPath, toPath, itemKey);
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
                onPress={saveItem} />
            <FlatList
                data={shoppinglistItems}
                renderItem={({item}) =>
                <View style={filestyles.horizontal}>
                    <Text key={item.key} style={styles.normalText}>{item.name} </Text>
                    <Button 
                        title='Move to shelf' 
                        color={colors.highlight}
                        onPress={()=>moveItem(item.key)}></Button>
                    <Button 
                        title="Delete" 
                        color={colors.warning}
                        onPress={() => deleteItem(item.key)}></Button>

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
  