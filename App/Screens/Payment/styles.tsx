import { StyleSheet } from 'react-native';
import { windowwidth } from '../../Utilities/dimensions';
import { Colors, Fontfamily, Fontsize } from '../../Utilities/uiasset';

const styles = (theme: any) => StyleSheet.create({
    container: {
        gap: 20,
        flex: 1,
        paddingVertical: 20,
    },
    detail: {
        backgroundColor: theme.card,
        borderRadius: 10,
        // height: windowwidth * 0.3,

    },
    coupon: {
        borderRadius: 10,
        height: windowwidth * 0.3,
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    icon: {
        justifyContent: 'space-around',
        backgroundColor: theme.btnColor,
        padding: 10,
        borderRadius: 10,
        height: windowwidth * 0.25,
    },
    arrowDown: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: "2.5%"
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
        width: windowwidth * 0.165,
        borderColor: theme.cardborder,
        backgroundColor: theme.lightGrey,
        justifyContent: 'center'
    },
    log: {
        width: '20%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    couponCode: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingLeft: 15,
        paddingRight: 90,
        fontFamily: Fontfamily.GRegular,
        fontSize: theme.medium,
    },
    applyBtn: {
        position: 'absolute',
        right: 10,
        height: 36,
        paddingHorizontal: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderWidth: 1,
        borderColor: '#ECE7F8',
        borderRadius: 15,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        elevation: 3,
    },

    cardLeft: {
        backgroundColor: theme.cardLeft,
        width: windowwidth * 0.2,
        borderWidth: 1,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: "center",

    }
})

export default styles;