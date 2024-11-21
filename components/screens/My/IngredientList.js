import { FlatList,  Text, View, StyleSheet, Button} from 'react-native';
import { getDatabase } from 'firebase/database'
import {app, auth} from '../../../firebaseConfig';
import { styles } from '../../styles';
import { handleDelete } from '../../utils';


export default function IngredientList({ ingredients }) {

   const database = getDatabase(app);
   const user = auth.currentUser;

  const deleteIngredient = (itemKey) => {
    if (user) {
        const uid = user.uid;
        handleDelete(uid, itemKey, "shelf/ingredients", database);
    }
};
    return (
        <FlatList
        data={ingredients}
        renderItem={({item}) =>
          <View style={filestyles.horizontal}>
              <Text key={item.key} style={styles.normalText}>{item.name} </Text>
              <Button style={styles.button} title="Delete" onPress={() => deleteIngredient(item.key)}></Button>
          </View> 
        }/>
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
  