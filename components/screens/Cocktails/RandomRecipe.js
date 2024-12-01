import { Button, FlatList,  Text, View, Image } from 'react-native';
import {colors, styles} from '../../styles'
import { fetchRandomCocktail } from '../../../api';
import { useEffect, useState } from 'react';
import { addToFavorites } from '../../utils';

export default function RandomRecipe() {

    const [recipe, setRecipe] = useState({
        id: '',
        name: '',
        img: '', 
        ingredients: [], 
        intructions: '' 
    });

    useEffect(() => { 
        fetchRandomCocktail()
            .then(data => {
                const drink = data.drinks[0];
                setRecipe({
                    id: drink.idDrink,
                    name: drink.strDrink,
                    img: drink.strDrinkThumb,
                    ingredients: Object.keys(drink)
                        .filter(key => key.includes("strIngredient") && drink[key])
                        .map(key => drink[key]),
                    instructions: drink.strInstructions
                });
            })
         .catch(err => console.error(err));
    }, []);

    return (
    <View>
        <Text style={styles.h1}>{recipe.name}</Text>
        <Image 
            style={styles.image}
            source={
                recipe.img 
                    ? { uri: recipe.img } 
                    : require('../../../no-image.jpeg') 
            }
            >
            </Image>
            <Text style={styles.h2}>Ingredients:</Text>
                {recipe.ingredients.map((ingredient, index) => (
                <Text style={styles.normalText} key={index}>{ingredient}</Text>
                ))}
        <Text style={styles.h2}>Instructions: </Text>
        <Text style={styles.normalText}>{recipe.instructions}</Text>
        <Button 
            title='Add to favorites' 
            color={colors.highlight}
            onPress={() => addToFavorites(recipe)}/>
    </View>
    );
}
