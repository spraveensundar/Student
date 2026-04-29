import { StyleSheet } from 'react-native';
import { Fontfamily, Fontsize } from '../../../Utilities/uiasset';
import { windowheight } from '../../../Utilities/dimensions';

const styles = (theme: any) => StyleSheet.create({
    listContainer: {
        paddingVertical: 20,
    },

    messageRow: {
        flexDirection: "row",
        marginVertical: 10,
        paddingHorizontal: 10,
    },

    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginRight: 10,
    },

    bubble: {
        paddingLeft: "5%",
        paddingRight: "2%",
        paddingVertical: "3%",
        maxWidth: "85%",
        minWidth: 80,
    },
    sendBtn: {
        backgroundColor: theme.btnColor,
        marginLeft: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 30,
    },
    headerRightBtn: {
        backgroundColor: theme.card,
        padding: 10,
        borderRadius: 25,

    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: windowheight * 0.115,
        maxHeight: windowheight * 0.16,
        paddingVertical: 10,

    },
    inputWrapper: {
        flex: 1,
        justifyContent: "center",
    },

    textInput: {
        backgroundColor: theme.card,
        fontFamily: Fontfamily.GRegular,
        fontSize: Fontsize.medium,
        padding: 12,
        paddingRight: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CFCFCF'
    },

    audioIcon: {
        position: "absolute",
        right: 12,
        padding: 5,
    },
    floatingScrollBtn: {
        position: "absolute",
        bottom: 100,
        right: 20,
        backgroundColor: theme.btnColor,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
})

export default styles;