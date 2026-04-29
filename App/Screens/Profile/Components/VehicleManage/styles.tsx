import { StyleSheet } from 'react-native';
import { windowwidth } from '../../../../Utilities/dimensions';

const styles = (theme: any) => StyleSheet.create({
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