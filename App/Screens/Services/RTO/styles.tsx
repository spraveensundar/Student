import { StyleSheet } from "react-native";

const styles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "5%"
    },
    label: {
        marginTop: "5%",
        textAlign: "center",
        width: "100%"
    },
    card: {
        alignItems: "center",
        width: "30%"
    },
    subContainer: {
        width: '100%',
        marginTop: "5%"
    },
    buttonContainer: {
        paddingHorizontal: "6%",
        marginTop: 10
    }
})

export default styles;