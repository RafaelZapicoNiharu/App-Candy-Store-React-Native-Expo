import { StyleSheet, View } from "react-native";
import NavigatorTab from "../../components/navigator/NavigatorTab";
import TopBoard from "../../components/TopBoard/TopBoard";
import { Button, Text } from "react-native-paper";


const FuncionalView = ({ navigation }) => {
    const style = StyleSheet.create({
        button: {
            backgroundColor: '#614a41',
            padding: 5,
            borderRadius: 30,
            alignItems: 'center',
        },
        buttonText: {
            fontWeight: 500,
            color: 'white',
            fontSize: 19,
        },
        containerHVBtn: {
            flex: 1,
            margin: 10,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
        },
    });


    return (


        <View style={style.containerHVBtn}>

            <Button
                mode="contained"
                style={style.button}
                onPress={() => navigation.navigate('CadastroDoce')}
            >
                <Text style={style.buttonText}>Cadastro Doce</Text>
            </Button>
        </View>



    );
};

export default FuncionalView