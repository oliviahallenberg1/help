
import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MyMain() {
    const navigation = useNavigation();
    return (
        <View>
            <Button title="Shelf" onPress={() => navigation.navigate('Shelf')}/>
            <Button title="Favorites" onPress={() => navigation.navigate('Favorites')}/>
            <Button title="Shopping list" onPress={() => navigation.navigate('ShoppingList')}/>
            <Button title="Share" onPress={() => console.log('todo')}/>
        </View>
    );
}
