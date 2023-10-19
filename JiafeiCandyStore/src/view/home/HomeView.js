import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TopBoard from '../../components/TopBoard/TopBoard';
import { Button } from 'react-native-paper';

const HomeView = ({ navigation }) => {
    const style = StyleSheet.create({
        containerHV: {
            flex: 1,
            alignItems: 'stretch',
            backgroundColor: '#fff',
        },
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
            fontWeight: 500,
            color: 'white',
            fontSize: 19,
        },
        additionalText: {
            textAlign: 'center',
            fontSize: 16,
            marginTop: 50, 
            color:"#9399a3"
        },
    });

    return (
        <View style={style.containerHV}>
            <TopBoard />
            <View style={style.containerHVBtn}>
                <Button
                    mode="contained"
                    style={style.button}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={style.buttonText}>Entrar</Text>
                </Button>
                <Button
                    mode="contained"
                    style={style.button}
                    onPress={() => navigation.navigate('Cadastro')}
                >
                    <Text style={style.buttonText}>Inscreva-se</Text>
                </Button>
            </View>
            <Text style={style.additionalText}>"São seres de luz que realizam docinhos"</Text>
        </View>
    );
};

export default HomeView;
