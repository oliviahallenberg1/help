import React from 'react';
import { View, Button } from 'react-native';
import { styles } from '../../styles';

const LogOut = ({ handleLogout }) => {
  return (
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
  );
};

export default LogOut;

