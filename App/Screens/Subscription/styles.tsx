import { StyleSheet } from 'react-native';
import { windowwidth } from '../../Utilities/dimensions';
import { Fontfamily, Fontsize } from '../../Utilities/uiasset';

const styles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        marginBottom: 40,
        gap: 14,

    },
    card: {
        width: windowwidth * 0.88,
    },
    containerBg: {
        paddingVertical: 25,
        paddingHorizontal: 18,
        borderRadius: 16,
    },
    content: {
        gap: 10,
        padding: 25,
    },
    premLg: {
        // backgroundColor: "white",
        width: windowwidth * 0.13,
        height: windowwidth * 0.13,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: windowwidth * 0.09,
        height: windowwidth * 0.09,
        resizeMode: 'contain',
    },
    Button: {
        paddingVertical: 13,
        fontFamily: Fontfamily.GMedium,
        fontSize: Fontsize.semilarge,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    slotBtn: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        borderRadius: 10,
        borderWidth: 1,
        width: windowwidth * 0.17,
        borderColor: '#CFCFCF',
        backgroundColor: theme.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    stdCard: {
        backgroundColor: '#F8F8F8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        padding: 15,
        gap: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#F8F8F8"
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#252525',
        paddingVertical: 0,
        borderRadius: 10,
        paddingHorizontal: 8
    },
    tag: {
        backgroundColor: '#252525',
        width: "70%",
        padding: 3,
        borderRadius: 20
    },
    servicePlan: {
        gap: 2,
        paddingHorizontal: 18,
        padding: 20,
        paddingTop: 20,
        borderWidth: 1,
        borderRadius: 10
    },
    month: {
        padding: 5,
        paddingHorizontal: 10,
        position: 'absolute',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        left: 9,
        top: -6,
    },
    btnn: {
        flexDirection: 'row',
        gap: 20,
        width: windowwidth * 0.3
    },
    genderBtn: {
        borderRadius: 10,
    },
    check: {
        color: 'white'
    }

})

export default styles;