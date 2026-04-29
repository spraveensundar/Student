import { StyleSheet } from 'react-native';
import { Colors, Fontfamily, Fontsize } from '../../Utilities/uiasset';
import { windowheight } from '../../Utilities/dimensions';

const styles = (theme: any) => StyleSheet.create({
    headerContainer: {
        height: windowheight * 0.1,
        paddingHorizontal: "6%",
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {

        flexDirection: 'column',
        gap: 4,
    },
    lgnButton: {
        backgroundColor: '#F3F3F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        fontFamily: Fontfamily.GMedium,
        fontSize: Fontsize.medium,
        alignItems: 'center',
        width: '100%',
    },
    lgnButtonTitle: {
        fontSize: Fontsize.medium,
        fontWeight: '600',
        color: "black",
    },
    phoneContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        paddingHorizontal: 8,
        paddingVertical: 4,
        alignItems: 'center',
        marginVertical: 20,
        width: "100%",
    },
    countrySection: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    flag: {
        width: '25%',
        height: undefined,
        aspectRatio: 1,
        marginRight: 5,
    },
    inputPhNo: {
        fontSize: Fontsize.medium,
        fontFamily: Fontfamily.GRegular,
    },
    title: {
        color: Colors.grey,
        fontFamily: Fontfamily.GMedium,
        fontSize: Fontsize.medium,
    },
    otpContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 20,
    },
    otpInputCnt: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    otpInput: {
        width: '40%',
        height: '40%',
        borderWidth: 1,
        backgroundColor: theme.lightGrey,
        borderRadius: 5,
        fontSize: Fontsize.extralarge,
    },
    nextButton: {
        backgroundColor: theme.btnColor,
        borderRadius: 25,
        paddingVertical: 13,
        fontFamily: Fontfamily.GMedium,
        fontSize: Fontsize.semilarge,
    },
    resendOtp: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    }

});

export default styles;