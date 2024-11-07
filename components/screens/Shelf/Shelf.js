import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import { getDatabase, get, push, ref, onValue, remove } from 'firebase/database'
import {app, auth} from '../../../firebaseConfig';
import IngredientList from './IngredientList';
import { styles } from '../../styles';

const database = getDatabase(app);

export default function Shelf() {

    const [ingredient, setIngredient] = useState({name : ''});
    const [ingredients, setIngredients] = useState([]);
    const user = auth.currentUser;


    useEffect (() => {
      if (user) {
        const uid = user.uid;
        const ingredientsRef = ref(database, `/users/${uid}/shelf/ingredients`);
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

    const handleSave = async () => {
      if (!ingredient.name) {
        Alert.alert('Type your ingredient first');
        return;
      }
      if (user) {
        const uid = user.uid;
        const ingredientsRef = ref(database, `users/${uid}/shelf/ingredients`);
        try {
          const snapshot = await get(ingredientsRef);
          const ingredientsList = snapshot.exists() ? snapshot.val() : {};
          const ingredientExists = Object.values(ingredientsList).some(
            item => item.name.toLowerCase() === ingredient.name.toLowerCase()
          );
          if (ingredientExists) {
            Alert.alert('Ingredient is already on the list');
            setIngredient({ name: '' });
          } else {
            await push(ingredientsRef, ingredient);
            console.log('Ingredient added successfully');  
            setIngredient({ name: '' });
          }
        } catch (error) {
          console.error('Error checking or adding ingredient:', error);
          Alert.alert('An error occurred while saving the ingredient');
        }
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

