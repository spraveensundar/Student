import { StyleSheet } from "react-native";

import { Fontfamily } from "../../Utilities/uiasset";
import { RFvalue, windowheight, windowwidth } from "../../Utilities/dimensions";

const styles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        color: theme.primarytext,
        fontFamily: Fontfamily.medium,
        fontSize: RFvalue(18),
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
    content: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "5%"
    },
    buttonContainer: {
        marginTop: "8%",
        marginBottom: "5%"
    },
    continue: {
        position: "absolute",
        bottom: "2%",
        left: 0,
        right: 0
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
        marginRight: 10
    }
})

export default styles;