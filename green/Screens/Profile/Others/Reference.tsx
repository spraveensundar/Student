import React, { useState } from "react";
import { Clipboard, Pressable, View, Share, Linking } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import Mainview from "../../../Components/mainview";
import { Colors } from "../../../Utilities/uiasset";
import { Button, Input } from "../../../Components/Field";
import { Toastfn } from "../../../Utilities/helerfunction";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";
import VectorIcons from "../../../Utilities/vectoricons";
import WebviewModal from "../../../Components/DialogBox/Web";
import { REFERURL } from "../../../Actions/Constant/constant";
import { useSelector } from "react-redux";
import FormGroup from "../../../Components/Field/FormGroup";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Reference'>;

const Reference: React.FC<Props> = () => {
    const { theme, navigation, copyData } = useCustomHooks();
    const style = styles(theme);

    const { referralCode } = useSelector((state: any) => state.auth.userData);
    const URL = REFERURL + referralCode

    const onShare = async () => {
        try {
            await Share.share({
                message: REFERURL + referralCode
            });
        } catch (error) {
            console.error("Share error:", error);
        }
    };

    const [popup, setPopup] = useState(false);

    

    return (
        <>
            <Mainview
                isheader={true}
                isscollable={false}
                headertitle="Refer & Earn"
                onleftfn={() => navigation.goBack()}
         
            >
                <View style={style.container}>
                    <Text size="medium">Refer and Earn Benifit</Text>
                    <Text style={{ color: Colors.warmgrey, marginTop: "3%" }}>Encourage users to invite friends to the platform and reward them with trading bonuses or wallet credits when their friends join and trade.</Text>
                    <View style={{ alignItems: "center", marginTop: "5%" }}>
                        <Images
                            type="svg"
                            name="ReferEarn"
                            width={windowwidth * 0.70}
                            height={windowheight * 0.4}
                        />
                    </View>

                    <FormGroup
                        label="Your Referral link"
                        rightContent={
                            <Pressable style={style.copy} onPress={() => copyData(URL)}>
                                <Text style={{ color: Colors.orange }}>  Copy</Text>
                            </Pressable>
                        }
                    >
                        <View style={{ height: windowheight * 0.06, justifyContent: "center" }}>
                            <Text numoflines={1}>{URL}</Text>
                        </View>
                    </FormGroup>
                    <View style={style.bottomButton}>
                        <Button
                            title="Invite now"
                            onPress={onShare}
                        />
                    </View>
                </View>

            </Mainview>
            {
                popup === true && (
                    <WebviewModal
                        url={"https://greenex.maticz.in/referral"}
                        onCloseHandler={() => setPopup(false)}
                    />
                )
            }
        </>
    )

}

export default Reference;