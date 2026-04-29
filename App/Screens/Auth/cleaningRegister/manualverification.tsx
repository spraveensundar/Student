import { BackHandler, Pressable, View } from "react-native"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text"
import Card from "../../../Components/Card"
import { borderradius, windowwidth } from "../../../Utilities/dimensions"
import useCustomHooks, { Commonalert, useHardwareBackPress, useHardwarebutton } from "../../../Actions/Hooks/customhook"
import Images, { icons } from "../../../Utilities/images"
import { useEffect, useState } from "react"
import { Colors } from "../../../Utilities/uiasset"
import VectorIcons from "../../../Utilities/vectorIcons"
import { helperSelector, update_cleaningreg } from "../../../Slices/helper"
import { useSelector } from "react-redux"
import { authSelector, useCommonVerifiedStatusMutation } from "../../../Slices/auth"

type status = "pending" | "approved" | "rejected"
interface commonprops {
    title: string,
    onPress?: () => void,
    status?: status,
    top?: any,
    theme?: any,
}

const Manualverification: React.FC = () => {
    const { theme, navigation, dispatch } = useCustomHooks();
    const { serviceMan } = useSelector(authSelector);
    const [commonVerifiedStatus, { isLoading, error }] = useCommonVerifiedStatusMutation()
    const [isupdate, setIsupdate] = useState<status>("pending")
    const { servicetype } = useSelector(helperSelector)

    useEffect(() => {

        {
            serviceMan?.verificationStatus?.isRegistered === "approved" && serviceMan?.verificationStatus?.isDocumentVerified === "approved" && serviceMan?.verificationStatus?.isTrained === "approved" ?
                setIsupdate("approved") : setIsupdate("pending")
        }
        // setTimeout(() => {
        //     setIsupdate("complete")
        // }, 1500)
    }, []);

    console.log('serviceMan', isupdate);
    const registerFinish = async () => {
        const response = await commonVerifiedStatus("").unwrap()
        console.log('COMMON-VERIFIED-STATUS-RESPONSE', response);
        if (servicetype == "dailywash") {
            navigation.navigate("Vendorhome");
        } else {
            navigation.navigate("Vendorhome");
        }
    }

    const callDocpage = () => {
        console.log('DOCUMENT-STATUS', serviceMan?.verificationStatus?.isDocumentVerified);
        {
            serviceMan?.verificationStatus?.isDocumentVerified === "rejected" &&
                navigation.navigate("Aadharverification")
        }

    }
    const callRegister = () => {
        console.log('DOCUMENT-STATUS', serviceMan?.verificationStatus?.isRegistered);
        {
            serviceMan?.verificationStatus?.isRegistered === "rejected" &&
                navigation.navigate("CleaningResiter")
        }
    }

   useHardwarebutton({
    yesfn:() => navigation.navigate("Categories")
   })
    return (
        <Mainview
            headertitle="Verification"
            isscollable={false}
            bottomContent={isupdate === "approved"}
            onBottompress={() => {
                // navigation.navigate("Vendorhome");
                dispatch(update_cleaningreg("complted"))
                registerFinish()
            }}
            
            onleftfn={() => {
               navigation.navigate("Categories")
            }}
        >
            <View style={{ flex: 1 }} >
                <Text size="semilarge" top={"5%"} >Manual verification on process</Text>
                {isupdate === "approved" ?
                    <Text size="semimedium" family="GRegular" top={"2.5%"} >Your account setup is complete. You can now log in.</Text> :
                    <Text size="semimedium" family="GRegular" top={"2.5%"} style={{ textAlign: "justify", lineHeight: 18 }}>We are currently finalizing your account setup. Please wait until this process is fully complete and you receive a success notification. You will be able to log in immediately after.</Text>}

                <Pressable onPress={() => { callRegister() }}>
                    <Common
                        title="Registration"
                        top={"5%"}
                        status={serviceMan?.verificationStatus?.isRegistered}
                        theme={theme}
                    />
                </Pressable>

                {/* <Common
                    title="Integration"
                    top={"5%"}
                    status={isupdate}
                /> */}
                <Pressable onPress={() => { callDocpage() }}>
                    <Common
                        title="Document Verification"
                        top={"5%"}
                        status={serviceMan?.verificationStatus?.isDocumentVerified}
                        theme={theme}
                    />
                </Pressable>

                <Common
                    title="Training"
                    top={"5%"}
                    status={serviceMan?.verificationStatus?.isTrained}
                    theme={theme}
                />

                {/* <Common
                    title="Profile Generation"
                    top={"5%"}
                    status={isupdate}
                /> */}
            </View>
        </Mainview>
    )
}

export default Manualverification;

export const Common = ({
    title,
    status,
    top = 0,
    theme,
}: commonprops) => {
    return (
        <Card containerStyle={{ flexDirection: "row", alignItems: "center", width: "100%", paddingVertical: "4%", paddingHorizontal: "2.5%", marginTop: top, borderRadius: borderradius * 3, backgroundColor: theme.background, borderWidth: 1, borderColor: "#12110D1F" }} >
            <View style={{ width: "85%", height: "100%", paddingHorizontal: "2.5%" }} >
                <Text family="GRegular" size="medium" >{title}</Text>
            </View>
            <View style={{ width: "15%", justifyContent: "center", alignItems: "center" }} >
                {/* {status === "pending" ?
                    <Images
                        type="image"
                        source={icons.Warn}
                        width={windowwidth * 0.075}
                        height={windowwidth * 0.05}
                    /> : */}
                {/* <View style={{ width: windowwidth * 0.06, height: windowwidth * 0.06, borderRadius: borderradius * 5, backgroundColor: Colors.green, justifyContent: "center", alignItems: "center" }} > */}
                <VectorIcons
                    {...(status === "approved" ? {
                        family: "Ionicons",
                        name: "checkmark-circle-sharp",
                        iconcolor: Colors.green
                    } : (status === "pending" ? {
                        family: "Ionicons",
                        name: "warning",
                        iconcolor: Colors.yellow
                    } : {
                        family: "MaterialIcons",
                        name: "cancel",
                        iconcolor: Colors.red
                    }))}
                    size={windowwidth * 0.06}
                />
                {/* </View>} */}
            </View>
        </Card>
    )
} 