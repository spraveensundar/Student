import { StyleSheet } from 'react-native';
import { Fontfamily, Fontsize } from '../../Utilities/uiasset';
import { windowheight } from '../../Utilities/dimensions';

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
        gap: 20,
        padding: 20,
        borderTopRightRadius: 24,
        borderBottomLeftRadius: 24,
        maxWidth: "100%",
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
        height: windowheight * 0.115,

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


})

export default styles;