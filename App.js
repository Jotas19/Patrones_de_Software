import React from 'react' 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './src/components/Main.jsx'
import VoucherView from './src/components/Views/Voucher_View.jsx';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Main}  options={{ headerShown: false }} />
        <Stack.Screen name="Comprobantes" component={VoucherView} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer> 
  );
}


