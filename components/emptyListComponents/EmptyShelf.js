import { Text } from 'react-native'
import { styles } from '../../styles'

export default function EmptyList() {

    return (
        <Text style={styles.normalText}>Your shelf is empty! Add ingredients you already have for cocktails.</Text>
    );  

}