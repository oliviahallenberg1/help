import { Button, FlatList,  Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles'
import EmptyList from './EmptyList';

export default function List({ route }) {
    const { cocktails } = route.params;
    const navigation = useNavigation(); 
    return (
        <FlatList
        data={cocktails}
        ListEmptyComponent={EmptyList}
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
