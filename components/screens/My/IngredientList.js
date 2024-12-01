import { FlatList,  Text, View, Button, TouchableOpacity} from 'react-native';
import { getDatabase } from 'firebase/database'
import { app, auth } from '../../../firebaseConfig';
import { colors, styles } from '../../styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { handleDelete } from '../../utils';
import { fetchCocktailsByIngredient } from '../../../api';
import { useNavigation } from '@react-navigation/native';
import EmptyShelf from '../../emptyListComponents/EmptyShelf';

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
        const cocktails = Array.isArray(data.drinks) ? data.drinks : [];
        navigation.navigate('List', { cocktails });
      })
      .catch(err => console.error(err));
        navigation.navigate('List', { cocktails: [] });
    };

  return (
      <View>
          <FlatList
          data={ingredients}
          ListEmptyComponent={EmptyShelf}
          renderItem={({item}) =>
            <View style={styles.itemRow}>
               <TouchableOpacity onPress={() => handleFetch(item.name)}>
                  <Text style={styles.normalText}>{item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                      style={styles.deleteButton} 
                      onPress={() => deleteIngredient(item.key)} >
                           <AntDesign name="delete" size={18} color={colors.warning} />
                 </TouchableOpacity>
            </View> 
          }/>
       </View>
    );
}



  