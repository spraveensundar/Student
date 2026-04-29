import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import UpdateMargin from "./UpdateMargin";
import Text from "../../../../Components/text";
import Mainview from "../../../../Components/mainview";
import { Colors } from "../../../../Utilities/uiasset";
import { athuDataProps } from "../../../../Actions/type";
import VectorIcons from "../../../../Utilities/vectoricons";
import { Button, Input } from "../../../../Components/Field";
import useApiError from "../../../../Actions/Hooks/errorhook";
import useCustomHooks, { useApihooks } from "../../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../../Navigations/navigationtypes";
import { useLazySubAccountQuery, useSubAccountEditMutation } from "../../../../Slices/subAccount";

import { styles } from "../../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'SubAccountManage'>;

const SubAccountManage: React.FC<Props> = ({ route }) => {
    const { theme, navigation, bottomsheetref, openbottomsheet, closebottomsheet, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);
    const { account } = route.params;

    const initialUserData: athuDataProps = useMemo(() => ({
        name: {
            value: account?.accountName || "",
            rules: { required: true },
            messages: { required: 'First name is required!' },
            isValid: true,
        },
    }), []);

    const [userData, setUserData] = useState<athuDataProps>(initialUserData);
    const [edit, { error, isLoading }] = useSubAccountEditMutation();
    const [subAccount] = useLazySubAccountQuery();
    const { Fetchsubaccounts } = useApihooks()
    useApiError(error ?? false);

    const handleSubmit = async () => {
        const paylaod: any = {
            "_id": account?._id,
            "accountId": account?.accountId,
            "accountName": userData.name?.value,
            "balance": account?.balance,
            "marginMode": account?.marginMode,
            "isPrimary": false,
            "name": userData.name?.value,
        }
        console.log(paylaod, "paylaod")
        const response = await edit(paylaod).unwrap()
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
            headertitle={"Edit Sub Account"}
            isscollable={false}
            onleftfn={() => navigation.goBack()}>
            <View style={style.container}>

                <Input
                    label="Sub Account Name"
                    value={userData.name?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, name: { ...prev.name, value: text } }))}
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
                    <Text>{account?.marginMode}</Text>
                </View>
                <Button
                    title="Update"
                    loading={isLoading}
                    buttonStyle={style.bottomButton}
                    onPress={() => handleSubmit()}
                />
            </View>
            <UpdateMargin
                ref={bottomsheetref}
                value={account?.marginMode}
                accountId={account?.accountId}
                title={"Change Margin mode"}
                onClose={() => closebottomsheet(bottomsheetref)}
                confirm={() => { closebottomsheet(bottomsheetref) }}
                onContinue={() => { closebottomsheet(bottomsheetref), navigation.navigate("SubAccount") }}
            />
        </Mainview>
    )

}

export default SubAccountManage;