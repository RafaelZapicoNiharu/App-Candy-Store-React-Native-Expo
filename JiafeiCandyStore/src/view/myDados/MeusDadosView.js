import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TopBoard from '../../components/TopBoard/TopBoard';
import { Button, Avatar, TextInput } from 'react-native-paper';
import { useState, useEffect } from "react"




const MeusDadosView = ({ navigation }) => {

    const style = StyleSheet.create({
        containerHVBtn: {
            flex: 3,
            margin: 20,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignContent: "center"
        },
        button: {
            marginTop:20,
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
            marginTop: "5%",
            backgroundColor: "#fff",
            borderWidth: 2,
            borderColor: '#614a41',
            overflow: 'hidden',
            alignItems: 'center',
        },
        containerTB: {
            flex: 0.5,
            alignItems: "center",
        },
        TextoCad: {
            color: '#614a41',
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 550,
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



        <>
            <View style={style.containerTB}>

                <Avatar.Image style={style.avatar} size={134} source={require("../../../assets/img/furina.webp")} />

            </View>
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
               
                <Button
                    mode="contained"
                    style={style.button}
                    onPress={() => console.log(obj)}
                >
                    <Text style={style.buttonText}>Salvar</Text>
                </Button>
            </View>
              
            
        </>

    );
};

export default MeusDadosView;
