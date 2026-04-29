import { StyleSheet } from 'react-native';
import { windowwidth } from '../../../Utilities/dimensions';

const styles = (theme: any) => StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20,
        gap: 20
    },
    calendar: {

        borderRadius: 15,
        elevation: 2,
        backgroundColor: theme.lightGrey,
        paddingBottom: 10,
    },
    status: {
        backgroundColor: '#252525',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    addOns: {
        backgroundColor: theme.card,
        gap: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    addbtn: {
        backgroundColor: theme.btnTag,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderRadius: 10
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
        backgroundColor: theme.Card,
        justifyContent: 'center',
        alignItems: 'center',
    },
    serviceaAddOns: {
        backgroundColor: theme.Card,
        borderWidth: 1,
        borderColor: theme.cardborder,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
    },
    detail: {
        borderWidth: 1,
        borderColor: '#CFCFCF',
        backgroundColor: theme.card,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        gap: 10
    },
    stsBtn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    card: {
        borderWidth: 1,
        borderColor: '#CFCFCF',
        borderRadius: 10,
        flexDirection: 'column',
        padding: 20,
        backgroundColor: theme.card,
        gap: 10,
    },
    report: {
        width: windowwidth * 0.2,
        backgroundColor: '#E2004F1A',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5
    },

})

export default styles;