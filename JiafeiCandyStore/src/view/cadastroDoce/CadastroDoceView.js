import { StyleSheet, View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import ValidaterUtilitiesDoce from "../Utilitarios/ValidaterUtilitiesDoce";
import ObjectFactoryUtilities from "../Utilitarios/ObjectFactoryUtilities";
import axios from 'axios';
import { ScrollView } from "react-native";
import TiposDocesEnum from "../../enum/TiposDocesEnum";
import { Picker } from "@react-native-picker/picker";

const CadastroDoceView = ({ navigation }) => {
    const style = StyleSheet.create({
        containerHV: {
            flex: 1,
            alignItems: 'stretch',
            backgroundColor: '#fff',
        },
        containerText: {
            fontSize: 30,
            textAlign: "center",
            padding: 25,
            color: '#614a41'
        },
        containerHVBtn: {
            flex: 1,
            margin: 10,
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
            fontWeight: "500",
            color: 'white',
            fontSize: 19,
        },
        select: {
            fontSize: 16,
            paddingBottom: 5
        },
        picker: {
            padding: 15
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

    const [obj, setObj] = useState({ preco: "", quantidade: "", tipoDoce: "" })
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const beforeSaveDoce = async () => {
        let tipoDoceError = ValidaterUtilitiesDoce.validacaoTipoDoce(obj.tipoDoce);
        let precoError = ValidaterUtilitiesDoce.validacaoPreco(obj.preco);
        let quantidadeError = ValidaterUtilitiesDoce.validacaoQuantidade(obj.quantidade);
        if (tipoDoceError || precoError || quantidadeError) {
            setErrorVisible(true);
            setErrorMessage(tipoDoceError || precoError || quantidadeError);
        } else {
            const objetoDoce = await ObjectFactoryUtilities.createDoce(obj.preco, obj.quantidade, obj.tipoDoce);
            let urlCadastro = 'http://ec2-52-200-79-59.compute-1.amazonaws.com:3000/doces/cadastrar';

            try {
                const response = await axios.post(urlCadastro, objetoDoce);
                if (response.status === 201) {
                    console.log('Doce salvo com sucesso:', response.data);
                    navigation.navigate('Logado');
                }
            } catch (error) {
                console.error('Erro ao salvar o Doce:', error);
            }
        }
    };

    return (
        <View style={style.containerHV}>
            <ScrollView>
                <Text style={style.containerText}>Cadastro de Doces</Text>
                <View style={style.containerHVBtn}>
                    <View>
                        <Text style={style.select}>Doce:</Text>
                        <Picker
                            style={style.picker}
                            selectedValue={obj.tipoDoce}
                            onValueChange={(itemValue) => setObj({ ...obj, tipoDoce: itemValue })}
                        >
                            <Picker.Item label="Selecione um tipo de doce" value="" />
                            {Object.values(TiposDocesEnum).map((tipoDoce) => (
                                <Picker.Item key={tipoDoce} label={tipoDoce} value={tipoDoce} />
                            ))}
                        </Picker>
                    </View>
                    <View style={style.separator} />
                    <TextInput
                        label="Preço"
                        value={obj.preco}
                        onChangeText={(e) => setObj({ ...obj, preco: e })}
                    />
                    <View style={style.separator} />
                    <TextInput
                        label="Quantidade"
                        value={obj.quantidade}
                        onChangeText={(e) => setObj({ ...obj, quantidade: e })}
                    />
                    <View style={style.separator} />
                    <Button
                        mode="contained"
                        style={style.button}
                        onPress={() => beforeSaveDoce()}
                    >
                        <Text style={style.buttonText}>Cadastrar</Text>
                    </Button>
                </View>

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

export default CadastroDoceView