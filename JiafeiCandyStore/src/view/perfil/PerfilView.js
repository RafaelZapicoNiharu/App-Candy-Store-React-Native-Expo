import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import { useAuth } from '../../components/auth/AuthProvider';

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
            marginBottom: 35
        },
        buttonText: {
            fontWeight: "500",
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
            fontWeight: "500",
        },
    });

    const { userData, logout } = useAuth();

    const deslogarUser = () => {
        logout();
        navigation.navigate('Home');
    };

    return (
        <>
            <ScrollView>
                <View style={style.containerTB}>
                    <Avatar.Image style={style.avatar} size={134} source={require("../../../assets/img/furina.webp")} />
                    <Text style={style.TextoCad}>Seja bem vinda, {userData.nome}!</Text>
                </View>
                <View style={style.containerHVBtn}>
                    <Button
                        mode="contained"
                        style={style.button}
                        onPress={() => navigation.navigate('TelaMeusDados')}
                    >
                        <Text style={style.buttonText}>Editar Dados</Text>
                    </Button>
                    <Button
                        mode="contained"
                        style={style.button}
                        onPress={() => deslogarUser()}
                    >
                        <Text style={style.buttonText}>Sair</Text>
                    </Button>
                </View>
            </ScrollView>
        </>
    );
};

export default PerfilView;
