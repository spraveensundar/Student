import Mainview from "../../Components/mainview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import React, { useEffect, useState } from "react";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { StyleSheet, View } from "react-native";
import { windowheight, windowwidth } from "../../Utilities/dimensions";
import { useCodeScanner, Camera, useCameraDevice } from 'react-native-vision-camera';
import Text from "../../Components/text";
import LottieView from 'lottie-react-native';
import { Lotties } from "../../Utilities/images";
type Props = NativeStackScreenProps<Stacknavigationtypes, 'QRcodeScanner'>;

const QRcodeScanner: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks()
    //const { t, i18n } = useTranslation()
    const [hasPermission, setHasPermission] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [scanned, setScanned] = useState(false); // <- NEW STATE
    const device = useCameraDevice("back");

    const codeScanner = useCodeScanner({
        codeTypes: ["qr"],
        onCodeScanned: (codes) => {
            if (!scanned && codes.length > 0) {
                setScanned(true); // Prevent multiple triggers
                console.log(`onCodeScanned`, codes);
                console.log(`Scanned value`, codes[0].value);
                // onRead(codes[0].value)
                // Delay goBack slightly to prevent camera crash or flicker
                setTimeout(() => {
                    //  onRead(codes[0].value)
                }, 300);
            }
        },
    });

    useEffect(() => {
        setRefresh(!refresh);
    }, [device, hasPermission]);

    useEffect(() => {
        const requestCameraPermission = async () => {
            const permission = await Camera.requestCameraPermission();
            console.log("Camera permission: ", permission);
            setHasPermission(permission === "granted");
        };

        requestCameraPermission();

        // Optional: close after 15s if not scanned
        const timeout = setTimeout(() => {
            if (!scanned) {
                setScanned(true); // mark as done
                navigation.goBack();
            }
        }, 15000);

        return () => clearTimeout(timeout);
    }, []);

    if (device == null || !hasPermission) {
        return (
            <View style={styles.page2}>
                <Text style={{ backgroundColor: "white" }}>
                    Camera not available or not permitted
                </Text>
            </View>
        );
    }

    return (
        <Mainview
            onleftfn={() => navigation.goBack()}
            headertitle="Scan QR Code"
            isscollable={false} 
            horizontalpadding={0}>
            <View style={styles.page2}>
                <Camera
                    codeScanner={codeScanner}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={!scanned}
                />
                {/* <View style={styles.backHeader}>
                    <Customheader title={t("SECRET_PHASE")} backfn={() => navigation.goBack()} />
                </View> */}

                <View style={{
                    position: 'absolute', width: windowwidth * 0.8, height: windowheight * 0.5,
                    alignSelf: "center",
                    justifyContent: "center",
                }} >
                    <LottieView
                        source={Lotties.scanqr}
                        style={{ width: windowwidth, height: windowwidth, alignSelf: "center" }}
                        autoPlay
                    />
                </View>
            </View>
        </Mainview>

    )
}

const styles = StyleSheet.create({
    page2: {
        flex: 1,
        position: "absolute",
        top: 0,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    backHeader: {
        backgroundColor: "#ffff",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: "2%",
        height: windowheight * 0.075,
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    footer: {
        backgroundColor: "#00000090",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10%",
        height: "20%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default QRcodeScanner;