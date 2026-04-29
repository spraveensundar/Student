import { StyleSheet } from 'react-native';
import { Colors, Fontfamily, Fontsize } from '../../../Utilities/uiasset';
import { windowheight } from '../../../Utilities/dimensions';
import { ThemeType } from '../../../Utilities/theme';

const styles = (theme: ThemeType) => StyleSheet.create({
    headerContainer: {
        height: windowheight * 0.1,
        marginTop: 10,
        paddingHorizontal: "6%",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    autoLocContainer: {
        flex: 1,
        padding: 20,
            
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fetchedContent: {
        flex: 1,
        justifyContent: 'flex-end',
        // gap: 80,
    },
    gif: {
        width: "50%",
        height: undefined,
        aspectRatio: 1,
        marginBottom: 20,
    },
    addresstxt: {
        fontSize: Fontsize.semimedium,
        fontFamily: Fontfamily.bold,
        // color: Colors.black,
    },
    buttonContainer: {
        marginBottom: 20,
        gap: 20,
    },
    locationStatus: {
        justifyContent: 'center',
        alignItems: 'center',
        // gap: 10,
        marginBottom: 40,
    },
    button: {
        backgroundColor: theme.btnColor,
        borderRadius: 25,
        paddingVertical: 13,
        fontFamily: Fontfamily.GMedium,
        fontSize: Fontsize.semilarge,
        width:"100%"
    },
    buttonSelect: {
        borderRadius: 25,
        paddingVertical: 13,
        fontFamily: Fontfamily.GMedium,
        fontSize: Fontsize.semilarge,
        borderColor: theme.btnColor,
        backgroundColor: 'white',
        borderWidth: 1,
        width:"100%"
    },
    locDetails: {
        gap: 20,
        marginTop:20,
        display: 'flex',
    },
    map: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },

    menutab: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tab: {
        borderWidth: 1,
        borderColor: theme.btnColor,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    activeTab: {
        backgroundColor: theme.tabactive,
    },
    tabText: {
        fontFamily: Fontfamily.GMedium,
        fontSize: Fontsize.medium,
    },
    activeTabText: {
        color: 'white',
    },
    input: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: theme.lightGrey,
        backgroundColor: theme.lightGrey,
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontFamily: Fontfamily.GRegular,
        fontSize: Fontsize.medium,
        color:theme.textinput
    },
    select: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
})

export default styles;