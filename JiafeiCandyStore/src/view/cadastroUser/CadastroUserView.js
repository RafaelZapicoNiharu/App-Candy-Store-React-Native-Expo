import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useState } from "react"
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { buscaCEP2 } from '../../components/service/ServiceUtil';
import ObjectFactoryUtilities from '../Utilitarios/ObjectFactoryUtilities';
import ValidaterUtilities from '../Utilitarios/ValidaterUtilities';
import axios from 'axios';

const CadastroUserView = ({ navigation }) => {

    const style = StyleSheet.create({
        containerHV: {
            flex: 1,
            alignItems: 'stretch',
            backgroundColor: '#fff',
        },
        containerHVBtn: {
            flex: 1,
            margin: 10,
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
        containerText: {
            fontSize: 30,
            textAlign: "center",
            padding: 25,
            color: '#614a41'
        },
        snackbar: {
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center'
        },
        snackbarText: {
            color: 'white',
            textAlign: 'center'
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
    const [mostrapassword, setMostrapassword] = useState(true)
    const [obj, setObj] = useState({ nome: "", email: "", password: "", cep: "", logradouro: "", bairro: "", cidade: "", estado: "", numero: "", complemento: "" })
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const toggleIconepassword = () => {
        setIconepassword(iconepassword === "eye" ? "eye-off" : "eye");
        setMostrapassword(mostrapassword === true ? false : true);
    };

    const beforeSaveUser = async () => {
        let nomeError = ValidaterUtilities.validacaoNome(obj.nome);
        let emailError = ValidaterUtilities.validacaoEmail(obj.email);
        let passwordError = ValidaterUtilities.validacaoPassword(obj.password);
        let cepError = ValidaterUtilities.validacaoCep(obj.cep);
        let logradouroError = ValidaterUtilities.validacaoLogradouro(obj.logradouro);
        let bairroError = ValidaterUtilities.validacaoBairro(obj.bairro);
        let cidadeError = ValidaterUtilities.validacaoCidade(obj.cidade);
        let estadoError = ValidaterUtilities.validacaoEstado(obj.estado);
        let numeroError = ValidaterUtilities.validacaoNumero(obj.numero);
        if (
            nomeError || emailError || passwordError ||
            cepError || logradouroError || bairroError ||
            cidadeError || estadoError || numeroError
        ) {
            setErrorVisible(true);
            setErrorMessage(
                nomeError || emailError || passwordError || cepError || logradouroError || bairroError || cidadeError || estadoError || numeroError
            );
        } else {
            const objetoCadastro = await ObjectFactoryUtilities.createUser(obj.nome, obj.email, obj.password, obj.cep, obj.logradouro, obj.bairro, obj.cidade, obj.estado, obj.numero, obj.complemento);
            let urlCadastro = 'http://ec2-52-200-79-59.compute-1.amazonaws.com:3000/usuarios/cadastrar'
            console.log("Deu bom");
            try {
                const response = await axios.post(urlCadastro, objetoCadastro);
                if (response.status === 201) {
                    console.log('Usuario salvo com sucesso:', response.data);
                    navigation.navigate('Login')
                    limparCampos();
                }
            } catch (error) {
                console.error('Erro ao salvar o Usuario:', error);
            }
        }
    };

    const limparCampos = () => {
        setObj({
            nome: "",
            email: "",
            password: "",
            cep: "",
            logradouro: "",
            bairro: "",
            cidade: "",
            estado: "",
            numero: "",
            complemento: ""
        });
    }

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
            <ScrollView>
                <Text style={style.containerText}>Cadastro Usuário</Text>
                <View style={style.containerHVBtn}>
                    <TextInput
                        label="Nome"
                        value={obj.nome}
                        onChangeText={(e) => setObj({ ...obj, nome: e })}
                    />
                    <View style={style.separator} />
                    <TextInput
                        label="Email"
                        value={obj.email}
                        onChangeText={(e) => setObj({ ...obj, email: e })}
                    />
                    <View style={style.separator} />
                    <TextInput
                        label="Password"
                        secureTextEntry={mostrapassword}
                        right={<TextInput.Icon icon={iconepassword} />}
                        value={obj.password}
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
                        onChangeText={(e) => setObj({ ...obj, cep: e })}
                    />
                    <View style={style.separator} />
                    <TextInput
                        label="Logradouro"
                        value={obj.logradouro}
                        onChangeText={(e) => setObj({ ...obj, logradouro: e })}
                    />
                    <View style={style.separator} />
                    <TextInput
                        label="Bairro"
                        value={obj.bairro}
                        onChangeText={(e) => setObj({ ...obj, bairro: e })}
                    />
                    <View style={style.separator} />
                    <TextInput
                        label="Cidade"
                        value={obj.cidade}
                        onChangeText={(e) => setObj({ ...obj, cidade: e })}
                    />
                    <View style={style.separator} />
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
                    <View style={style.separator} />
                    <TextInput
                        label="Complemento"
                        value={obj.complemento}
                        onChangeText={(e) => setObj({ ...obj, complemento: e })}
                    />
                    <Text style={{ fontSize: 20, textAlign: 'center' }}   >Already have an account? <Text style={style.TextoCad} onPress={() => navigation.navigate('Login')}   >Sign in </Text></Text>
                    <Button
                        mode="contained"
                        style={style.button}
                        onPress={() => beforeSaveUser()}
                    >
                        <Text style={style.buttonText}>Sign up</Text>
                    </Button>
                </View>
                <Text style={style.additionalText}>"São seres de luz que realizam docinhos"</Text>
            </ScrollView>
            <View>
                <Snackbar
                    visible={errorVisible}
                    onDismiss={() => setErrorVisible(false)}
                    duration={3000}
                    style={style.snackbar}
                >
                    <Text style={style.snackbarText}>{errorMessage}</Text>
                </Snackbar>
            </View>
        </View>
    );
};

export default CadastroUserView;
