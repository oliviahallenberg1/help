import { getDatabase, push, ref } from 'firebase/database';
import { app, auth } from '../firebaseConfig';
import { Alert } from 'react-native';

export const addToFavorites = (recipe) => {
    const database = getDatabase(app);
    const user = auth.currentUser;

    if (user) {
        push(ref(database, `users/${user.uid}/favorites`), recipe)
            .then(() => Alert.alert('Saved to favorites'))
            .catch((err) => console.error(err));
    }
};
