import React from "react";
import { View, Modal, StyleProp, ViewStyle, Pressable } from "react-native";
import { WebView } from "react-native-webview";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Mainview from "../mainview";
import { RFvalue, windowheight } from "../../Utilities/dimensions";
import VectorIcons from "../../Utilities/vectoricons";
import Text from "../text";
import { Fontfamily, Fontsize } from "../../Utilities/uiasset";
import { KYCREDIRECT_URL } from "@env";

type WebviewModalProps = {
    url?: any;
    onCloseHandler?: () => void;
    title?: string;
    containerStyle?: StyleProp<ViewStyle>;
};

const WebviewModal: React.FC<WebviewModalProps> = ({
    url,
    onCloseHandler,
    title = "Refer & Earn",
    containerStyle,
}) => {

    const { theme } = useCustomHooks()


    const handleNavigationChange = (event: any) => {
        const { url } = event;

        if (url.includes(KYCREDIRECT_URL) && title == "KYC") {
            onCloseHandler?.()
        }
    };
    return (
        <View>
            <Modal visible={true} animationType="slide">
                <View style={[{ flex: 1, backgroundColor: theme.background }, containerStyle]}>

                    <View style={{ height: windowheight * 0.060, justifyContent: "center", flexDirection: "row", alignItems: "center" }} >

                        <Pressable onPress={onCloseHandler} style={{ width: "15%", height: "100%", position: "absolute", left: 0, justifyContent: "center", alignItems: "center" }} >

                            <VectorIcons
                                family="Ionicons"
                                name="chevron-back"
                            />
                        </Pressable>
                        <Text style={[{ color: theme.primarytext, fontFamily: Fontfamily.medium, fontSize: Fontsize.medium, width: "70%", textAlign: "center" }]} >{title}</Text>

                        <Pressable style={{ width: "15%", height: "100%", position: "absolute", right: 5, justifyContent: "center", alignItems: "center" }} >

                        </Pressable>
                    </View>

                    <WebView
                        bounces={false}
                        startInLoadingState={true}
                        source={{ uri: url }}
                        incognito={true}
                        scrollEnabled={true}
                        onNavigationStateChange={handleNavigationChange}

                    />
                </View>
            </Modal>
        </View>
    );
};

export default WebviewModal;
