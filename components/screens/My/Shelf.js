import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import { getDatabase, get, push, ref, onValue, remove } from 'firebase/database'
import {app, auth} from '../../../firebaseConfig';
import IngredientList from './IngredientList';
import { styles } from '../../styles';
import { saveItem } from '../../utils';

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


    const handleSave = () => {
      if (user) {
          saveItem(user.uid, database, ingredient, 'shelf/ingredients', setIngredient);
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
          onPress={handleSave} />
        <IngredientList ingredients={ingredients}></IngredientList>
    </View>
  );
}

