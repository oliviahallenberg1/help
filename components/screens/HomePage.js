import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Search from '../features/Search';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Shake and Serve</Text>
      <Search></Search>
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
