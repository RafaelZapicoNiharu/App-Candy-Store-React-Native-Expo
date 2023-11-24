import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import ApiManagerUtilities from "../Utilitarios/ApiManagerUtilities";
import TiposDocesEnum from "../../enum/TiposDocesEnum";
import { buscaEncomendas } from "../../components/service/ServiceUtil";

const EncomendasView = () => {
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
        edits: {
            width: '100%'
        },
        texto1: {
            fontSize: 18,
            textAlign: 'left',
        },
        column: {
            flexDirection: 'column',
            paddingBottom: 5,
            padding: 15,
        },
        button: {
            backgroundColor: '#614a41',
            padding: 5,
            margin: 10,
            borderRadius: 30,
            alignItems: 'center',
        },
        buttonText: {
            fontWeight: "500",
            color: 'white',
            fontSize: 19,
        }
    });

    const [edtSearch, setEdtSearch] = useState('')
    const [encomendas, setEncomendas] = useState([])
    const [reRender, setReRender] = useState(1)

    const handleConcluirButton = async (property) => {
        console.log('Concluir button ', property);
        try {
            const response = await ApiManagerUtilities.deleteData('http://localhost:3000/encomendas/excluir', property);
            if (response.status === 201) {
                console.log('Doce apagado com sucesso:', response.data);
            }
        } catch (error) {
            console.error('Erro ao apagar o doce:', error);
        }
        refreshDoces();
    };

    const refreshDoces = () => {
        setReRender(reRender => reRender + 1);
    };

    useEffect(() => {
        const fetchDataPromise = ApiManagerUtilities.fetchData('http://localhost:3000/encomendas', null);
        const buscaEncomendasPromise = buscaEncomendas(edtSearch);

        Promise.all([fetchDataPromise, buscaEncomendasPromise])
            .then(([fetchDataResult, buscaEncomendasResult]) => {
                console.log("fetchDataResult:", fetchDataResult);
                console.log("buscaEncomendasResult:", buscaEncomendasResult);

                const encomendasArray = Array.isArray(fetchDataResult) ? fetchDataResult : [];
                setEncomendas(edtSearch === '' ? encomendasArray : buscaEncomendasResult);
            })
            .catch(error => {
                console.error('Erro ao buscar dados das encomendas da API:', error);
            });
    }, [edtSearch, reRender]);

    return (
        <View style={style.containerHV}>
            <ScrollView>
                <Text style={style.containerText}>Encomendas</Text>
                <View>
                    <TextInput
                        style={style.edits}
                        label="Pesquisar encomendas pelo nome"
                        placeholder="Filtrar a busca"
                        value={edtSearch}
                        onChangeText={(e) => setEdtSearch(e)}
                    ></TextInput>
                    <View style={style.container}>
                        {encomendas.map((property, index) => (
                            <View key={index}>
                                <View style={style.container}>
                                    <View style={style.column}>
                                        {property.nome && <Text style={style.texto1}>Nome: {property.nome} </Text>}
                                        {property.tipoDoce && (
                                            <Text style={style.texto1}>
                                                Doce: {TiposDocesEnum[property.tipoDoce]}
                                            </Text>
                                        )}
                                        {property.quantidade && <Text style={style.texto1}>Quantidade: {property.quantidade}</Text>}
                                        {property.dataEntrega && <Text style={style.texto1}>Data Entrega: {property.dataEntrega}</Text>}
                                    </View>
                                    <View>
                                        <Button mode="contained" style={style.button} onPress={() => handleConcluirButton(property)}>
                                            <Text style={style.buttonText}>Concluir</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default EncomendasView