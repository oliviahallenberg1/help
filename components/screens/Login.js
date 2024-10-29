import React, { useState } from 'react';
import { Alert, View, TextInput, Button, Text, ActivityIndicator} from 'react-native';
import { styles } from '../styles.js';
import { FIREBASE_AUTH } from '../../firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = FIREBASE_AUTH;

    const signIn = async () => {
      setLoading(true);
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
      } catch (error) {
        console.log(error);
        console.log('Sign in failed')
      } finally {
        setLoading(false);
      }
    }

    const signUp = async () => {
      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    return (
        <View style={styles.container}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder='Email'
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder='Password'
            secureTextEntry={true}
          />
          { loading ? (<ActivityIndicator size='small' color='blue'/>) 
          : (<View> <Button title='Login' onPress={signIn} />
          <Button title='Sign up' onPress={signUp} />
          </View>)}
        </View>
      );
}

export default Login;