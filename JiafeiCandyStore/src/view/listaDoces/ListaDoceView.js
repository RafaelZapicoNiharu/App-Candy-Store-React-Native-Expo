import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import ApiManagerUtilities from "../Utilitarios/ApiManagerUtilities";
import { buscaDoces } from "../../components/service/ServiceUtil";

const ListaDoceView = () => {
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
        texto1: {
            fontSize: 18,
            textAlign: 'left',
        },
        edits: {
            width: '100%'
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
        },
    });

    const [edtSearch, setEdtSearch] = useState('')
    const [doces, setDoces] = useState([])
    const [reRender, setReRender] = useState(1);

    const refreshDoces = () => {
        setReRender(reRender => reRender + 1);
    };

    const handleApagarButton = async (property) => {
        console.log('Apagar button ', property);
        try {
            let id = property;
            const response = await ApiManagerUtilities.deleteData('http://ec2-52-200-79-59.compute-1.amazonaws.com:3000/doces/excluir', id);
            console.log(response);
            if (response.status === 201) {
                console.log('Doce apagado com sucesso:', response.data);
            }
        } catch (error) {
            console.error('Erro ao apagar o doce:', error);
        }
        refreshDoces();
    };

    useEffect(() => {
        const fetchDataPromise = ApiManagerUtilities.fetchData('http://ec2-52-200-79-59.compute-1.amazonaws.com:3000/doces', null);
        const buscaDocesPromise = buscaDoces(edtSearch);

        Promise.all([fetchDataPromise, buscaDocesPromise])
            .then(([fetchDataResult, buscaDocesResult]) => {
                console.log("fetchDataResult:", fetchDataResult);
                console.log("buscaDocesResult:", buscaDocesResult);

                const docesArray = Array.isArray(fetchDataResult) ? fetchDataResult : [];
                setDoces(edtSearch === '' ? docesArray : buscaDocesResult);
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }, [edtSearch, reRender]);

    return (

        <View style={style.containerHV}>
            <ScrollView>
                <Text style={style.containerText}>Lista de Doces</Text>
                <View>
                    <TextInput
                        style={style.edits}
                        label="Pesquisar doce pelo nome"
                        placeholder="Filtrar a busca"
                        value={edtSearch}
                        onChangeText={(e) => setEdtSearch(e)}
                    ></TextInput>
                    <View style={style.container}>
                        {doces.map((property, index) => (
                            <View key={index}>
                                <View style={style.container}>
                                    <View style={style.column}>
                                        {property.tipoDoce && <Text style={style.texto1}>Nome: {property.tipoDoce}</Text>}
                                        {property.preco && <Text style={style.texto1}>Preco: R$ {parseFloat(property.preco).toFixed(2)}</Text>}
                                        {property.quantidade && <Text style={style.texto1}>Quantidade: {property.quantidade}</Text>}
                                    </View>
                                    <View>
                                        <Button mode="contained" style={style.button} onPress={() => handleApagarButton(property)}>
                                            <Text style={style.buttonText}>Apagar</Text>
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

export default ListaDoceView