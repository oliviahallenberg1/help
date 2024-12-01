
import { Button, Text, View } from "react-native";
import { styles } from "../../styles";

export default function GetStarted({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Shake and serve</Text>
            <Button title='Get started' onPress={() => navigation.navigate('Login')}></Button>
        </View>
    );
}