import { Button, FlatList,  Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, styles } from '../../styles'
import NoCocktails from '../../emptyListComponents/NoCocktails';

export default function List({ route }) {
    const { cocktails } = route.params;
    const navigation = useNavigation(); 
    return (
        <FlatList
        data={cocktails}
        ListEmptyComponent={NoCocktails}
        renderItem={({ item }) => 
            <View style={styles.itemRow}>
                <Text style={styles.normalText}>{item.strDrink}</Text>
                <Button 
                    title='Go to recipe' 
                    color={colors.highlight}
                    onPress={()=> navigation.navigate('Recipe', { id: item.idDrink })}/>
            </View> 
           }
        />
    );
}
