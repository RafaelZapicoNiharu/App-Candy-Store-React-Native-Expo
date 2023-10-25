
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TelaPerfil from "../../view/perfil/PerfilView"
import TelaFuncional from "../../view/funcional/FuncionalView"

const NavigatorTab = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
        <Tab.Screen name="Funcional" component={TelaFuncional} />
        <Tab.Screen name="Perfil" component={TelaPerfil} />
      </Tab.Navigator>
    )
}

export default NavigatorTab