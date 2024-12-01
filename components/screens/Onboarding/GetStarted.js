
import { Image, Button, Text, View } from "react-native";
import { colors, styles } from "../../styles";

export default function GetStarted({navigation}) {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.logoImage}
                source={require ('../../../glasses.png')}></Image>
            <Text style={styles.normalText}>Shake and serve</Text>
            <Button 
                title='Get started' 
                color={colors.light}
                onPress={() => navigation.navigate('Login')}></Button>
        </View>
    );
}