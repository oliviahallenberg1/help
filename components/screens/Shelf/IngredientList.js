import { FlatList,  Text, View, StyleSheet, Button} from 'react-native';
import { getDatabase, ref,  remove } from 'firebase/database'
import {app, auth} from '../../../firebaseConfig';
import { styles } from '../../styles';


export default function IngredientList({ ingredients }) {

    const database = getDatabase(app);
    const user = auth.currentUser;

    const handleDelete = (itemKey) => {
        if (user) {
          const uid = user.uid;
          remove(ref(database, `users/${uid}/shelf/ingredients/${itemKey}`))
          .then(() => console.log("Item deleted"))
          .catch((error) => {
          console.error(error);
        });
      }
    }  
    return (
        <FlatList
        data={ingredients}
        renderItem={({item}) =>
          <View style={filestyles.horizontal}>
              <Text key={item.key} style={styles.normalText}>{item.name} </Text>
              <Button style={styles.button} title="Delete" onPress={() => handleDelete(item.key)}></Button>
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
  