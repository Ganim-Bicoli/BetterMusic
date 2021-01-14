import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet} from 'react-native';
import Music from './components/musicPlayerPage'
import Home from './components/mainPage'
import Login from './components/LoginPage'


const Stack=createStackNavigator();
Stack.Navigator.defaultProps = {
  headerMode: 'none',
};

export default function App() {



  return (
    
    <NavigationContainer>
      <Stack.Navigator>
     
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Music" component={Music} />
      
      
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    
  },

});