import { StyleSheet } from 'react-native';
import { Colors, Fontfamily, Fontsize } from '../../Utilities/uiasset';
import { borderradius, windowheight, windowwidth } from '../../Utilities/dimensions';
import { color } from 'react-native-elements/dist/helpers';

const styles = (theme: any) => StyleSheet.create({
    homeHeaderContainer: {
        backgroundColor: theme.btnColor,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        padding: 20,
        paddingVertical: 0,
        gap: 10,
        height: windowheight * 0.225,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: "2.5%"

    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: -20,
    },
    log: {
        width: 70,
        height: 70,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    locationPress: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: "2.5%"
    },
    notification: {
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomText: {
        fontSize: Fontsize.medium,
        fontFamily: Fontfamily.GMedium,
    },
    searchContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        width: "100%",
        borderColor: theme.lightGrey,
        borderRadius: 30,
        paddingHorizontal: 15,
        gap: 8,
        backgroundColor: 'white',
    },
    searchInput: {
        flex: 1,
        fontFamily: Fontfamily.GRegular,
        fontSize: Fontsize.semimedium,
    },
    card: {
        width: windowwidth * 0.42,
        backgroundColor: theme.lightGrey,
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        height: windowheight * 0.19
    },
    tag: {
        position: 'absolute',
        top: 0,
        right: 0,
        // paddingHorizontal: 8,
        // paddingVertical: 4,
        // borderRadius: 6,
        zIndex: 1,
        width: "45%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: windowwidth * 0.0125,
        borderTopRightRadius: borderradius * 0.5,
        borderBottomLeftRadius: borderradius * 0.5
    },
});


export default styles;