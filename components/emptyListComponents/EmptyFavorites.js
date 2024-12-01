import { Text } from 'react-native'
import { styles } from '../styles'

export default function EmptyFavorites() {

    return (
        <Text style={styles.normalText}>You have not saved any favorite recipes! Start by searching recipes.</Text>
    );  

}