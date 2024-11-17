import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button} from 'react-native';
import Search from './Cocktails/Search';
import LogOut from './Authentication/LogOut';

export default function HomePage({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Shake and Serve</Text>
      <Search></Search>
      <LogOut></LogOut>
      <Button title='shelf' onPress={()=> navigation.navigate('Shelf')}></Button>
      <Button title='favorites' onPress={()=> navigation.navigate('Favorites')}></Button>
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
