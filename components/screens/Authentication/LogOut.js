import React from 'react';
import { Button } from 'react-native';
import { auth } from '../../../firebaseConfig.js';
import { signOut } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LogOut = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully!");
      navigation.navigate('Login');
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
  );
};

export default LogOut;

