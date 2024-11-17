import { useState } from 'react';
import {  ActivityIndicator, Button, StatusBar, TextInput, View } from 'react-native';
import { styles } from '../../styles.js';
import { fetchCocktailsByName } from '../../../api.js'
import CocktailList from './CocktailList.js';

//TODO: Change to be search by ingredients! 
// search by ingredients should be possible 
// from shelf and also from recipes ingredient

export default function Search() {

  const [keyword, setKeyword] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(true);
    fetchCocktailsByName(keyword)
    .then(data => setCocktails(data.drinks))
    .catch(err => console.error(err))
    .finally(() => {
      setKeyword('');
      setLoading(false);
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.normalText}
        placeholder='Type keyword here'
        value={keyword}
        onChangeText={text => setKeyword(text)}/>
      <Button 
        title='Search'
        disabled={loading}
        onPress={handleFetch} />
      <ActivityIndicator size='large' animating={loading} color='#ff0074'/>
      <StatusBar style="auto" />
    </View>
  );
}


