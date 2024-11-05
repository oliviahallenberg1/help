import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Search from './Search';
import LogOut from './Authentication/LogOut';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
