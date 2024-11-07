import { FlatList,  Text, View } from 'react-native';


export default function CocktailList({ cocktails }) {
    
    return (
        <FlatList
        data={cocktails}
        renderItem={({ item }) => 
            <View style={{ margin: 10}}>
                <Text style={{ fontSize: 22, fontWeight: 'bold'}}>{item.strDrink}</Text>
            </View> 
        }
        />
    );
}