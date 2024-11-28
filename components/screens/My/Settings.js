import { View } from "react-native";
import LogOut from "../Authentication/LogOut";
import { styles } from "../../styles";

export default function Settings() {
    return (
        <View style={styles.container}>
            <LogOut></LogOut>
        </View>
    );
}