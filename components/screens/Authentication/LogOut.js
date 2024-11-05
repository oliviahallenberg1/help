import React from 'react';
import { View, Button } from 'react-native';
import { styles } from '../../styles';
import { auth } from '../../../firebaseConfig.js';
import { signOut } from '@firebase/auth';

const LogOut = () => {

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully!");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
  );
};

export default LogOut;

