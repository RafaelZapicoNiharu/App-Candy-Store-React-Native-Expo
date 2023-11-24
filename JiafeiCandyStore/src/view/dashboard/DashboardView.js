import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { useEffect, useState } from "react";


const DashboardView = () => {

    const style = StyleSheet.create({
        containerHV: {
            flex: 1,
            margin: 20,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignContent: "center"
        },
        containerText: {
            fontSize: 30,
            textAlign: "center",
            padding: 25,
            color: '#614a41'
        },
        containerText1: {
            fontSize: 20,
            textAlign: "center",
            padding: 25,
            color: '#614a41'
        },
        containerTB: {
            flex: 1,
            alignItems: "center",
        },
        avatar: {
            marginTop: "30%",
            backgroundColor: "#fff",
            borderWidth: 2,
            borderColor: '#614a41',
            overflow: 'hidden',
            alignItems: 'center',
        },

    });
    const [encomendasCount, setEncomendasCount] = useState(null);
    const [docesCount, setDocesCount] = useState(null);

    const getQuantidadeDoces = async () => {
        try {
            const response = await fetch('http://localhost:3000/total-doces');
            if (!response.ok) {
                throw new Error('Erro ao obter a resposta da API');
            }
            const data = await response.json();
            console.log('Resposta da API de Quantidade de Doces:', data);
            const count = data.total && typeof data.total === 'number' ? data.total : null;
            setDocesCount(count);
        } catch (error) {
            console.error('Erro ao obter a quantidade de doces:', error);
            setDocesCount(null);
        }
    };


    const getQuantidadeEncomendas = async () => {
        try {
            const response = await fetch('http://localhost:3000/total-encomendas');
            if (!response.ok) {
                throw new Error('Erro ao obter a resposta da API');
            }
            const data = await response.json();
            console.log('Resposta da API de Quantidade de Encomendas:', data);
            const count = data.total && typeof data.total === 'number' ? data.total : null;
            setEncomendasCount(count);
        } catch (error) {
            console.error('Erro ao obter a quantidade de encomendas:', error);
            setEncomendasCount(0);
        }
    };

    useEffect(() => {
        getQuantidadeEncomendas();
        getQuantidadeDoces();
    }, []);

    return (
        <View style={style.containerHV}>
            <ScrollView>
                <Text style={style.containerText}>Dashboard</Text>
                <View>
                    <Text style={style.containerText1}>Quantidade de Encomendas: {encomendasCount !== null ? encomendasCount : 'Carregando...'}</Text>
                    <View style={style.containerTB}>
                        <Avatar.Image style={style.avatar} size={134} source={require("../../../assets/img/cheklist.jpg")} />
                    </View>
                </View>
                <View>
                    <Text style={style.containerText1}>Quantidade de Doces: {docesCount !== null ? docesCount : 'Carregando...'}</Text>
                    <View style={style.containerTB}>
                        <Avatar.Image style={style.avatar} size={134} source={require("../../../assets/img/brigadeiro.jpg")} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default DashboardView