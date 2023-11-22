import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TopBoard from '../../components/TopBoard/TopBoard';
import { Button, TextInput } from 'react-native-paper';
import { useState } from "react";
import ObjectFactoryUtilities from '../Utilitarios/ObjectFactoryUtilities';
import axios from 'axios';
import { useAuth } from '../../components/auth/AuthProvider';
import { ScrollView } from 'react-native';

const LoginView = ({ navigation }) => {
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
        TextoCad: {
            color: '#614a41',
            textAlign: 'center',
            fontSize: 22,
            fontWeight: "500",
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
        additionalText: {
            textAlign: 'center',
            fontSize: 16,
            marginTop: 50,
            color: "#9399a3"
        },
    });
    const [iconepassword, setIconepassword] = useState("eye")
    const [mostrapassword, setMostrapassword] = useState(true)
    const [obj, setObj] = useState({ email: "123", password: "123" })
    const { saveUser } = useAuth();

    const toggleIconepassword = () => {
        setIconepassword(iconepassword === "eye" ? "eye-off" : "eye");
        setMostrapassword(mostrapassword === true ? false : true);
    };

    const Logar = async () => {
        try {
            let objetoLogin = await ObjectFactoryUtilities.createSimpleUser(obj.email, obj.password);
            let urlLogin = 'http://24dc-201-48-134-13.ngrok.io/login/validate';
            let response = await axios.post(urlLogin, objetoLogin);
            if (response.status != 401) {
                saveUser(response);
                console.log('User logado com sucesso!');
                navigation.navigate('Logado')
            }
        } catch (error) {
            console.error('Erro ao logar o user:', error);
        }
    };

    return (
        <View style={style.containerHV}>
            
            <ScrollView>
                <View style={style.containerHVBtn}>
                    <TextInput
                        label="Email"
                        value={obj.email}
                        onChangeText={(e) => setObj({ ...obj, email: e })}
                    />
                    <TextInput
                        value={obj.password}
                        onChangeText={(e) => setObj({ ...obj, password: e })}
                        label="Password"
                        secureTextEntry={mostrapassword}
                        right={<TextInput.Icon icon={iconepassword}
                            onPress={toggleIconepassword} />}
                    />
                    <Text style={{ fontSize: 20, textAlign: 'center' }}   >Dont have an account? <Text style={style.TextoCad} onPress={() => navigation.navigate('Cadastro')}   >Sign up </Text></Text>
                    <Button
                        mode="contained"
                        style={style.button}
                        onPress={() => Logar()}
                    >
                        <Text style={style.buttonText}>Sign in</Text>
                    </Button>
                </View>
            </ScrollView>
            <Text style={style.additionalText}>"São seres de luz que realizam docinhos"</Text>
        </View>
    );
};

export default LoginView;
