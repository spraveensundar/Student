import { StyleSheet } from "react-native";
import { borderradius } from "../../Utilities/dimensions";


export const style = (theme?: any) => StyleSheet.create({
    pricecontainer: {
        paddingHorizontal: 10,
        height: "100%",
        justifyContent: "center"
    },
    activetab: {
        width: "32%",
        height: "100%",
        backgroundColor: theme.tabactive,
        borderRadius: borderradius * 0.5,
        alignItems: "center",
        justifyContent: "center"
    },
    inactivetab: {
        width: "32%",
        height: "100%",
        backgroundColor: theme.card,
        borderRadius: borderradius * 0.5,
        borderWidth: 1,
        borderColor: theme.boderColor,
        alignItems: "center",
        justifyContent: "center"
    }
})