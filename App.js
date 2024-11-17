import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/screens/Authentication/Login';
import HomePage from './components/screens/HomePage';
import Shelf from './components/screens/My/Shelf';
import RecipePage from './components/screens/Cocktails/RecipePage';
import FavoritesList from './components/screens/My/FavoritesList';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
     <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Home' component={HomePage}/>
          <Stack.Screen name='Shelf' component={Shelf}/>
          <Stack.Screen name='Recipe' component={RecipePage}/>
          <Stack.Screen name='Favorites' component={FavoritesList}/>
        </Stack.Navigator>
     </NavigationContainer>
  );
}

