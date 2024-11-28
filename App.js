import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Login from './components/screens/Authentication/Login';
import HomePage from './components/screens/HomePage';
import Shelf from './components/screens/My/Shelf';
import RecipePage from './components/screens/Cocktails/RecipePage';
import FavoritesList from './components/screens/My/FavoritesList';
import ShoppingList from './components/screens/My/ShoppingList';
import List from './components/screens/Cocktails/List'
import MyMain from './components/screens/My/MyMain';

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeStack = () => (
    <Stack.Navigator
    screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Recipe" component={RecipePage} />
    </Stack.Navigator>
  );
  
  const MyStack = () => (
    <Stack.Navigator>
      <Stack.Screen 
        name="My Page" 
        component={MyMain} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Shelf" 
        component={Shelf} 
        options={{ headerShown: true, title: "Shelf" }} 
      />
      <Stack.Screen 
        name="Favorites" 
        component={FavoritesList} 
        options={{ headerShown: true, title: "Favorites" }} 
      />
      <Stack.Screen 
        name="ShoppingList" 
        component={ShoppingList} 
        options={{ headerShown: true, title: "Shopping List" }} 
      />
      <Stack.Screen 
        name="List" 
        component={List} 
        options={{ headerShown: true, title: "Cocktail List" }} 
      />
      <Stack.Screen 
        name="Recipe" 
        component={RecipePage} 
        options={{ headerShown: true, title: "Recipe" }} 
      />
    </Stack.Navigator>
  );
  

  const MainTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarIcon: ({ color, size }) => {
          let iconName;
  
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Me') {
            iconName = 'person';
          }
  
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Me" component={MyStack} />
    </Tab.Navigator>
  );
  
  
  export default function App() {

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Back" component={MyStack} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
