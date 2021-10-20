import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import Store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/components/Login/Login';
import navigationTab from './src/components/navigationTab/navigationTab';
import { navigate, navigationRaf } from './src/NavigationRoot';
import Icons from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';



const Stack  = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer ref={navigationRaf}>
      <Provider store={Store}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen 
          name="Places" 
          component={navigationTab} 
          options={{ 
            headerLeft: null,
            headerRight:() => (
              <TouchableOpacity onPress={() => {
                navigate("Login");
              }}>
                <Icons name="power-off" size={26} style={{ paddingRight: 10, }} />
              </TouchableOpacity>

            )
           }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

