import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import TelaHome from "../../view/home/HomeView";
import TelaPerfil from "../../view/perfil/PerfilView"
import TelaFuncional from "../../view/funcional/FuncionalView"
import TelaLogado from "../../view/logado/LogadoView"
import TelaLogin from "../../view/login/LoginView"
import TelaMeusDados from "../../view/myDados/MeusDadosView"

import TelaMinhasEncomendas from "../../view/myEncomendas/MyEncomendasView"
import TelaCadastroDoce from "../../view/cadastroDoce/CadastroDoceView"
import TelaListaDoce from "../../view/listaDoces/ListaDoceView"
import TelaCadastroUser from "../../view/cadastroUser/CadastroUserView"
import TelaEncomendas from "../../view/encomendas/EncomendasView"
import TelaCadastroEncomendas from "../../view/cadastroEncomendas/CadastroEncomendasView"
import TelaDashboard from "../../view/dashboard/DashboardView"
import { useAuth } from "../auth/AuthProvider";

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
                    options={{ headerShown: true, headerTitle: '' }}
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
                <Stack.Screen name="Encomendas"
                    component={TelaEncomendas}
                    options={{ headerShown: true, headerTitle: '' }}
                />
                <Stack.Screen name="Dashboard"
                    component={TelaDashboard}
                    options={{ headerShown: true, headerTitle: '' }}
                />
                <Stack.Screen name="TelaMinhasEncomendas"
                    component={TelaMinhasEncomendas}
                    options={{ headerShown: true, headerTitle: '' }}
                />
                <Stack.Screen name="TelaCadastroEncomendas"
                    component={TelaCadastroEncomendas}
                    options={{ headerShown: true, headerTitle: '' }}
                />
                <Stack.Screen name="TelaMeusDados"
                    component={TelaMeusDados}
                    options={{ headerShown: true, headerTitle: '' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator