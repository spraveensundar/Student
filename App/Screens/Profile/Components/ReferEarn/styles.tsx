import { StyleSheet } from 'react-native';
import { borderradius, windowwidth } from '../../../../Utilities/dimensions';

const styles = (theme: any) => StyleSheet.create({

    referal: {
        width: "100%",
        paddingVertical: "3%",
        paddingHorizontal: "5%",
        borderRadius: borderradius * 0.5,
        flexDirection: "row",
        alignItems: "center",
        marginTop: "2.5%",
        marginBottom: "5%"
    },

})

export default styles;