import { Alert, Button, Text, TextInput, View } from "react-native";
import LogOut from "../Authentication/LogOut";
import { styles } from "../../styles";
import { useState } from "react";
import { getDatabase, ref, update } from 'firebase/database'; 
import { app, auth } from '../../../firebaseConfig'; 

export default function Settings() {
    const [userName, setUserName] = useState('');
    const database = getDatabase(app); 
    const user = auth.currentUser; 

    const changeUserName = () => {
        if (user) {
            const userRef = ref(database, 'users/' + user.uid + '/profile'); 
            update(userRef, {
                userName: userName, 
            })
            .then(() => {
                console.log('Username updated successfully');
                Alert.alert('Username saved!');
            })
            .catch((error) => {
                console.error('Error updating username:', error);
                Alert.alert('Failed to save username');
            });
        } else {
            console.log('No user is signed in');
            Alert.alert('Error', 'Please sign in to update your username');
        }
    };

    return (
        <View style={styles.container}>
            <Text>{user.userName}</Text>
            <TextInput 
                style={styles.input}
                placeholder="Username"
                onChangeText={text => setUserName(text)} 
                value={userName} 
            />
            <Button title="Save" onPress={changeUserName} />
            <LogOut /> 
        </View>
    );
}
