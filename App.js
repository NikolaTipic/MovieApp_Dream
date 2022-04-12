import * as React from 'react';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Screens
import Home from './screens/Home';
import Search from './screens/Search';
//Const
import Constants from './components/Constants';
//Icons
import { Ionicons } from '@expo/vector-icons';
//Dimensions
import { widthPercentToDp as wp, heightPercentToDp as hp } from './components/Dimensions';
//react-native comp
import { TouchableOpacity } from 'react-native';
//navigation bar
import * as NavigationBar from 'expo-navigation-bar';

const Stack = createNativeStackNavigator();

function App() {

  NavigationBar.setVisibilityAsync("visible");
  NavigationBar.setBackgroundColorAsync(Constants.baseColor);


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: "center"}}>
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={({navigation}) => ({
            title: "Movies",
            headerStyle: { backgroundColor: Constants.baseColor},
            headerTitleStyle: { color: Constants.textColor},
            headerLeft: () => <Ionicons 
                                name="menu" 
                                size={hp(4)}
                                color={Constants.textColor}
                              />,
            headerRight: () =>  <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                                  <Ionicons 
                                  name="search" 
                                  size={hp(3)} 
                                  color={Constants.textColor} 
                                  />
                                </TouchableOpacity> 
          })} 
        />
        <Stack.Screen 
          name="Search" 
          component={Search}
          options={headerStyle}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const headerStyle = {
  title: "Search",
  headerTintColor: Constants.textColor,
  headerStyle: { backgroundColor: Constants.baseColor}
}

export default App;