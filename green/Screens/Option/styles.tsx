import { StyleSheet } from "react-native";

import { RFvalue, windowheight, windowwidth } from "../../Utilities/dimensions";
import { Colors, Fontfamily, Fontsize } from "../../Utilities/uiasset";

export const styles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: windowheight * 0.1,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    leftContent: {
        width: "15%",
        height: "100%",
        position: "absolute",
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
    },
    rightContent: {
        width: "35%",
        height: "100%",
        position: "absolute",
        right: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    headerContainer: {
        backgroundColor: theme.theme === "dark" ? "#1B1D20" : theme.card,
        flexDirection: "row",
        paddingHorizontal: "6%",
        paddingVertical: "3%",
        justifyContent: "space-between"
    },
    row: {
        flexDirection: "row",
        paddingHorizontal: "6%",
        paddingVertical: "2%",
        justifyContent: "space-between"
    },
    cell: {
        color: "#6D7584"
    },
    amount: {
        color: theme.darktext
    },
    currency: {
        color: Colors.green
    },
    content: {
        width: windowwidth * 0.33,
        alignItems: "flex-start",
    },
    tableContent: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: "2%"
    },
    info: {
        backgroundColor: "#2A1D15",
        paddingVertical: "3%",
        paddingHorizontal: "8%",
        borderRadius: 5,
        marginRight: "6%",
        marginLeft: -10
    },
    checkBoxContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "6%",
        paddingVertical: "3.5%"
    },
    check: {
        flexDirection: "row",
        alignItems: "center"
    },
    checkInner: {
        width: windowwidth*0.05,
        height: windowwidth*0.05,
        borderWidth: 1,
        borderColor: theme.theme === "dark" ? Colors.dune : theme.boderColor,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        borderRadius: 4,
    },
    basket: {
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: "2%",
    },
    basketButton: {
        width: "38%",
        paddingVertical: "2.5%",
    },
    headerText: {
        color: theme.primarytext,
        fontFamily: Fontfamily.medium,
        fontSize: RFvalue(18),
        width: "70%",
        textAlign: "center"
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    between: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    createBasket: {
        width: "100%",
        position: "absolute",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        left: -90
    },
    contentContainer: {
        paddingHorizontal: "6%",
        marginBottom: '5%'
    },
    down: {
        width: '35%',
        alignItems: "center",
        paddingVertical: '1.5%',
        flexDirection: "row",
        justifyContent: "space-around",
        borderColor: theme.theme === "dark" ? "#2F2F2F" : theme.boderColor,
        borderWidth: 1
    },
    strikes: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "4%",
        justifyContent: "space-between",
        paddingVertical: "3%",
        borderColor: theme.theme === "dark" ? "#2F2F2F" : theme.boderColor,
        borderWidth: 1
    },
    mark: {
        marginTop: "2%",
        marginBottom: "8%"
    },
    share: {
        color: Colors.graytext,
        marginBottom: "5%"
    },
    shareContainer: {
        width: '40%'
    },
    priceInput: {
        borderWidth: 1.5,
        borderRadius: 10,
        backgroundColor: theme.theme === "dark" ? "#131517" : Colors.white,
        borderColor: theme.theme === "dark" ? "#2F2F2F" : theme.boderColor,
        paddingHorizontal: '5%',
        color: Colors.white,
        fontFamily: Fontfamily.regular,
        fontSize: Fontsize.semimedium,
         height: windowheight * 0.05
    },
    price: {
        color: Colors.graytext,
        marginBottom: "5%"
    },
    priceContainer: {
        width: "55%"
    },
    amountCon: {
        padding: "4%",
        borderColor: theme.theme === "dark" ? Colors.dune : theme.boderColor
    },
    bgstyle: {
        borderColor: theme.theme === "dark" ? Colors.dune : theme.boderColor,
        borderRadius: 12
    },
    basketContent: {
        paddingHorizontal: "6%",
        marginTop: "4%",
        borderBottomWidth: 1,
        borderColor: theme.theme === "dark" ? "#333436" : theme.boderColor
    }

});