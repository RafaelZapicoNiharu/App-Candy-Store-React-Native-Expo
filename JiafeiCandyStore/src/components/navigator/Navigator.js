import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import TelaHome from "../../view/home/HomeView";
import TelaPerfil from "../../view/perfil/PerfilView"
import TelaLogin from "../../view/login/LoginView"
import TelaFuncional from "../../view/funcional/FuncionalView"
import TelaMinhasEncomendas from "../../view/myEncomendas/MyEncomendasView"
import TelaCadastroDoce from "../../view/cadastroDoce/CadastroDoceView"
import TelaCadastroUser from "../../view/cadastroUser/CadastroUserView"
import TelaEncomendar from "../../view/encomendar/EncomendarView"

const Navigator = () => {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="telaInicial"
            >

                <Stack.Screen name="Home"
                    component={TelaHome}
                    options={{ headerShown: false }}
                />

                <Stack.Screen name="Login"
                    component={TelaLogin}
                    options={{ headerShown: true }}
                />




            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default Navigator