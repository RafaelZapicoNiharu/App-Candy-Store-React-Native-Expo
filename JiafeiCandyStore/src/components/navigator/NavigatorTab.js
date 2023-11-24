import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Telas
import TelaPerfil from "../../view/perfil/PerfilView"
import TelaFuncional from "../../view/funcional/FuncionalView"

//Nomes telas
const funcionalName = "HomeF";
const perfilName = "Perfil";

const Tab = createBottomTabNavigator();

function NavigatorTab() {
  return (
    <Tab.Navigator
      initialRouteName={funcionalName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === funcionalName) {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === perfilName) {
            iconName = focused ? 'list' : 'list-outline';

          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        activeTintColor: '#614a41',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 10, fontSize: 10, fontWeight: 600 },
        style: { padding: 10, height: 70 }
      })}
    >
      <Tab.Screen name={funcionalName} options={{ headerShown: false }} component={TelaFuncional} />
      <Tab.Screen name={perfilName} options={{ headerShown: false }} component={TelaPerfil} />
    </Tab.Navigator>
  );
}

export default NavigatorTab