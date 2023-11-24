import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuth } from "../../components/auth/AuthProvider";


const FuncionalView = ({ navigation }) => {
    const style = StyleSheet.create({
        containerHVBtn: {
            flex: 1,
            margin: 20,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
        },
        button: {
            backgroundColor: '#614a41',
            padding: 5,
            borderRadius: 30,
            alignItems: 'center',
        },
        buttonText: {
            fontWeight: "500",
            color: 'white',
            fontSize: 19,
        },
    });

    const { isCliente, isAdmin } = useAuth();

    return (
        <View style={style.containerHVBtn}>
            {(isAdmin()) &&
                <>
                    <Button
                        mode="contained"
                        style={style.button}
                        onPress={() => navigation.navigate('CadastroDoce')}
                    >
                        <Text style={style.buttonText}>Cadastro Doce</Text>
                    </Button>
                    <Button
                        mode="contained"
                        style={style.button}
                        onPress={() => navigation.navigate('ListaDoce')}
                    >
                        <Text style={style.buttonText}>Lista de Doce</Text>
                    </Button>
                    <Button
                        mode="contained"
                        style={style.button}
                        onPress={() => navigation.navigate('Encomendas')}
                    >
                        <Text style={style.buttonText}>Encomendas</Text>
                    </Button>
                    <Button
                        mode="contained"
                        style={style.button}
                        onPress={() => navigation.navigate('Dashboard')}
                    >
                        <Text style={style.buttonText}>Dashboard</Text>
                    </Button>
                </>
            }
            {(isCliente()) &&
                <>
                    <Button
                        mode="contained"
                        style={style.button}
                        onPress={() => navigation.navigate('TelaMinhasEncomendas')}
                    >
                        <Text style={style.buttonText}>Minhas Encomendas</Text>
                    </Button>
                    <Button
                        mode="contained"
                        style={style.button}
                        onPress={() => navigation.navigate('TelaCadastroEncomendas')}
                    >
                        <Text style={style.buttonText}>Cadastro Encomendas</Text>
                    </Button>
                </>
            }
        </View>
    );
};

export default FuncionalView