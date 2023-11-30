import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useAuth } from "../../components/auth/AuthProvider";
import TiposDocesEnum from "../../enum/TiposDocesEnum";


const MyEncomendasView = () => {

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
        separator: {
            borderBottomWidth: 1,
            borderBottomColor: '#614a41',
            marginBottom: 5,
            width: "95%",
            alignSelf: 'center'
        },
    });

    const [edtSearch, setEdtSearch] = useState('')
    const [encomendas, setEncomendas] = useState([])
    const { userData } = useAuth();

    useEffect(() => {
        const apiUrl = `http://ec2-52-200-79-59.compute-1.amazonaws.com:3000/encomendas/${userData.id}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const searchTermLower = edtSearch.toLowerCase();
                const filteredEncomendas = data.filter((encomenda) =>
                    searchTermLower === '' ||
                    encomenda.tipoDoce.toLowerCase().includes(searchTermLower)
                );
                setEncomendas(filteredEncomendas);
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }, [edtSearch, userData.id]);

    return (
        <View style={style.containerHV}>
            <ScrollView>
                <Text style={style.containerText}>Minhas Encomendas</Text>
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
                                        {property.tipoDoce && (
                                            <Text style={style.texto1}>
                                                Doce: {TiposDocesEnum[property.tipoDoce]}
                                            </Text>
                                        )}
                                        {property.quantidade && <Text style={style.texto1}>Quantidade: {property.quantidade}</Text>}
                                        {property.dataEntrega && <Text style={style.texto1}>Data Entrega: {property.dataEntrega}</Text>}
                                    </View>
                                </View>
                                <View style={style.separator} />
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default MyEncomendasView