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
            <Stack.Navigator initialRouteName="telaInicial">

                <Stack.Screen name="Home"
                    component={TelaHome} />
                <Stack.Screen name="Perfil"
                    component={TelaPerfil} />
                <Stack.Screen name="Login"
                    component={TelaLogin} />
                <Stack.Screen name="Cadastro"
                    component={TelaCadastroUser} />
                <Stack.Screen name="Doce"
                    component={TelaCadastroDoce} />
                <Stack.Screen name="Encomendar"
                    component={TelaEncomendar} />
                <Stack.Screen name="Inicio"
                    component={TelaFuncional} />
                <Stack.Screen name="Minhas Encomendas"
                    component={TelaMinhasEncomendas} />

            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default Navigator