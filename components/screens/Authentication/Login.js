import React, { useState, useEffect } from 'react';
import { ScrollView} from 'react-native';

import { 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        onAuthStateChanged } 
        from '@firebase/auth';
import { auth } from '../../../firebaseConfig.js';
import { styles } from '../../styles';

import LoginForm from './LoginForm.js';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully");
        navigation.navigate('Home');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User created successfully");
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Authentication error:', error.code, error.message);
    }
  };

  const toggleLoginMode = () => setIsLogin(prevState => !prevState);

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          handleAuthentication={handleAuthentication}
          toggleLoginMode={toggleLoginMode}
        />
    </ScrollView>
  );
};

export default Login;

