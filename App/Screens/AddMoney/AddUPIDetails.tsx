import useCustomHooks from "../../Actions/Hooks/customhook"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import React from "react";
import Mainview from "../../Components/mainview";
import { KeyboardAvoidingView, KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Input } from "../../Components/Field";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "../../Components/text";
import { Colors, Fontfamily } from "../../Utilities/uiasset";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'AddUPIDetails'>;

const AddUPIDetails: React.FC<Props> = () => {

    const { theme, navigation } = useCustomHooks()

    return (
        <Mainview
            onleftfn={() => navigation.goBack()}
            headertitle="Add UPI"
            isscollable={false} >

            <KeyboardAvoidingView
                behavior="padding">
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ flex: 1, marginTop: 20, width: "auto", justifyContent: "flex-start", }}>

                        <Input
                            label="Enter UPI ID"
                            placeHolder=""
                        />

                    </View>
                </KeyboardAwareScrollView>
            </KeyboardAvoidingView>

            <View style={styles.bottomView}>

                <Pressable onPress={() => navigation.goBack()} style={{ backgroundColor: Colors.btnBgGreen, alignItems: "center", borderRadius: 10, width: "100%", marginRight: 10, minHeight: 40, }}>
                    <Text style={styles.btntxtStyle}>Verify</Text>
                </Pressable>

            </View>
        </Mainview>
    )

}
const styles = StyleSheet.create({
    bottomView: {
        width: "100%",
        justifyContent: "center",
        bottom: 0,
        position: "absolute",
    },
    btntxtStyle: {
        color: Colors.textWhite,
        fontFamily: Fontfamily.semiBold,
        padding: 12,
    },
    item: {

    }
})
export default AddUPIDetails