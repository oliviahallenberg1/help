import { getDatabase, push, ref, remove } from 'firebase/database';
import { app, auth } from '../firebaseConfig';
import { Alert } from 'react-native';

export const handleDelete = (uid, itemKey, path, database) => {
    if (!uid) {
        console.error("User ID is missing");
        return;
    }

    Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete this item?",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Deletion cancelled"),
                style: "cancel",
            },
            {
                text: "OK",
                onPress: () => {
                    const itemRef = ref(database, `users/${uid}/${path}/${itemKey}`);
                    remove(itemRef)
                        .then(() => console.log("Item deleted"))
                        .catch((error) => console.error("Error deleting item:", error));
                },
            },
        ]
    );
};

export const addToFavorites = (recipe) => {
    const database = getDatabase(app);
    const user = auth.currentUser;

    if (user) {
        push(ref(database, `users/${user.uid}/favorites`), recipe)
            .then(() => Alert.alert('Saved to favorites'))
            .catch((err) => console.error(err));
    }
};

