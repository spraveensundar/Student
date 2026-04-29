import { StyleSheet } from "react-native";

import { borderradius, windowheight, windowwidth } from "../../Utilities/dimensions";
import { Colors } from "../../Utilities/uiasset";

export const styles = (theme: any) => StyleSheet.create({
    sheetContainer: {
        padding: "5%",
        borderWidth: 1,
        borderColor: theme.boderColor
    },
    sheet: {
        padding: "4%",
        backgroundColor: theme.bottomheader,
        paddingHorizontal: "5%"
    },
    between: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    swtich: {
        width: windowwidth * 0.25,
        height: windowheight * 0.040,
        marginTop: "3%",
        backgroundColor: "#31880828",
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.green
    },
    line: {
        borderBottomWidth: 1,
        borderStyle: "dashed",
        borderBottomColor: theme.theme === "dark" ? Colors.grey : theme.boderColor,
        marginTop: "3%"
    },
    input: {
        backgroundColor: theme.theme === "dark" ? Colors.darkgray : Colors.dustygrey,
        padding: 5,
        borderRadius: 5,
        paddingHorizontal: 8,
        width: 60,
        alignItems: "center",
        height: 35,
        justifyContent: "center"
    },
    inputStyle: {
        textAlign: 'right',
        marginRight: 25
    },
    container: {
        flex: 1,
        marginBottom: windowheight * 0.085
    },
    quan: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 3
    },
    quantity: {
        textAlign: 'right',
        marginRight: 60
    },
    percent: {
        width: "23%",
        paddingVertical: 6,
        backgroundColor: theme.card,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: theme.theme === "dark" ? Colors.dune : theme.borderBottomColor
    },
    addButton: {
        width: "18%",
        height: 35,
        borderRadius: 5
    },
    check: {
        borderColor: theme.theme === "dark" ? Colors.dune : theme.borderBottomColor,
        borderWidth: 1
    },
    buttonContainer: {
        position: "absolute",
        bottom: 0,
        backgroundColor: theme.card,
        height: windowheight * 0.085,
        width: windowwidth,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    sell: {
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: windowwidth * 0.025,
        borderRadius: borderradius * 0.5
    },
    activeButton: {
        backgroundColor: Colors.primary,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 14,
    },
    dropdownMenu: {
        position: 'absolute',
        top: 35, // adjust so it appears just below the selector
        left: 0,
        right: 0,
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
        zIndex: 999,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },

    },
    menuItemText: {
        color: Colors.white,
        fontSize: 14,
    },
    activeItem: {
        backgroundColor: Colors.darkgray,
    },
    activeItemText: {
        color: Colors.white,
    },
    menu: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: windowwidth * 0.03,
        marginTop: '2%',
        paddingHorizontal: "6%"
    },
    lines: {
        borderBottomWidth: 1.5,
        borderColor: theme.boderColor,
        marginBottom: '5%',
        width: windowwidth,
        alignSelf: "center"
    },
    buy: {
        width: "40%",
        borderWidth: 1,
        borderColor: Colors.green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: borderradius * 0.5,
        paddingVertical: "2.5%"
    },
    sellBtn: {
        width: "40%",
        borderWidth: 1,
        borderColor: Colors.red,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: borderradius * 0.5,
        paddingVertical: "2.5%"
    },
    close: {
        width: "10%",
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        borderRadius: borderradius * 0.5,
        borderColor: theme.boderColor
    }
})