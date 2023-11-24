import { StyleSheet, View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import TiposDocesEnum from "../../enum/TiposDocesEnum";
import ValidaterUtilitiesEncomenda from "../Utilitarios/ValidaterUtilitiesEncomenda";
import ObjectFactoryUtilities from "../Utilitarios/ObjectFactoryUtilities";
import axios from 'axios';
import { useAuth } from "../../components/auth/AuthProvider";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native";

const CadastroEncomendasView = ({ navigation }) => {
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
        containerText: {
            fontSize: 30,
            textAlign: "center",
            padding: 25,
            color: '#614a41'
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
        picker: {
            padding: 15
        },
        select: {
            fontSize: 16,
            paddingBottom: 5
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

    const [obj, setObj] = useState({ nome: "", doce: "", quantidade: "", dataEntrega: "", tipoDoce: "" })
    const { userData } = useAuth();
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const beforeSaveEncomenda = async () => {

        let tipoDoceError = ValidaterUtilitiesEncomenda.validacaoTipoDoce(obj.tipoDoce);
        let quantidadeError = ValidaterUtilitiesEncomenda.validacaoQuantidade(obj.quantidade);
        let dataEntregaError = ValidaterUtilitiesEncomenda.validacaoDataEntrega(obj.dataEntrega);

        if (tipoDoceError || quantidadeError || dataEntregaError) {
            setErrorVisible(true);
            setErrorMessage(tipoDoceError || quantidadeError || dataEntregaError);
        } else {
            const objetoCadastroEncomenda = await ObjectFactoryUtilities.createEncomenda(
                userData.id,
                userData.nome,
                obj.tipoDoce, // Apenas o valor selecionado, não um array
                obj.quantidade,
                obj.dataEntrega
            );
            let urlCadastro = `http://localhost:3000/encomendas/cadastrar/${userData.id}`;
            console.log('Tipo de Doce selecionado:', obj.tipoDoce);
            try {
                const response = await axios.post(urlCadastro, objetoCadastroEncomenda);
                if (response.status === 201) {
                    console.log('Encomenda salva com sucesso:', response.data);
                    navigation.navigate('Logado');
                }
            } catch (error) {
                console.error('Erro ao salvar a Encomenda:', error);
            }
        }
    };


    return (
        <View style={style.containerHV}>
            <ScrollView>
                <Text style={style.containerText}>Cadastro Encomendas</Text>
                <View style={style.containerHVBtn}>
                    <View>
                        <Text style={style.select}>Escolha um doce:</Text>
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
                        style={style.textInput}
                        label="Quantidade"
                        value={obj.quantidade}
                        onChangeText={(e) => setObj({ ...obj, quantidade: e })}
                    />
                    <View style={style.separator} />
                    <TextInput
                        label="Data Entrega"
                        value={obj.dataEntrega}
                        onChangeText={(e) => setObj({ ...obj, dataEntrega: e })}
                    />
                    <View style={style.separator} />
                    <Button
                        mode="contained"
                        style={style.button}
                        onPress={() => beforeSaveEncomenda()}
                    >
                        <Text style={style.buttonText}>Cadastrar Pedido</Text>
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

export default CadastroEncomendasView