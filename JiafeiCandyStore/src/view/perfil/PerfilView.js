import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TopBoard from '../../components/TopBoard/TopBoard';
import { Button, Avatar } from 'react-native-paper';
import { useState } from "react"




const PerfilView = ({ navigation }) => {

    const style = StyleSheet.create({
        containerHVBtn: {
            flex: 1,
            margin: 20,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignContent: "center"
        },
        button: {
            backgroundColor: '#614a41',
            padding: 5,
            borderRadius: 30,
            alignItems: 'center',
            marginBottom:35
        },
        buttonText: {
            fontWeight: 500,
            color: 'white',
            fontSize: 19,
        },
        avatar: {
            marginTop: "30%",
            backgroundColor: "#fff",
            borderWidth: 2,
            borderColor: '#614a41',
            overflow: 'hidden',
            alignItems: 'center',
        },
        containerTB: {
            flex: 1,
            alignItems: "center",
        },
        TextoCad: {
            color: '#614a41',
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 550,
        },

    });

    return (

        <>
            <View style={style.containerTB}>

                <Avatar.Image style={style.avatar} size={134} source={require("../../../assets/img/furina.webp")} />
                <Text style={style.TextoCad}>Seja bem vinda, Furina!</Text>
            </View>

            <View style={style.containerHVBtn}>

                <Button
                    mode="contained"
                    style={style.button}
                    onPress={() => navigation.navigate('TelaMeusDados')}
                >
                    <Text style={style.buttonText}>Meus Dados</Text>
                </Button>
                <Button
                    mode="contained"
                    style={style.button}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={style.buttonText}>Sair</Text>
                </Button>
            </View>
        </>

    );
};

export default PerfilView;
