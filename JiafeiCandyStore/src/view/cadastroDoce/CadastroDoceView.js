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
        }
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
            let urlCadastro = 'http://24dc-201-48-134-13.ngrok.io/doces/cadastrar';

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
            <Text style={style.containerText}>Cadastro de Doces</Text>
            <View style={style.containerHVBtn}>
                <ScrollView>
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
                    <TextInput
                        label="Preço"
                        value={obj.preco}
                        onChangeText={(e) => setObj({ ...obj, preco: e })}
                    />
                    <TextInput
                        label="Quantidade"
                        value={obj.quantidade}
                        onChangeText={(e) => setObj({ ...obj, quantidade: e })}
                    />
                    <Button
                        mode="contained"
                        style={style.button}
                        onPress={() => beforeSaveDoce()}
                    >
                        <Text style={style.buttonText}>Cadastrar</Text>
                    </Button>
                    <Snackbar
                        visible={errorVisible}
                        onDismiss={() => setErrorVisible(false)}
                        duration={5000} // Tempo em milissegundos que o Snackbar ficará visível
                        style={style.snackbar}
                    >
                        <Text style={style.snackbarText}>{errorMessage}</Text>
                    </Snackbar>
                </ScrollView>
            </View>

        </View>
    );
};

export default CadastroDoceView