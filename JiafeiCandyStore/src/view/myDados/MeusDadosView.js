import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, Avatar, TextInput, IconButton } from 'react-native-paper';
import { useState } from "react"
import { useAuth } from '../../components/auth/AuthProvider';
import ObjectFactoryUtilities from '../Utilitarios/ObjectFactoryUtilities';
import ApiManagerUtilities from '../Utilitarios/ApiManagerUtilities';

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
            fontWeight: "500",
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
        separator: {
            borderBottomWidth: 1,
            borderBottomColor: 'white',
            marginBottom: 5,
            width: "95%",
            alignSelf: 'center'
        },
    });

    const [iconepassword, setIconepassword] = useState("eye")
    const { userData, logout } = useAuth();
    const [mostrapassword, setMostrapassword] = useState(true)
    const [obj, setObj] = useState({ nome: userData.nome, email: userData.email, password: userData.password, cep: userData.cep, logradouro: userData.logradouro, bairro: userData.bairro, cidade: userData.cidade, estado: userData.estado, numero: userData.numero, complemento: userData.complemento })

    const toggleIconepassword = () => {
        setIconepassword(iconepassword === "eye" ? "eye-off" : "eye");
        setMostrapassword(mostrapassword === true ? false : true);
    };

    const beforeSave = async () => {
        if (obj.nome, obj.email, obj.password, obj.cep, obj.logradouro, obj.bairro, obj.cidade, obj.estado, obj.numero) {
            const objeto = await ObjectFactoryUtilities.createUserEdit(userData.id, obj.nome, obj.email, obj.password, obj.cep, obj.logradouro, obj.bairro, obj.cidade, obj.estado, obj.numero, obj.complemento);
            try {
                response = await ApiManagerUtilities.updateData('http://localhost:3000/usuarios/alterar', objeto);
                if (response.status != 404) {
                    logout();
                    navigation.navigate('Login')
                }
            } catch (error) {
                console.error('Erro ao deslogar', error);
            }
        }
    };

    return (
        <><ScrollView>
            <View style={style.containerTB}>
                <Avatar.Image style={style.avatar} size={134}
                    source={require("../../../assets/img/furina.webp")} />
            </View>
            <View style={style.containerHVBtn}>
                <TextInput
                    label="Nome"
                    value={obj.nome}
                    // editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, nome: e })}
                />
                <View style={style.separator} />
                <TextInput
                    label="Email"
                    value={obj.email}
                    // editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, email: e })}
                />
                <View style={style.separator} />
                <TextInput
                    label="Password"
                    secureTextEntry={mostrapassword}
                    right={<TextInput.Icon icon={iconepassword} />}
                    value={obj.password}
                    // editable={isEditable}
                    onChangeText={(e) => {
                        setObj({ ...obj, password: e })
                    }}
                    onPress={toggleIconepassword}
                />
                <View style={style.separator} />
                <Text>Endereço:</Text>
                <TextInput
                    label="CEP"
                    value={obj.cep}
                    // editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, cep: e })}
                />
                <View style={style.separator} />
                <TextInput
                    label="Logradouro"
                    value={obj.logradouro}
                    // editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, logradouro: e })}
                />
                <View style={style.separator} />
                <TextInput
                    label="Bairro"
                    value={obj.bairro}
                    // editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, bairro: e })}
                />
                <View style={style.separator} />
                <TextInput
                    label="Cidade"
                    value={obj.cidade}
                    // editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, cidade: e })}
                />
                <View style={style.separator} />
                <TextInput
                    label="Estado"
                    value={obj.estado}
                    // editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, estado: e })}
                />
                <View style={style.separator} />
                <TextInput
                    label="Número"
                    value={obj.numero}
                    // editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, numero: e })}
                />
                <View style={style.separator} />
                <TextInput
                    label="Complemento"
                    value={obj.complemento}
                    // editable={isEditable}
                    onChangeText={(e) => setObj({ ...obj, complemento: e })}
                />
                <View style={style.separator} />
                <Button
                    mode="contained"
                    style={style.button}
                    onPress={() => beforeSave()}
                >
                    <Text style={style.buttonText}>Salvar Alterações</Text>
                </Button>
            </View>
        </ScrollView>
        </>
    );
};

export default MeusDadosView;
