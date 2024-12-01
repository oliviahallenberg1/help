import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { colors, styles } from '../styles';
import { getDatabase, ref, onValue } from 'firebase/database'; 
import { auth } from '../../firebaseConfig';
import Card from './Card';


export default function HomePage() {
  const user = auth.currentUser;
  const [username, setUsername] = useState('');
  const hasUserName = username !== '';
  const [showRandomRecipe, setRandomRecipe] = useState(true);

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
          <Text style={styles.h1} >Welcome back {username}</Text> : 
          <Text style={styles.normalText} >Welcome to Shake and Serve! Please, add your username in settings.</Text>)}
           <View style={styles.cardContainer}>
              <Card title={'Get a random cocktail'} navigate={'RandomRecipe'}></Card>
              <Card title={'Search for recipes'} navigate={'Search'}></Card>
           </View>
      <StatusBar style="auto" />
    </View>
  );
}


