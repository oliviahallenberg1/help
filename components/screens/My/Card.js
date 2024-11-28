import { Text,  TouchableOpacity,  View } from "react-native";
import { styles, colors } from "../../styles";
import { useNavigation } from "@react-navigation/native";

export default function Card({title, navigate}) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate(navigate)}>
            <View style={styles.card}>
                <Text style={{ color: 'white' }}>{title}</Text>
            </View>
        </TouchableOpacity>
    );

}