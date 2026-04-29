import { StyleSheet } from 'react-native';
import { windowwidth } from '../../../../Utilities/dimensions';

const styles = (theme: any) => StyleSheet.create({
    container: {
        backgroundColor: theme.card,
        borderWidth: 1,
        borderColor: theme.cardborder,
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 15
    },
    detail: {
        borderWidth: 1,
        borderColor: '#CFCFCF',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        gap: 10,
    },
    card: {
        borderWidth: 1,
        borderColor: '#CFCFCF',
        borderRadius: 10,
        flexDirection: 'column',
        padding: 20,
        backgroundColor: theme.card,
        gap: 5,
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 15,
        borderWidth: 2,

        justifyContent: "center",
        alignItems: "center",
    },
    line: {
        width: 2,
        height: 43,
        backgroundColor: "#ccc",
        marginVertical: 2,
    },
    icon: {
        backgroundColor: '#000C511A',
        padding: 10,
        borderRadius: 20,

    },
    btn: {
        width: windowwidth * 0.2,

        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5
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
})

export default styles;