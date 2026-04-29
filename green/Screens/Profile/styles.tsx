import { StyleSheet } from "react-native";
import { Colors, Fontfamily } from "../../Utilities/uiasset";
import { RFvalue, windowheight, windowwidth } from "../../Utilities/dimensions";

export const styles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        color: theme.primarytext,
        fontFamily: Fontfamily.medium,
        fontSize: RFvalue(17),
        width: "70%",
        textAlign: "center"
    },
    headerContainer: {
        height: windowheight * 0.1,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    rightContent: {
        width: "15%",
        height: "100%",
        position: "absolute",
        right: "5%",
        justifyContent: "center",
        alignItems: "center"
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "3%",
        paddingVertical: windowheight * 0.02
    },
    leftContent: {
        width: "15%",
        height: "100%",
        position: "absolute",
        left: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonDark: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
    },
    circleContainer: {
        width: windowwidth * 0.17,
        height: windowwidth * 0.070,
        borderRadius: 100,
        padding: windowwidth * 0.01,
    },
    circle: {
        width: windowwidth * 0.060,
        height: windowwidth * 0.060,
        borderRadius: 100
    },
    icon: {
        position: "absolute",
        left: 10
    },
    iconRight: {
        position: "absolute",
        right: 10
    },
    profileTitle: {
        alignItems: "flex-start",
        width: "55%"
    },
    title: {
        alignItems: "flex-start",
        paddingVertical: "3.5%",
        paddingLeft: '3%'
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    img: {
        width: "20%",
        alignItems: "center"
    },
    between: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    verified: {
        width: "40%",
        paddingVertical: "3%",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems:"center"
    },
    verifiedContainer: {
        paddingTop: "10%",
        paddingLeft: "5%",
        paddingBottom: "4%"
    },
    bottomButton: {
        position: "absolute",
        bottom: "1%",
        left: 0,
        right: 0,
    },
    language: {
        backgroundColor: theme.theme === "dark" ? Colors.darkgray : "#c2c2c799",
        padding: '1.5%',
        borderRadius: 20,
        paddingHorizontal: "6%"
    },
    webhooks: {
        flexDirection: 'row',
        padding: "2.5%",
        justifyContent: "space-between",
        paddingHorizontal: "3%",
        marginTop: "10%"
    },
    webhooksText: {
        color: theme.theme === "dark" ? "#EBEBF599" : "#202020",
        fontSize: 11
    },
    submitButton: {
        width: "28%",
        backgroundColor: Colors.red,
        paddingVertical: "2%",
        paddingHorizontal: "2%"
    },
    buttonContainer: {
        width: "45%",
        backgroundColor: Colors.green,
        alignItems: "center",
        paddingVertical: "4%",
        borderRadius: 10
    },
    setup: {
        color: Colors.dustygrey,
        marginTop: "3%",
        marginBottom: "8%"
    },
    edit: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: "4%",
        alignItems: "center",
        paddingHorizontal: "5%"
    },
    note: {
        marginBottom: "-2%",
        marginTop: "10%"
    },
    mange: {
        width: "30%",
        paddingVertical: "2%",
        backgroundColor: theme.card,
        marginVertical: "7%"
    },
    qr: {
        padding: "5%",
        alignItems: "center",
        width: "70%",
        backgroundColor: "#fff"
    },
    qrContainer: {
        alignItems: "center",
        marginBottom: "10%"
    },
    changeButton: {
        backgroundColor: Colors.btnBgGray,
        width: "35%",
        paddingVertical: "3%",
        borderRadius: 10,
        alignItems: "center"
    },
    sheet: {
        padding: "5%",
        borderWidth: 1,
        borderColor: theme.boderColor
    },
    historyButton: {
        width: "50%",
        paddingVertical: "3%",
        backgroundColor: "#1F2225",
        borderWidth: 1,
        borderColor: "#1E2022"
    },
    changes: {
        width: '28%',
        borderRadius: 30,
        height: windowheight * 0.045,
        backgroundColor: theme.card,
    },
    card: {
        paddingHorizontal: 30,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        height: windowheight * 0.045,
    },
    account: {
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        paddingHorizontal: "5%",
        width: "100%",
        position: "relative",
        borderColor: theme.theme == "dark" ? Colors.dune : theme.boderColor
    },
    checkIcon: {
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 1000
    },
    margin: {
        backgroundColor: theme.card,
        width: "48%",
        paddingVertical: "2.5%",
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: theme.card
    },
    marginActive: {
        backgroundColor: "#31880828",
        width: "48%",
        paddingVertical: "2.5%",
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.green
    },
    subAccount: {
        width: windowwidth * 0.055,
        height: windowwidth * 0.055,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Colors.lightgreen,
    },
    copy: {
        marginLeft: "3%",
        backgroundColor: theme.card,
        height: windowheight * 0.06,
        alignItems: "center",
        justifyContent: "center"
    },
    select: {
        width: windowwidth * 0.065,
        height: windowwidth * 0.065,
        borderRadius: 100,
        borderColor: theme.theme === "dark" ? "" : theme.boderColor,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    }
})
