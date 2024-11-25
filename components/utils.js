
import { getDatabase, get, push, ref, remove, set } from 'firebase/database'
import { app, auth } from '../firebaseConfig';
import { Alert } from 'react-native';

export const handleDelete = (uid, itemKey, path, database) => {
    if (!uid) {
        console.error("No user uid");
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

export const handleSave = async (uid, database, item, path, resetItem) => {
    if (!item.name) {
        Alert.alert('Please type the name of the item first');
        return;
    }
    if (!uid) {
        console.error("User ID is missing");
        return;
    }
    const itemsRef = ref(database, `users/${uid}/${path}`);
    try {
        const snapshot = await get(itemsRef);
        const itemsList = snapshot.exists() ? snapshot.val() : {};
        const itemExists = Object.values(itemsList).some(
            existingItem => existingItem.name.toLowerCase() === item.name.toLowerCase()
        );
        if (itemExists) {
            Alert.alert('This item is already on the list');
            resetItem({ name: '' });
        } else {
            await push(itemsRef, item);
            console.log('Item added successfully');
            resetItem({ name: '' });
        }
    } catch (error) {
        console.error('Error saving the item:', error);
        Alert.alert('An error occurred while saving the item');
    }
};

export const handleMoveItem = async (database, fromPath, toPath, itemKey) => {
    const sourceRef = ref(database, `${fromPath}/${itemKey}`);
    const targetRef = ref(database, `${toPath}/${itemKey}`); 
    try {
        const snapshot = await get(sourceRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            await set(targetRef, data);
            await remove(sourceRef);
            console.log(`Success`);
        } 
    } catch (error) {
        console.error(`Error moving the item:`, error);
    }
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

