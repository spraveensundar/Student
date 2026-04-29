import { StyleSheet } from 'react-native';
import { borderradius, windowwidth } from '../../../../Utilities/dimensions';

const styles = (theme: any) => StyleSheet.create({

    btn: {
        paddingVertical: '2%',
        paddingHorizontal: '5%',
        borderRadius: 5
    },
    deleteBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.btnColor,
    }

})

export default styles;