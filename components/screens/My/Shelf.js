
import { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database'
import {app, auth} from '../../../firebaseConfig';
import IngredientList from './IngredientList';
import { styles } from '../../styles';
import { handleSave } from '../../utils';

const database = getDatabase(app);

export default function Shelf() {

    const [ingredient, setIngredient] = useState({name : ''});
    const [ingredients, setIngredients] = useState([]);
    const user = auth.currentUser;


    useEffect (() => {
      if (user) {
        const ingredientsRef = ref(database, `/users/${user.uid}/shelf/ingredients`);
        onValue(ingredientsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const ingredientsArray = Object.keys(data).map((key, index) => ({
              key: key,            
              ...Object.values(data)[index]
            }));
            setIngredients(ingredientsArray); 
          } else {
            setIngredients([])
          }
        })
      }
    }, [user])

    const saveItem = () => {
      if (user) {
          handleSave(user.uid, database, ingredient, 'shelf/ingredients', setIngredient);
      }
  };

  return (
    <View style={styles.container}>
      <TextInput style={{fontSize: 20}}
          placeholder='Add ingredient to shelf'
          onChangeText={text => setIngredient({...ingredient, name: text})}
          value={ingredient.name} />
      <Button 
          title='Add'
          onPress={saveItem} />
        <IngredientList ingredients={ingredients}></IngredientList>
    </View>
  );
}

