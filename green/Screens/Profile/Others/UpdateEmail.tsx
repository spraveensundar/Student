import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Mainview from "../../../Components/mainview";
import { athuDataProps } from "../../../Actions/type";
import { Button, Input } from "../../../Components/Field";
import useApiError from "../../../Actions/Hooks/errorhook";
import useCustomHooks, { useApihooks } from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";
import { useChangeEmailMutation } from "../../../Slices/auth";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'UpdateEmail'>;

const UpdateEmail: React.FC<Props> = () => {
    const { theme, navigation, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);

    const initialUserData: athuDataProps = useMemo(() => ({
        requestedEmail: {
            value: '',
            rules: { required: true },
            messages: { required: 'First name is required!' },
            isValid: true,
        },
    }), []);


    const [userData, setUserData] = useState<athuDataProps>(initialUserData);
    const [changeEmail, { isLoading, error }] = useChangeEmailMutation();
    const { triggeruserdetails } = useApihooks();

    useApiError(error ?? false);

    const handleSubmit = async () => {
        const payload: any = {
            requestedEmail: userData.requestedEmail?.value
        }
        console.log(payload, "changeEmail")
        const response = await changeEmail(payload).unwrap();
        if (response.success) {
            successtoast("Success", response.message);
            triggeruserdetails()
            navigation.goBack();
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle="Update Email"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={{ alignItems: 'center', paddingHorizontal: "6%", marginBottom: "3%" }}>
                    <Button
                        title="Submit"
                        onPress={() => handleSubmit()}
                        loading={isLoading}
                    />
                </View>
            }
        >
            <View style={style.container}>
                <Input
                    label="Enter Email Address"
                    value={userData.requestedEmail?.value}
                    placeHolder="Enter email Address"
                    onChange={(text: any) => setUserData(prev => ({ ...prev, requestedEmail: { ...prev.requestedEmail, value: text } }))}
                />
            </View>
        </Mainview>
    )

}

export default UpdateEmail;