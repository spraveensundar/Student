import { StyleSheet } from "react-native";

import { windowheight, windowwidth } from "../../Utilities/dimensions";
import { Colors, Fontsize } from "../../Utilities/uiasset";

const styles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1
    },
    tabContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "5%"
    },
    circle: {
        width: windowwidth * 0.090,
        height: windowwidth * 0.090,
        borderRadius: 100,
        backgroundColor: theme.card,
        alignItems: "center",
        justifyContent: "center",
        borderColor: theme.theme === "dark" ? "#2D3036" : theme.boderColor,
        borderWidth: 1
    },
    activeCircle: {
        backgroundColor: Colors.green,
    },
    circleText: {
        color: theme.darktext
    },
    activeText: {
        color: Colors.white,
    },
    line: {
        width: "100%",
        height: 2,
        backgroundColor: theme.boderColor,
        position: "absolute",
        zIndex: -1
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomWidth: 1,
        borderBottomColor: theme.theme === "dark" ? Colors.dune : theme.boderColor,
    },
    tab: {
        alignItems: "center",
        paddingVertical: 10,
    },
    underline: {
        height: 2,
        backgroundColor: theme.darktext,
        width: windowwidth * 0.40,
        marginTop: 5,
        borderRadius: 1,
        position: "absolute",
        bottom: -2
    },
    card: {
        width: "48%",
        height: 120,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderColor: theme.theme === "dark" ? Colors.dune : theme.boderColor,
        marginVertical: "8%"
    },
    copy: {
        width: "30%",
        paddingVertical: "2%",
        backgroundColor: theme.card,
        marginTop: "5%"
    },
    dashboard: {
        paddingHorizontal: "5%",
        marginTop: "5%"
    },
    subTitle: {
        color: Colors.grey,
        marginTop: "2%"
    },
    between: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    qrContainer: {
        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "center"
    },
    timerBox: {
        width: 24,
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "center",

    },
    timerText: {
        fontSize: 13,
        color: Colors.white,
        position: "absolute"

    },
    unitText: {
        fontSize: Fontsize.semismall,
        color: Colors.darkgray
    }
})

export default styles;