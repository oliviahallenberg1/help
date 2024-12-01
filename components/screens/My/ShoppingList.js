import { useState, useEffect } from 'react';
import { FlatList,  Text, View, Button, TextInput, Alert, TouchableOpacity} from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database'
import { app, auth } from '../../../firebaseConfig';
import { styles, colors } from '../../styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { handleDelete, handleMoveItem, handleSave } from '../../utils';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import EmptyShoppingList from '../../emptyListComponents/EmptyShoppingList';

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

  const shareList = async () => {
    if (await Sharing.isAvailableAsync()) {
      try {
        const content = shoppinglistItems.map(item => `${item.name}`).join('\n');
        const filePath = `${FileSystem.documentDirectory}shoppinglist.txt`
        await FileSystem.writeAsStringAsync(filePath, content);
        await Sharing.shareAsync(filePath, {
          mimeType: 'text/plain', 
          dialogTitle: 'Share Shopping List', 
        });
      } catch (error) {
        console.log(error);
        Alert.alert('An error occured while sharing list. Try again later.')
      }
    } else {
      Alert.alert('Sharing is not available right now');
      console.log('Expo sharing is not supported');
    } 
  }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder='Add item to shoppinglist'
                onChangeText={text => setShoppinglistItem({...shoppingListItem, name: text})}
                value={shoppingListItem.name} />
            <Button 
                title='Add'
                color={colors.highlight}
                onPress={saveItem} />
            <FlatList
                data={shoppinglistItems}
                ListEmptyComponent={EmptyShoppingList}
                renderItem={({item}) =>
                <View style={styles.itemRow}>
                    <Text key={item.key} style={styles.normalText}>{item.name} </Text>
                    <Button 
                        title='Move to shelf' 
                        color={colors.highlight}
                        onPress={()=>moveItem(item.key)}></Button>
                    <TouchableOpacity 
                      style={styles.deleteButton} 
                      onPress={() => deleteItem(item.key)} >
                           <AntDesign name="delete" size={18} color={colors.warning} />
                    </TouchableOpacity>

                </View> 
            }/>
            <Button 
                title="Share shoppinglist" 
                color={colors.highlight}
                onPress={() => shareList()}></Button>
        </View>
    );
}


  