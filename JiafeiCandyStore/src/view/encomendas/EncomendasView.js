import { StyleSheet, View } from "react-native";
import NavigatorTab from "../../components/navigator/NavigatorTab";
import TopBoard from "../../components/TopBoard/TopBoard";
import { Avatar, Button, Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { buscaEncomendas } from "../../components/service/ServiceUtil";
import { FlatList } from "react-native-web";


const EncomendasView = ({ navigation }) => {
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
        texto: {
            fontSize: 25,
            fontWeight: 'bold',
        },
        edits: {
            width: '100%'
        },
        logo: {
            // flex: 1,
            margin: 5,
            backgroundColor: '#614a41',
            color: '#fff'
        },
        cont: {
            flex: 1,
            flexDirection: "row",
            padding: 15,
        },
        cont1: {
            flex: 1,
            flexDirection: "column",
            padding: 15,
        },
        button: {
            backgroundColor: '#614a41',
            padding: 5,
            borderRadius: 30,
            alignItems: 'center',
        },
        buttonText: {
            fontWeight: 500,
            color: 'white',
            fontSize: 19,
        }
    });

    const [edtSearch, setEdtSearch] = useState('')
    const [listaEncomendas, setListaEncomendas] = useState([])

    //const [obj, setObj] = useState({ name: "", preco: "" })

    useEffect(() => {
        buscaEncomendas(edtSearch).then((r) => {
            setListaEncomendas(r)
        })
    }, [edtSearch])

    return (

        <View style={style.containerHV}>
            <Text style={style.containerText}>Encomendas</Text>
            <View>
                <TextInput
                    style={style.edits}
                    label="Pesquisar encomendas"
                    placeholder="Filtrar a busca"
                    value={edtSearch}
                    onChangeText={(e) => setEdtSearch(e)}
                ></TextInput>
                <FlatList
                    style={style.edits}
                    data={listaEncomendas}
                    keyExtractor={(item) => (item && item.id ? item.id.toString() : '')}
                    renderItem={({ item }) => {
                        return (
                            <View style={style.cont}>
                                <Avatar.Text
                                    size={64}
                                    label={item.nome.substring(0, 2)}
                                    style={style.logo}
                                />
                                <View style={style.cont1}>
                                    <Text style={style.texto}>{item.nome.substring(0, 14)}</Text>
                                    <Text style={style.texto}>{item.doces} - {parseInt(item.quantidade)} unidade(s)</Text>
                                </View>
                                <View>
                                    <Button
                                        mode="contained"
                                        style={style.button}
                                        onPress={() => console.log(obj)}
                                    >
                                        <Text style={style.buttonText}>Concluir</Text>
                                    </Button>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>

        </View>
    );
};

export default EncomendasView