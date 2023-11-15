import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TopBoard from '../../components/TopBoard/TopBoard';
import { Button, Avatar, TextInput, IconButton } from 'react-native-paper';
import { useState, useEffect } from "react"
import { buscaCEP2 } from '../../components/service/ServiceUtil';




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
            marginTop: 20,
            backgroundColor: '#614a41',
            padding: 5,
            borderRadius: 30,
            alignItems: 'center',
            marginBottom: 35
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
            flexDirection: "column",
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
    const [isEditable, setIsEditable] = useState(false);
    

    const handleToggleEditable = () => { //edição de dados muda de acordo com o botão
        setIsEditable(!isEditable);
    };

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

                <Avatar.Image style={style.avatar} size={134}
                    source={require("../../../assets/img/furina.webp")} />


                <IconButton
                    icon={isEditable ? 'content-save' : 'pencil'}
                    iconColor="#614a41"
                    size={30}
                    onPress={() => handleToggleEditable()}
                />

            </View>
            <View style={style.containerHVBtn}>


                <TextInput
                    label="Name"
                    value={obj.name}
                    editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, name: e })}
                />
                <TextInput
                    label="Email"
                    value={obj.email}
                    editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, email: e })}
                />
                <TextInput
                    label="Password"
                    secureTextEntry={mostrasenha}
                    right={<TextInput.Icon icon={iconeSenha} />}
                    value={obj.password}
                    editable={isEditable}
                    onChangeText={(e) => {
                        setObj({ ...obj, password: e })
                    }}
                    onPress={toggleIconeSenha}
                />
                <Text>Endereço:</Text>
                <TextInput
                    label="CEP"
                    value={obj.cep}
                    editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, cep: e })}
                />
                <TextInput
                    label="Logradouro"
                    value={obj.logradouro}
                    editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, logradouro: e })}
                />
                <TextInput
                    label="Bairro"
                    value={obj.bairro}
                    editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, bairro: e })}
                />
                <TextInput
                    label="Cidade"
                    value={obj.cidade}
                    editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, cidade: e })}
                />
                <TextInput
                    label="Estado"
                    value={obj.estado}
                    editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, estado: e })}
                />
                <TextInput
                    label="Número"
                    value={obj.numero}
                    editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, numero: e })}
                />
                <TextInput
                    label="Complemento"
                    value={obj.complemento}
                    editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, complemento: e })}
                />
            </View>


        </>

    );
};

export default MeusDadosView;
