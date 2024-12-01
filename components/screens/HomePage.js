import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Search from './Cocktails/Search';
import { styles } from '../styles';
import { getDatabase, ref, onValue } from 'firebase/database'; 
import { auth } from '../../firebaseConfig';

export default function HomePage() {
  const user = auth.currentUser;
  const [username, setUsername] = useState('');
  const hasUserName = username !== '';

  useEffect(() => {
    if (user) {
      const database = getDatabase();
      const userRef = ref(database, 'users/' + user.uid + '/profile');
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.userName) {
          setUsername(data.userName);
        }
      });
      return () => unsubscribe(); 
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {(hasUserName ? 
          <Text>Welcome back {username}</Text> : 
          <Text>Welcome to Shake and Serve! Please, add your username in settings.</Text>)}
      <Search></Search>
      <StatusBar style="auto" />
    </View>
  );
}


