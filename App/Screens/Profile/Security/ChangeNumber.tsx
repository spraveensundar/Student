import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import Description from "../Description";
import Mainview from "../../../Components/mainview";
import { athuDataProps } from "../../../Actions/type";
import { Button, Input } from "../../../Components/Field";
import { setPhoneparams } from "../../../Slices/helper";
import useApiError from "../../../Actions/Hooks/errorhook";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { maskPhoneNumber } from "../../../Utilities/helerfunction";
import {  useVerifyOldMobileMutation } from "../../../Slices/auth";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'ChangeNumber'>;

const ChangeNumber: React.FC<Props> = () => {
    const { theme, navigation, successtoast, failuretoast, dispatch } = useCustomHooks();
    const style = styles(theme);

    const { mobileNumber, countryCode } = useSelector((state: any) => state.auth.userData);

    const initialUserData: athuDataProps = useMemo(() => ({
        otp: {
            value: "",
            rules: { required: true },
            messages: { required: 'Last name is required!' },
            isValid: true,
        }
    }), []);


    const [userData, setUserData] = useState<athuDataProps>(initialUserData);

    const [verify, { isLoading, error: verifyError }] = useVerifyOldMobileMutation();

    useApiError(verifyError ?? false);

    const handleSubmit = async () => {
        const paylaod: any = {
            otp: userData.otp?.value,
        }
        console.log(paylaod)
        const response = await verify(paylaod).unwrap()
        if (response.success) {
            successtoast("Success", response.message);
            const payload:any = {
                type: "change",
                value: ""
            }
            dispatch(setPhoneparams(payload))
            navigation.navigate("RegisterNumber")
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    return (
        <Mainview
            isheader={true}
            headertitle={"OTP Verifiication"}
            isscollable={false}
            onleftfn={() => navigation.goBack()}>
            <View style={style.container}>
                <Input
                    value={userData.otp?.value}
                    label="Enter OTP"
                    onChange={(text: any) => setUserData(prev => ({ ...prev, otp: { ...prev.otp, value: text } }))}
                />
                <Description containerStyle={{ marginTop: "-5%" }} content={`We have send a code to +${countryCode} ${maskPhoneNumber(mobileNumber)}`} />
                <Button
                    title="Submit"
                    loading={isLoading}
                    onPress={() => handleSubmit()}
                    buttonStyle={style.bottomButton}
                />
            </View>
        </Mainview>
    )

}

export default ChangeNumber;