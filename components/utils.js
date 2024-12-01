
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
        const sourceSnapshot = await get(sourceRef);
        if (!sourceSnapshot.exists()) {
            console.error('Item not found in the source path.');
            Alert.alert('The item does not exist in the source list.');
            return;
        }
        const data = sourceSnapshot.val(); 
        const itemName = data.name.toLowerCase(); 
        // Check for duplicate in the target path
        const targetSnapshot = await get(ref(database, toPath));
        const targetList = targetSnapshot.exists() ? targetSnapshot.val() : {};
        const itemExists = Object.values(targetList).some(
            (existingItem) => existingItem.name.toLowerCase() === itemName
        );

        if (itemExists) {
            Alert.alert('The item is already on the shelf.');
            return;
        }
        // Move the item from source to target
        await set(targetRef, data); 
        await remove(sourceRef);   
        console.log('Item moved successfully');
    } catch (error) {
        console.error('Error moving the item:', error);
        Alert.alert('Error moving the item. Please try again.');
    }
};

export const addToFavorites = async (recipe) => {
    const database = getDatabase(app);
    const user = auth.currentUser;

    if (user) {
        const favoritesRef = ref(database, `users/${user.uid}/favorites`);
        try {
            const snapshot = await get(favoritesRef);
            const favoritesList = snapshot.exists() ? snapshot.val() : {};
            const favoriteExists = Object.values(favoritesList).some(
                existingItem => existingItem.id === recipe.id
            );
            if (favoriteExists) {
                Alert.alert('Recipe is already saved to favorites');
            } else {
                await push(favoritesRef, recipe);
                Alert.alert(`${recipe.name} Saved to favorites`)
                console.log('success');
            }
        } catch (error) {
            console.log('Error', error);
            Alert.alert('Error while saving item')
        }
    }
};

export const shareList = () => {
    
}

