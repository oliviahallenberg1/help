import { FlatList,  Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { getDatabase } from 'firebase/database'
import {app, auth} from '../../../firebaseConfig';
import { colors, styles } from '../../styles';
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
            <View style={styles.container}>
               <TouchableOpacity onPress={() => handleFetch(item.name)}>
                  <Text style={styles.normalText}>{item.name}</Text>
                </TouchableOpacity>
              <Button  
                  title="Delete" 
                  onPress={() => deleteIngredient(item.key)}
                  color={colors.warning}
                  ></Button>
            </View> 
          }/>
       </View>
    );
}



  