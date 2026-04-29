import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import ChangeMargin from "./ChangeMargin";
import Text from "../../../../Components/text";
import Mainview from "../../../../Components/mainview";
import { Colors } from "../../../../Utilities/uiasset";
import { athuDataProps } from "../../../../Actions/type";
import VectorIcons from "../../../../Utilities/vectoricons";
import { Button, Input } from "../../../../Components/Field";
import useApiError from "../../../../Actions/Hooks/errorhook";
import useCustomHooks, { capitalizeFirst, useApihooks } from "../../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../../Navigations/navigationtypes";
import { useLazySubAccountQuery, useSubAccountCreateMutation } from "../../../../Slices/subAccount";

import { styles } from "../../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'SubAccountCreate'>;

const SubAccountCreate: React.FC<Props> = () => {
    const { theme, navigation, bottomsheetref, openbottomsheet, closebottomsheet, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);
    const [marginMode, setmarginMode] = useState("cross")

    const initialUserData: athuDataProps = useMemo(() => ({
        name: {
            value: "",
            rules: { required: true },
            messages: { required: 'First name is required!' },
            isValid: true,
        },
    }), []);

    const [userData, setUserData] = useState<athuDataProps>(initialUserData);
    const [create, { error, isLoading }] = useSubAccountCreateMutation();

    const { Fetchsubaccounts } = useApihooks()
    useApiError((error || false),3000);

    const handleSubmit = async () => {
        const paylaod: any = {
            "name": userData.name?.value,
            "marginMode": marginMode,
            "accountId": ""
        }
        console.log(paylaod)
        const response = await create(paylaod).unwrap()
        if (response.success) {
            successtoast("Success", response.message);
            Fetchsubaccounts()
            navigation.goBack();
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    return (
        <Mainview
            isheader={true}
            headertitle={"Add Sub Account"}
            isscollable={false}
            onleftfn={() => navigation.goBack()}>
            <View style={style.container}>
                <Input
                    label="Sub Account Name"
                    value={userData.name?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, name: { ...prev.name, value: text } }))}
                    placeHolder="Enter sub account name"
               />
                <View style={[style.between, { marginTop: "-2%" }]}>
                    <View style={style.row}>
                        <Text style={{ color: Colors.grey }}>Margin Mode</Text>
                        <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={() => openbottomsheet(bottomsheetref)}>
                            <Text style={{ color: Colors.lightGreen }}> Change</Text>
                            <VectorIcons
                                family="Feather"
                                name="chevron-right"
                                iconcolor={Colors.lightGreen}
                                size={20}
                            />
                        </Pressable>
                    </View>
                    <Text>{capitalizeFirst(marginMode)}</Text>
                </View>
                <Button
                    title="Confim"
                    loading={isLoading}
                    buttonStyle={style.bottomButton}
                    onPress={() => handleSubmit()}
                />
            </View>
            <ChangeMargin
                ref={bottomsheetref}
                value={marginMode}
                onChange={setmarginMode}
                title={"Change Margin mode"}
                onClose={() => closebottomsheet(bottomsheetref)}
            />
        </Mainview>
    )

}

export default SubAccountCreate;