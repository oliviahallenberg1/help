import { useState, useEffect } from 'react';
import { Button, FlatList,  Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import {app, auth} from '../../../firebaseConfig';


export default function FavoritesList() {

    const navigation = useNavigation(); 
    const database = getDatabase(app);
    const user = auth.currentUser;
    const [favorites, setFavorites] = useState([]);

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
        renderItem={({ item }) => 
            <View style={{ margin: 10}}>
                <Text style={{ fontSize: 22, fontWeight: 'bold'}}>{item.strDrink}</Text>
                <Button title='Go to recipe' onPress={()=> navigation.navigate('Recipe', { id: item.idDrink })}/>
            </View> 
           }
        />
    );
}
