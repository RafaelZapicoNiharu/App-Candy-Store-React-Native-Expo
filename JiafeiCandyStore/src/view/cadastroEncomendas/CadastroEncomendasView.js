import { StyleSheet, View } from "react-native";
import NavigatorTab from "../../components/navigator/NavigatorTab";
import TopBoard from "../../components/TopBoard/TopBoard";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import { Picker } from "react-native-web";
import { doces } from "../../db/db.json"


const CadastroEncomendasView = ({ navigation }) => {
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
            fontWeight: 500,
            color: 'white',
            fontSize: 19,
        },
        pickerContainer: {
            marginBottom: 15
        },
        picker: {
            height: 40,
            width: "100%",
        },
        pickerText: {
            fontWeight: 500,
            color: 'rgb(73, 69, 79)',
            fontSize: 19,
            paddingBottom:10
        },
    });

    const [obj, setObj] = useState({ name: "", doceId: null, quantidade: "", dataEntrega: "" })
    const [selectedDoce, setSelectedDoce] = useState("");


    return (

        <View style={style.containerHV}>
            <Text style={style.containerText}>Cadastro Encomendas</Text>

            <View style={style.containerHVBtn}>

                <TextInput
                    label="Name"
                    value={obj.name}
                    onChangeText={(e) => setObj({ ...obj, name: e })}
                />
                <View style={style.pickerContainer}>
                    <Text style={style.pickerText}>Escolha um doce:</Text>
                    <Picker
                        selectedValue={selectedDoce}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedDoce(itemValue);
                            setObj({ ...obj, doceId: itemValue });
                        }}
                        style={style.picker}
                    >
                        <Picker.Item label="Selecione um doce" value={null} />
                        {doces.map((doce) => (
                            <Picker.Item key={doce.id} label={doce.nome} value={doce.id} />
                        ))}
                    </Picker>
                </View>
                <TextInput
                    label="Quantidade"
                    value={obj.quantidade}
                    onChangeText={(e) => setObj({ ...obj, quantidade: e })}
                />
                <TextInput
                    label="Data Entrega"
                    value={obj.dataEntrega}
                    onChangeText={(e) => setObj({ ...obj, dataEntrega: e })}
                />
                <Button
                    mode="contained"
                    style={style.button}
                    onPress={() => console.log(obj)}
                >
                    <Text style={style.buttonText}>Cadastrar Pedido</Text>
                </Button>
            </View>

        </View>



    );
};

export default CadastroEncomendasView