import { StyleSheet } from 'react-native';
import { windowwidth } from '../../Utilities/dimensions';

const styles = (theme: any) => StyleSheet.create({
    premLg: {
        backgroundColor: "white",
        width: windowwidth * 0.13,
        height: windowwidth * 0.13,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    upgrade: {
        position: 'absolute',
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    container: {
        borderWidth: 1,
        borderColor: '#CFCFCF',
        borderRadius: 10,
        backgroundColor: theme.card,
    },
    vehicle: {
        backgroundColor: theme.lightGrey,
        aspectRatio: 2,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
})

export default styles;