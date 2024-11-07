import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/screens/Authentication/Login';
import HomePage from './components/screens/HomePage';
import Shelf from './components/screens/Shelf/Shelf';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
     <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Home' component={HomePage}/>
          <Stack.Screen name='Shelf' component={Shelf}/>
        </Stack.Navigator>
     </NavigationContainer>
  );
}

