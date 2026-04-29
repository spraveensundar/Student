import { StyleSheet } from "react-native";

import { Colors } from "../../Utilities/uiasset";
import { borderradius, windowheight, windowwidth } from "../../Utilities/dimensions";

export const styles = (theme: any) => StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomWidth: 2,
        borderBottomColor: theme.theme === "dark" ? Colors.dune : theme.boderColor,
        marginTop: 10,
        position: "relative",
    },
    tab: {
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 10
    },
    tabContent: {
        height: 2,
        backgroundColor: theme.darktext,
        width: windowwidth * 0.10,
        borderRadius: 1,
        position: "absolute",
        bottom: -10
    },
    balance: {
        paddingHorizontal: 20,
        marginTop: "6%"
    },
    balanceContainer: {
        padding: 15,
        width: "100%",
        paddingVertical: "5%",
        marginBottom: "5%"
    },
    add: {
        marginTop: "2%",
        width: "38%",
        height: windowheight * 0.040
    },
    accrodion: {
        paddingHorizontal: 20,
        paddingVertical: "3%",
        borderRadius: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    line: {
        width: "100%",
        borderBottomWidth: 1,
        borderStyle: "dashed",
        borderColor: Colors.grey,
        marginVertical: "3%"
    },
    rate: {
        padding: '2.5%',
        alignItems: "center",
        marginVertical: "10%"
    },
    padding: {
        paddingHorizontal: 20
    },
    position: {
        marginTop: "2.5%",
        padding: 10,
        width: "100%"
    },
    positionCard: {
        backgroundColor: theme.midblack,
        padding: 13,
        marginTop: 10
    },
    center: {
        width: "40%",
        alignItems: "center"
    },
    end: {
        width: "20%",
        alignItems: "flex-end"
    },
    bal: {
        alignItems: "flex-end",
        width: "20%"
    },
    bottom: {
        justifyContent: "space-between",
        paddingTop: 10,
        width: "100%"
    },
    algin: {
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row"
    },
    between: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    action: {
        marginLeft: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.background,
        width: windowwidth * 0.1,
        height: windowwidth * 0.1,
        borderRadius: borderradius * 3
    },
    remove: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        backgroundColor: theme.background,
        width: windowwidth * 0.1,
        height: windowwidth * 0.1,
        borderRadius: borderradius * 3
    },
    noData: {
        height: windowheight * 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    addText: {
        backgroundColor: Colors.lightGreen,
        borderWidth: 1,
        borderColor: Colors.btnBgGreen,
        borderRadius: 5
    },
    det: {
        flexDirection: "row",
        width: "auto",
        alignItems: "center"
    },
    added: {
        color: Colors.textWhite,
        paddingHorizontal: 20,
        paddingVertical: 6
    },
    close: {
        color: Colors.red,
        paddingHorizontal: 18,
        paddingVertical: 5
    },
    closeContainer: {
        borderColor: Colors.red,
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 35
    },
    border: {
        padding: "5%",
        borderWidth: 1,
        borderColor: theme.boderColor
    },
    header: {
        padding: "4%",
        backgroundColor: theme.bottomheader,
        paddingHorizontal: "5%",
    },
    containerCon: {
        flex: 1,
        padding: "5%",
        width: "100%"
    },
    market: {
        flexDirection: 'row',
        marginBottom: "5%"
    },
    marketContent: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 5
    },
    limitContent: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 5,
        marginLeft: 15
    },
    quan: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5
    },
    percent: {
        width: "15%",
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    confim: {
        width: "35%",
        marginLeft: 10
    },
    cancel: {
        width: "35%",
        backgroundColor: theme.card
    },
    quantity: {
        textAlign: 'right',
        marginRight: 60
    }
})