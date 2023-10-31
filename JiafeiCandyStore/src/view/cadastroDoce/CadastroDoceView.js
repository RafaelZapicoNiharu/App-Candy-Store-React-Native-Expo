import { StyleSheet, View } from "react-native";
import NavigatorTab from "../../components/navigator/NavigatorTab";
import TopBoard from "../../components/TopBoard/TopBoard";
import { Button, Text } from "react-native-paper";


const CadastroDoceView = ({ navigation }) => {
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
            <Text>Cadstro de Doces</Text>
        </View>



    );
};

export default CadastroDoceView