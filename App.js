import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './src/components/Main.jsx';
import VoucherView from './src/components/Views/Voucher_View.jsx';
import Login from './src/components/Views/Login.jsx';
import Registrar from './src/components/Views/Registrar.jsx';
import firebase from './src/components/utils/Firebase.js';

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" options={{ headerShown: false }}>
          {(props) => <Main {...props} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />}
        </Stack.Screen>
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
        <Stack.Screen name="Registrar" component={Registrar} options={{ headerShown: false }} />
        <Stack.Screen name="Comprobantes" component={VoucherView} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


