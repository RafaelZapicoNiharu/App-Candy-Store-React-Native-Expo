import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useState } from "react"
import { Button, IconButton, TextInput } from 'react-native-paper';

const CadastroUserView = ({ navigation }) => {
    const style = StyleSheet.create({
        containerHV: {
            flex: 1,
            alignItems: 'stretch',
            backgroundColor: '#fff',
        },
        TextoCad: {
            color: '#614a41',
            textAlign: 'center',
            fontSize: 22,
            fontWeight:550,
        },
        containerHVBtn: {
            flex: 1,
            margin: 10,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
        },

        botoes2: {

            margin: 20,
            flexDirection: 'row',
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
            color: "#9399a3"
        },
    });

    const [iconeSenha, setIconeSenha] = useState("eye")
    const [password, setPassword] = useState("")

    const [mostrasenha, setMostraSenha] = useState(true)
    const [obj, setObj] = useState({ name: "", email: "",password:"",cep:"" })


    const toggleIconeSenha = () => {
        setIconeSenha(iconeSenha === "eye" ? "eye-off" : "eye");
        setMostraSenha(mostrasenha === true ? false : true);
    };

    return (
        <View style={style.containerHV}>

            <View style={style.containerHVBtn}>

                <TextInput
                    label="Name"
                    value={obj.name}
                    onChangeText={(e) => setObj({ ...obj, name: e })}
                />
                <TextInput
                    label="Email"
                    value={obj.email}
                    onChangeText={(e) => setObj({ ...obj, email: e })}
                />
                <TextInput
                    label="Password"
                    secureTextEntry={mostrasenha}
                    right={<TextInput.Icon icon={iconeSenha}  
                    value={password}
                    onChangeText={(e) => setObj({ ...obj, password: e })}
                    onPress={toggleIconeSenha}
                    />}
                />
                <TextInput
                    label="CEP"
                    value={obj.cep}
                    onChangeText={(e) => setObj({ ...obj, cep: e })}
                />
                <Text style={{ fontSize: 20, textAlign: 'center' }}   >Already have an account? <Text style={style.TextoCad} onPress={() => navigation.navigate('Login')}   >Sign in </Text></Text>


                <Button
                    mode="contained"
                    style={style.button}
                    onPress={() => console.log(obj)}
                >
                    <Text style={style.buttonText}>Sign up</Text>
                </Button>



            </View>
            <Text style={style.additionalText}>"São seres de luz que realizam docinhos"</Text>
        </View>
    );
};

export default CadastroUserView;
