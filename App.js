import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from './components/styles';
import Login from './components/screens/Onboarding/Login';
import HomePage from './components/screens/HomePage';
import Shelf from './components/screens/My/Shelf';
import RecipePage from './components/screens/Cocktails/RecipePage';
import FavoritesList from './components/screens/My/FavoritesList';
import ShoppingList from './components/screens/My/ShoppingList';
import List from './components/screens/Cocktails/List'
import MyMain from './components/screens/My/MyMain';
import Settings from './components/screens/My/Settings';
import GetStarted from './components/screens/Onboarding/GetStarted';

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const OnboardingStack = () => {
    return(
    <Stack.Navigator initialRouteName="GetStarted">
      <Stack.Screen 
        name="Get Started" 
        component={GetStarted} 
        options={{ headerShown: false }} />
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: true, title: "Login to Shake and Serve" }} />
    </Stack.Navigator>
    );
  }

  const HomeStack = () => (
    <Stack.Navigator >
      <Stack.Screen 
        name="Home Page" 
        component={HomePage} 
        options={{ headerShown: false }} />
      <Stack.Screen 
        name="Recipe" 
        component={RecipePage} 
        options={{ headerShown: true, title: "Recipe" }} />
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
      <Stack.Screen 
        name="Settings" 
        component={Settings} 
        options={{ headerShown: true, title: "Settings" }} 
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
      tabBarActiveTintColor: colors.highlight, 
      tabBarInactiveTintColor: colors.light,  
      tabBarStyle: {
        backgroundColor: colors.tabBackground, 
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
        <Stack.Navigator initialRouteName="Onboarding"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
