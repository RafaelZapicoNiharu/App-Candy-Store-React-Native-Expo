import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import TelaHome from "../../view/home/HomeView";
import TelaPerfil from "../../view/perfil/PerfilView"
import TelaFuncional from "../../view/funcional/FuncionalView"
import TelaLogado from "../../view/logado/LogadoView"
import TelaLogin from "../../view/login/LoginView"

import TelaMinhasEncomendas from "../../view/myEncomendas/MyEncomendasView"
import TelaCadastroDoce from "../../view/cadastroDoce/CadastroDoceView"
import TelaListaDoce from "../../view/listaDoces/ListaDoceView"
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

                <Stack.Screen name="Cadastro"
                    component={TelaCadastroUser}
                    options={{ headerShown: true }}
                />
                <Stack.Screen name="Logado"
                    component={TelaLogado}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="CadastroDoce"
                    component={TelaCadastroDoce}
                    options={{ headerShown: true, headerTitle: '' }}
                />
                <Stack.Screen name="ListaDoce"
                    component={TelaListaDoce}
                    options={{ headerShown: true, headerTitle: '' }}
                />
                <Stack.Screen name="Encomendar"
                    component={TelaEncomendar}
                    options={{ headerShown: true, headerTitle: '' }}
                />



            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default Navigator