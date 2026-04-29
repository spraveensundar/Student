import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Mainview from "../../../Components/mainview";
import useCustomHooks, { useApihooks } from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";
import { styles } from "../styles";
import { Button, Input } from "../../../Components/Field";
import { athuDataProps } from "../../../Actions/type";
import useApiError from "../../../Actions/Hooks/errorhook";
import { useUpdateSettingsMutation } from "../../../Slices/auth";
import { useSelector } from "react-redux";
import { getItem } from "../../../Actions/Storage/localstorage";


type Props = NativeStackScreenProps<Stacknavigationtypes, 'UpdateName'>;

const UpdateName: React.FC<Props> = () => {
    const { theme, navigation, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);

    const { firstName, lastName } = useSelector((state: any) => state.auth.userData);

    console.log(getItem("token"))

    const initialUserData: athuDataProps = useMemo(() => ({
        firstName: {
            value: firstName,
            rules: { required: true },
            messages: { required: 'First name is required!' },
            isValid: true,
        },
        lastName: {
            value: lastName,
            rules: { required: true },
            messages: { required: 'Last name is required!' },
            isValid: true,
        }
    }), []);


    const [userData, setUserData] = useState<athuDataProps>(initialUserData);

    const [update, { isLoading, error }] = useUpdateSettingsMutation();

    const { triggeruserdetails } = useApihooks();

    useApiError(error ?? false);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("firstName", userData.firstName?.value);
        formData.append("lastName", userData.lastName?.value);
        formData.append("type", "name");
        console.log("formData", formData)
        const response = await update(formData).unwrap()
        if (response.success) {
            successtoast("Success", response.message);
            triggeruserdetails()
            navigation.goBack();
            setUserData(initialUserData)
        } else {
            failuretoast("Error", "Something went wrong!");
        }

    }

    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle="Update Display Name"
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
                    label="First Name"
                    value={userData.firstName?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, firstName: { ...prev.firstName, value: text } }))}

                />

                <Input
                    label="Last Name"
                    value={userData.lastName?.value}
                    onChange={(text: any) => setUserData(prev => ({ ...prev, lastName: { ...prev.lastName, value: text } }))}
                />
            </View>
        </Mainview>
    )

}

export default UpdateName;