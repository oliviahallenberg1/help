import { useState, useEffect } from 'react';
import { Button, FlatList,  Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database'
import {app, auth} from '../../../firebaseConfig';
import { handleDelete } from '../../utils';
import { colors, styles } from '../../styles';
import EmptyFavorites from '../../emptyListComponents/EmptyFavorites';


export default function FavoritesList() {

    const navigation = useNavigation(); 
    const database = getDatabase(app);
    const user = auth.currentUser;
    const [favorites, setFavorites] = useState([]);

    const deleteFavorite = (itemKey) => {
        if (user) {
            const uid = user.uid;
            handleDelete(uid, itemKey, "favorites", database);
        }
    };

    useEffect(() => {
        if (user) {
            const favoritesRef = ref(database, `/users/${user.uid}/favorites`);
            const unsubscribe = onValue(favoritesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const itemsArray = Object.keys(data).map((key) => ({
                        key: key,
                        ...data[key],
                    }));
                    setFavorites(itemsArray);
                } else {
                    setFavorites([]);
                }
            });
            return () => unsubscribe(); 
        }
    }, [user]);
    
    return (
        <FlatList
        data={favorites}
        ListEmptyComponent={EmptyFavorites}
        renderItem={({ item }) => 
            <View style={styles.itemRow}>
                <Text style={styles.normalText}>{item.name}</Text>
                <Button 
                    title='Go to recipe' 
                    color={colors.highlight}
                    onPress={()=> navigation.navigate('Recipe', { id: item.id })}/>
                <Button 
                    title='Remove' 
                    color={colors.warning}
                    onPress={() => deleteFavorite(item.key)}></Button>
            </View> 
           }
        />
    );
}
