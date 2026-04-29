import React, { useCallback, useState } from "react";
import { View, Pressable } from 'react-native';
import Text from "../../Components/text";
import { OtpInput } from 'react-native-otp-entry';
import styles from "../Auth/styles";
import { Colors, Fontfamily, Fontsize } from "../../Utilities/uiasset";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Mainview from "../../Components/mainview";
import VectorIcons from "../../Utilities/vectorIcons";
import { windowwidth } from "../../Utilities/dimensions";
import { Button } from "../../Components/Field";
import { updateUserData } from "../../Common/localStorage";
import { NavigationProp, stackNavProp } from "../../Actions/types";
import { decryptData, getSecretKey, isEmpty, jwtDecodeData, loginCheck } from "../../Common/commonFunction";
import { toastFn } from "../../Common/commonFunction";
import { userResendOtp, userVerifyOtp } from "../../Common/axiosHooks/userHooks";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../Common/redux/authSliceReducer";
import { useGetMyDetailQuery } from "../../Common/redux/userHook";
import { CommonActions, useFocusEffect } from "@react-navigation/native";

type Props = {
    navigation: NavigationProp;
    route: stackNavProp<'OTP'>['route'];
};

const OTP: React.FC<Props> = ({ route }) => {
    
    
    const params: any = route?.params;
    const dispatch = useDispatch();
    const { data, isLoading, refetch, } = useGetMyDetailQuery(undefined);
    const fcmData = useSelector((state: any)=>state?.helper?.deviceinfo);

    

    const [ formData, setFormData ] = useState({ mobileNo: params?.mobileNo, otp: ''});
    const [ validateError, setValidateError ] = useState({});
    const [ disabledStatus, setDisabledStatus ] = useState(false);

    
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const onChange = (e:string, id: string) => {
        setValidateError({...validateError,  [id]: ""});
        setFormData({
            ...formData,
            [id]: e,
        });
    }

    const otpSubmitValidation = ( data: { otp: string } ) => {
        let errors: any = {};
        if(isEmpty(data?.otp)){
            errors.otp = "Enter otp";
        }
        else if(data?.otp?.length != 6){
            errors.otp = "Invalid otp";
        }
        return errors;
    }
    console.log('fcmDatafcmData',fcmData)

    const otpSubmit = async () => {
        setDisabledStatus(true);
        try{
            const sendData = {
                mobileNo: formData?.mobileNo,
                otp: formData?.otp,
                fcmToken: fcmData?.fcm,
            };
            let validate = otpSubmitValidation(sendData);
            if (isEmpty(validate)) {
                let resp = await userVerifyOtp(sendData);
                if (resp?.status) {
                    toastFn(resp?.message ?? "Otp verified successfully");
                    let jwtData: any = jwtDecodeData(resp?.data?.token);
                    if (jwtData?.randomKey) {
                        let secretKey = getSecretKey(decryptData(jwtData?.randomKey ?? "",));
                        dispatch(
                            setAuth({
                                token: resp?.data?.token,
                                userDetail: resp?.data?.userDetail,
                                secretKey: secretKey
                            })
                        );
                        updateUserData({
                            token: resp?.data?.token,
                            userDetail: resp?.data?.userDetail,
                            secretKey: secretKey,
                        })
                        let refetchData = await refetch();
                        if (params?.redirectTo) {
                            if(params?.redirectTo?.tab){
                                navigation.navigate(params?.redirectTo?.parent,{screen: params?.redirectTo?.tab});
                            }
                            else{
                                navigation.navigate(params?.redirectTo);
                            }
                        }
                        else {
                            if(refetchData?.data?.data?.location?.length>0){
                                navigation.navigate('Bottomtab');
                            }
                            else{
                                navigation.navigate('FetchLocation')
                            }
                            console.log('datadatarefetch',data,refetchData);
                        }
                    }
                    else {
                        toastFn("Invalid login");
                    }
                }
                else{
                    toastFn(resp?.message??"Try-Again");
                }
            }
            else{
                setValidateError(validate);
                toastFn(Object.values(validate)?.[0]);
                // toastFn(validate?.otp??"Please fix all errors to proceed");
            }
        }
        catch (error) {
            console.log('otpSubmit_error', error);
        }
        setDisabledStatus(false);
    }

    const resendOtp = async() => {
        setDisabledStatus(true);
        try{
            let sendData = {
                mobileNo: formData?.mobileNo
            };
            let resp = await userResendOtp(sendData);
            if(resp?.status){
                toastFn(resp?.message??"Otp resent successfully");
            }
            else{
                toastFn(resp?.message??"Try-again");
            }
        }
        catch(error){
            console.log('resendOtp_error', error);
        }
        setDisabledStatus(false);
    }

    useFocusEffect(
        useCallback(() => {
            if (loginCheck()) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Bottomtab" }],
                    })
                );
            }
        }, [])
    )

    return (
        <Mainview
            isheader={false}
            isscollable={false}
            customheader={
                <>
                    <View style={style.headerContainer}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <VectorIcons
                                family="AntDesign"
                                name="left"
                                size={windowwidth * 0.055}
                            />
                        </Pressable>
                    </View>
                </>
            }
            bottomContent={
                <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                    <Button title="Next" onPress={() => otpSubmit()} disabled={disabledStatus}
                    />
                </View>}
        >
            <View style={style.otpContainer}>
                <View style={{ display: 'flex', gap: 10 }}>
                    <Text size={"large"}>Enter the code</Text>
                    <Text style={style.title}>
                        Enter the verification code we just sent to your number {params?.mobileNo}
                    </Text>
                    <View style={style.otpInputCnt}>
                        <OtpInput
                            numberOfDigits={6}
                            onTextChange={(e) => onChange(e,"otp")}
                            secureTextEntry={false}
                            focusColor={Colors.primary}
                            theme={{
                                pinCodeContainerStyle: {
                                    width: windowwidth * 0.135,
                                    height: windowwidth * 0.135,
                                    backgroundColor: theme.card,
                                    borderWidth: 0
                                },
                                containerStyle: {
                                    width: "100%",
                                    alignSelf: "center"
                                },
                                pinCodeTextStyle: {
                                    fontFamily: Fontfamily.GMedium,
                                    color: theme.textinput,
                                    fontSize: Fontsize.extralarge
                                },
                                focusedPinCodeContainerStyle: {
                                    borderWidth: 1,
                                    borderColor: Colors.primary
                                }

                            }}

                        />
                    </View>
                    <View style={style.resendOtp}>
                        <Text style={style.title}>Didn't receive code? </Text>
                        <Pressable onPress={()=>resendOtp()} disabled={disabledStatus}>
                        <Text family="GBold" style={{ color: theme.primarytextHighlight, textDecorationLine: 'underline', }}>Resend</Text>
                        </Pressable>
                    </View>
                </View>
            </View >
        </Mainview>

    );
}

export default OTP;