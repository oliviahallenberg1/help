import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Search from './Cocktails/Search';
import LogOut from './Authentication/LogOut';
import { styles } from '../styles';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Shake and Serve</Text>
      <Search></Search>
      <LogOut></LogOut>
      <StatusBar style="auto" />
    </View>
  );
}


