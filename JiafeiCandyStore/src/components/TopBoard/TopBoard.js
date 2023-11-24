import { Dimensions, Image, StyleSheet, View } from "react-native"

import logoImg from "../../../assets/img/logotipo.webp"

const widthTela = Dimensions.get('screen').width

const TopBoard = () => {

    const style = StyleSheet.create({
        containerTB: {
            flex: 1,
            alignItems: "center",
        },
        imgTB: {
            width: "100%",
            height: (800 / 800) * widthTela,
        }
    })

    return (
        <View style={style.containerTB}>
            <Image source={logoImg}
                style={style.imgTB} >
            </Image>
        </View>
    )
}

export default TopBoard