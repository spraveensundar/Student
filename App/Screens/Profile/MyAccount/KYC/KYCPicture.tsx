import React, { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Stacknavigationtypes } from "../../../../Navigations/navigationtypes";
import Mainview from "../../../../Components/mainview";
import Text from "../../../../Components/text";
import useCustomHooks, { useApihooks } from "../../../../Actions/Hooks/customhook";
import { styles } from "../../styles";
import { Button, Dropdown, FileUpload } from "../../../../Components/Field";
import Card from "../../../../Components/Card";
import VectorIcons from "../../../../Utilities/vectoricons";
import { useSelector } from "react-redux";
import { helperSelector } from "../../../../Slices/helper";
import { useInternalkycMutation, useLazyUserDetailsQuery } from "../../../../Slices/auth";
import useApiError from "../../../../Actions/Hooks/errorhook";
import { getMimeType } from "../../../../Utilities/helerfunction";


type Props = NativeStackScreenProps<Stacknavigationtypes, 'KYCPicture'>;

const KYCPicture: React.FC<Props> = () => {
    const { theme, navigation, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);

    const [frontImage, setFrontImage] = useState<any>(undefined);
    const [backImage, setBackImage] = useState<any>(undefined);

    const { kycparms } = useSelector(helperSelector)
    console.log(kycparms, "kycparms");

    const renderItem = () => {
        return (
            <Card containerStyle={{ justifyContent: "center", alignItems: "center", paddingVertical: "20%", marginBottom: "5%" }}>
                <View style={{ alignItems: "center" }}>
                    <VectorIcons
                        family="Feather"
                        name={"upload"}
                        size={20}
                    />
                    <Text size="semimedium">Upload</Text>
                </View>
            </Card>
        )
    }

    const [internalkyc, { isLoading, error }] = useInternalkycMutation()
    const { triggeruserdetails } = useApihooks();

    useApiError(error)
    const submit = async () => {
        const formData = new FormData();
        formData.append("attachments", {
            uri: frontImage?.uri,
            name: frontImage?.fileName,
            type: getMimeType(frontImage?.fileName),
        } as any);

        formData.append("attachments", {
            uri: backImage.uri,
            name: backImage.fileName,
            type: getMimeType(backImage.fileName),
        } as any);

        formData.append("type", kycparms.type);
        formData.append("kycType", kycparms?.kycType);
        console.log("formData", formData)
        const response = await internalkyc(formData).unwrap();
        console.log(response, "responseeeeeeeee");

        if (response.success) {
            triggeruserdetails()
            successtoast("Success", response.message)
            navigation?.pop(2)
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }
    return (
        <Mainview
            isheader={true}
            isscollable={true}
            headertitle={"Upload Address Proof"}
            onleftfn={() => navigation.goBack()}
            isoverlaploader={isLoading}
        >
            <View style={[style.container]}>

                <View style={{}}>

                    <Text style={{ color: theme.secondarytext, marginBottom: "3%" }}>Front side picuter</Text>

                    <FileUpload
                        source="sheet"
                        mediaData={frontImage}
                        component={renderItem()}
                        onChange={(data) => {
                            setFrontImage(data);
                        }}
                    />

                    <Text style={{ color: theme.secondarytext, marginBottom: "3%" }}>Back side picture</Text>

                    <FileUpload
                        source="sheet"
                        mediaData={backImage}
                        component={renderItem()}
                        onChange={(data) => {
                            setBackImage(data);
                        }}
                    />

                    <Button
                        title="Continue"
                        buttonStyle={{ width: "40%", marginTop: "5%", borderRadius: 30 }}
                        onPress={() => submit()}
                    />
                </View>
            </View>
        </Mainview>
    )

}

export default KYCPicture;