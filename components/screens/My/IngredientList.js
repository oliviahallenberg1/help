import { useState } from 'react';
import { FlatList,  Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { getDatabase } from 'firebase/database'
import {app, auth} from '../../../firebaseConfig';
import { styles } from '../../styles';
import { handleDelete } from '../../utils';
import { fetchCocktailsByIngredient } from '../../../api';
import { useNavigation } from '@react-navigation/native';


export default function IngredientList({ ingredients }) {

   const database = getDatabase(app);
   const user = auth.currentUser;
   const navigation = useNavigation(); 

  const deleteIngredient = (itemKey) => {
      if (user) {
          const uid = user.uid;
          handleDelete(uid, itemKey, "shelf/ingredients", database);
      }
   };

  const handleFetch = (ingredient) => {
    fetchCocktailsByIngredient(ingredient)
      .then(data => {
          navigation.navigate('List', { cocktails: data.drinks }); 
      })
      .catch(err => console.error(err));
    };

  return (
      <View>
          <FlatList
          data={ingredients}
          renderItem={({item}) =>
            <View style={filestyles.horizontal}>
               <TouchableOpacity onPress={() => handleFetch(item.name)}>
                  <Text style={styles.normalText}>{item.name}</Text>
                </TouchableOpacity>
              <Button style={styles.button} title="Delete" onPress={() => deleteIngredient(item.key)}></Button>
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
  