import { Button, FlatList,  Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../styles'

export default function CocktailList({ cocktails }) {
    const navigation = useNavigation(); 
    return (
        <FlatList
        data={cocktails}
        renderItem={({ item }) => 
            <View style={{ margin: 10}}>
                <Text style={{ fontSize: 22, fontWeight: 'bold'}}>{item.strDrink}</Text>
                <Button 
                    title='Go to recipe' 
                    color={colors.highlight}
                    onPress={()=> navigation.navigate('Recipe', { id: item.idDrink })}/>
            </View> 
           }
        />
    );
}
