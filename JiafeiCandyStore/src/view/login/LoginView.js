import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TopBoard from '../../components/TopBoard/TopBoard';
import { Button, TextInput } from 'react-native-paper';
import { useState } from "react"

const LoginView = ({ navigation }) => {
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
            color: "#9399a3"
        },
    });

    const [obj, setObj] = useState({ email: "", password: "" })
    
  

    return (
        <View style={style.containerHV}>
            <TopBoard />
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
                    secureTextEntry
                    right={<TextInput.Icon icon="eye" />}
                />
                <Text style={{fontSize:20,textAlign: 'center'}}   >Dont have an account? <Text style={style.TextoCad} onPress={() => navigation.navigate('Cadastro')}   >Sign up </Text></Text>

                <Button
                    mode="contained"
                    style={style.button}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={style.buttonText}>Sign in</Text>
                </Button>

            </View>
            
            <Text style={style.additionalText}>"São seres de luz que realizam docinhos"</Text>
        </View>
    );
};

export default LoginView;
