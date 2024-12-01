import { useState } from 'react';
import {  ActivityIndicator, Button, StatusBar, Text, TextInput, View } from 'react-native';
import { colors, styles } from '../../styles.js';
import { fetchCocktailsByIngredient, fetchCocktailsByName } from '../../../api.js'
import CocktailList from './CocktailList.js';

export default function Search({navigation}) {

  const [keyword, setKeyword] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchByName, setSearchByName] = useState(true);

  const handleFetch = () => {
    // if the keyword is empty, no rendering
    if (!keyword.trim()) {
      setCocktails([]);
      return;
    }
    setLoading(true); 
    const fetch = searchByName ? fetchCocktailsByName : fetchCocktailsByIngredient;
    fetch(keyword)
      .then(data => {
        if (data.drinks) {
          setCocktails(data.drinks);
        } else {
          setCocktails([]); 
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        setKeyword(''); 
        setLoading(false); 
      });
  };

  return (
    <View style={styles.container}>
      <Text>Search for cocktails</Text>
      <Text>You are now searching by {searchByName ? 'name': 'ingredient'}</Text>
      <Button 
        title={`Switch to ${searchByName ? 'searching by ingredient' : 'searching by name'}`}
        color={colors.highlight}
        onPress={() => setSearchByName(!searchByName)} />
      <TextInput
        style={styles.normalText}
        placeholder='Type keyword here'
        value={keyword}
        onChangeText={text => setKeyword(text)}/>
      <Button 
        title='Search'
        disabled={loading}
        color={colors.highlight}
        onPress={handleFetch} />
      <ActivityIndicator size='large' animating={loading} color={colors.highlight}/>
      <CocktailList cocktails={cocktails} navigation={navigation}/>
      <StatusBar style="auto" />
    </View>
  );
}


