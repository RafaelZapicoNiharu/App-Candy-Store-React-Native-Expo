import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useState } from "react"
import { Button, IconButton, TextInput } from 'react-native-paper';
import { buscaCEP2 } from '../../components/service/ServiceUtil';

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
            fontWeight: 550,
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
    // const [password, setPassword] = useState("")

    const [mostrasenha, setMostraSenha] = useState(true)
    const [obj, setObj] = useState({ name: "", email: "", password: "", cep: "", logradouro: "", bairro: "", cidade: "", estado: "", numero: "", complemento: "" })


    const toggleIconeSenha = () => {
        setIconeSenha(iconeSenha === "eye" ? "eye-off" : "eye");
        setMostraSenha(mostrasenha === true ? false : true);
    };

    const buscaCEPSinc = async () => {
        const sincrono = await buscaCEP2(obj.cep)
        setObj({
            ...obj,
            logradouro: sincrono.logradouro,
            bairro: sincrono.bairro,
            cidade: sincrono.localidade,
            estado: sincrono.uf,
        });
    }

    useEffect(() => {
        if (obj.cep.length == 8) {
            buscaCEPSinc()
        }
    }, [obj.cep])

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
                    right={<TextInput.Icon icon={iconeSenha} />}
                    value={obj.password}
                    onChangeText={(e) => {
                        setObj({ ...obj, password: e })
                    }}
                    onPress={toggleIconeSenha}
                />
                <Text>Endereço:</Text>
                <TextInput
                    label="CEP"
                    value={obj.cep}
                    onChangeText={(e) => setObj({ ...obj, cep: e })}
                />
                <TextInput
                    label="Logradouro"
                    value={obj.logradouro}
                    onChangeText={(e) => setObj({ ...obj, logradouro: e })}
                />
                <TextInput
                    label="Cidade"
                    value={obj.cidade}
                    onChangeText={(e) => setObj({ ...obj, cidade: e })}
                />
                <TextInput
                    label="Estado"
                    value={obj.estado}
                    onChangeText={(e) => setObj({ ...obj, estado: e })}
                />
                <TextInput
                    label="Número"
                    value={obj.numero}
                    onChangeText={(e) => setObj({ ...obj, numero: e })}
                />
                <TextInput
                    label="Complemento"
                    value={obj.complemento}
                    onChangeText={(e) => setObj({ ...obj, complemento: e })}
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
