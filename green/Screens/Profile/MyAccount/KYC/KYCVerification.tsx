import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Stacknavigationtypes } from "../../../../Navigations/navigationtypes";
import Mainview from "../../../../Components/mainview";
import Text from "../../../../Components/text";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { styles } from "../../styles";
import { Button, Dropdown } from "../../../../Components/Field";
import { setKycparms } from "../../../../Slices/helper";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'KYCVerification'>;

const KYCVerification: React.FC<Props> = () => {
    const { theme, navigation, dispatch } = useCustomHooks();
    const style = styles(theme);

    const dropdownData = [
        { label: "Individual", value: "individual" },
        { label: "Entity", value: "entity" },
    ];

    const source = [
        { label: "AadharCard", value: "aadhaar" },
        { label: "PandCard", value: "pancard" },
        { label: "VoterID", value: "voterid" },
        { label: "Passport", value: "passport" },
    ];
    const [type, setType] = useState("")
    const [kycType, setkycType] = useState("")

    return (
        <Mainview
            isheader={true}
            isscollable={true}
            headertitle={"KYC Verification"}
            onleftfn={() => navigation.goBack()}
        >
            <View style={[style.container]}>
                <Text size={"medium"}>Verification</Text>

                <View style={{ marginTop: '10%' }}>
                    <Dropdown
                        list={dropdownData}
                        label="KYC Type"
                        value={kycType}
                        onChange={(value) => {
                            console.log(value, "value");
                            setkycType(value?.value)
                        }}
                    />

                    <Dropdown
                        list={source}
                        label="ID Type"
                        value={type}
                        onChange={(value) => setType(value?.value)}
                    />

                    <Button
                        title="Continue"
                        buttonStyle={{ width: "40%", marginTop: "5%", borderRadius: 30 }}
                        onPress={() => {
                            console.log("Testttttttt", type, kycType);
                            const payload = {
                                type,
                                kycType
                            }
                            dispatch(setKycparms(payload))
                            navigation.navigate("KYCPicture")
                        }}
                    />
                </View>


            </View>
        </Mainview>
    )

}

export default KYCVerification;