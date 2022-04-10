import * as React from 'react';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Screens
import Home from './screens/Home';
//Const
import Constants from './components/Constants';
//Icons
import { Ionicons } from '@expo/vector-icons';
//Dimensions
import { widthPercentToDp as wp, heightPercentToDp as hp } from './components/Dimensions';
//Search Screen
import Search from './screens/Search';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: "center"}}>
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={headerStyle} 
        />
        <Stack.Screen 
          name="Search" 
          component={Search}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const headerStyle = {
  title: "Movies",
  headerStyle: { backgroundColor: Constants.baseColor},
  headerTitleStyle: { color: Constants.textColor},
  headerLeft: () => <Ionicons 
                      name="menu" 
                      size={hp(4)}
                      color={Constants.textColor}
                    />,
  headerRight: () => <Ionicons 
                        name="search" 
                        size={hp(3)} 
                        color={Constants.textColor} />
}

export default App;