import { StyleSheet, View } from "react-native";
import NavigatorTab from "../../components/navigator/NavigatorTab";
import TopBoard from "../../components/TopBoard/TopBoard";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";


const EncomendarView = ({ navigation }) => {
    const style = StyleSheet.create({
        containerHV: {
            flex: 1,
            alignItems: 'stretch',
            backgroundColor: '#fff',
        },
        containerText:{
            fontSize:30,
            textAlign: "center",
            padding: 25,
            color:'#614a41'
        },
        containerHVBtn: {
            flex: 1,
            margin: 10,
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
            fontWeight: 500,
            color: 'white',
            fontSize: 19,
        }
    });

    const [obj, setObj] = useState({ name: "", preco: "" })

    return (

        <View style={style.containerHV}>
            <Text style={style.containerText}>Encomendas</Text>

            <View style={style.containerHVBtn}>

            </View>

        </View>



    );
};

export default EncomendarView