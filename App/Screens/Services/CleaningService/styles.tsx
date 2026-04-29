import { StyleSheet } from 'react-native';
import { Fontfamily, Fontsize, Colors } from '../../../Utilities/uiasset';
import { windowheight, windowwidth } from '../../../Utilities/dimensions';


const styles = (theme: any) => StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 20,
        height: '100%'
    },
    button: {
        backgroundColor: theme.btnColor,
        borderRadius: 25,
        marginBottom: 20,
        paddingVertical: 13,
        fontFamily: Fontfamily.GMedium,
        fontSize: Fontsize.semilarge,
    },
    vehicleType: {
        width: '100%',
        height: windowheight * 0.25,
        // aspectRatio: 1.9,
        borderRadius: 18,
        backgroundColor: theme.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
        marginVertical: 10,
    },
    vehicleImg: {
        // width: windowwidth*0.7,
        // height:windowheight*0.2,
        backgroundColor: "red"
    },
    vehicleContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        // justifyContent: "space-between",
        paddingVertical: 20,
        gap: 10,
    },
    vehicleBrand: {
        cursor: 'pointer',
        backgroundColor: theme.lightGrey,
        borderRadius: 20,
        marginBottom: 10,
        width: "30%",
        aspectRatio: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    vehicle: {
        backgroundColor: theme.lightGrey,
        aspectRatio: 2,
        padding: 20,
        paddingTop: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        gap: 10
    },
    vehicleActive: {
        backgroundColor: theme.lightGrey,
        aspectRatio: 2,
        paddingTop: 30,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        gap: 10,
        borderWidth: 1,
        borderColor: theme.primarytext,
        // borderColor: "#CFCFCF",
        
    },
    onTimeContainer: {
        backgroundColor: '#F8F8F8',
        marginVertical: 20,
        gap: 20,
        borderRadius: 10,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#252525',
        paddingVertical: 0,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 15
    },
    tag: {
        backgroundColor: theme.cardBg,
        padding: 5,
        borderRadius: 5
    },
    priceBtn: {
        backgroundColor: Colors.green,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row',
        gap: 10
    },
    addToCart: {
        backgroundColor: '#252525',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    btn: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    locPin: {
        width: 40,
        height: 40,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    locFetch: {
        marginBottom: 20,
        alignItems: "center",
        display: "flex",
        flexDirection: 'row'
    },
    rTag: {

    },
    map: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
})

export default styles;