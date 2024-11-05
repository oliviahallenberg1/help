import React, { useState, useEffect } from 'react';
import { ScrollView, View} from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';

import { auth } from '../../../firebaseConfig.js';
import { styles } from '../../styles';
import AuthForm from './AuthForm.js';
import LogOut from './LogOut.js';

const Login = () => {
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
        console.log("User signed in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User created successfully!");  
      }
    } catch (error) {
      console.error('Authentication error:', error.code, error.message);
    }
  };

  const toggleLoginMode = () => setIsLogin(prevState => !prevState);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully!");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <LogOut user={user} handleLogout={handleLogout}></LogOut>
      ) : (
        <AuthForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          handleAuthentication={handleAuthentication}
          toggleLoginMode={toggleLoginMode}
        />
      )}
    </ScrollView>
  );
};

export default Login;

