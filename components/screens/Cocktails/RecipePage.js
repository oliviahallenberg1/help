import { Text, View, Image, StyleSheet, Button, Alert } from "react-native";
import { fetchCocktailById } from "../../../api";
import { useState, useEffect } from "react";
import { addToFavorites } from "../../utils";
import { colors, styles } from "../../styles";

export default function RecipePage({route}) {

    const { id } = route.params;
    const [recipe, setRecipe] = useState({
        id: '',
        name: '',
        img: '', 
        ingredients: [], 
        intructions: '' 
    });

    useEffect(() => {
        const handleFetch = () => {
            fetchCocktailById(id)
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
            };
        handleFetch();
    }, [id]);
    
return (
    <View>
        <Text>{recipe.name}</Text>
        <Image 
            style={styles.image}
            source={{ uri : recipe.img}}></Image>
            <Text>Ingredients:</Text>
                {recipe.ingredients.map((ingredient, index) => (
                <Text key={index}>{ingredient}</Text>
                ))}
        <Text>Instructions: {recipe.instructions}</Text>
        <Button 
            title='Fav' 
            color={colors.highlight}
            onPress={() => addToFavorites(recipe)}/>
    </View>
    );
}
