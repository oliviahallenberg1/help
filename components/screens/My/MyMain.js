
import { View } from "react-native";
import { styles } from "../../styles";
import Card from "./Card";

export default function MyMain() {
    return (
        <View style={styles.cardContainer}>
            <Card title={'Shelf'} navigate={'Shelf'}></Card>
            <Card title={'Favorites'} navigate={'Favorites'}></Card>
            <Card title={'Shopping list'} navigate={'ShoppingList'}></Card>
            <Card title={'Settings'} navigate={'Settings'}></Card>
        </View>
    );
}
