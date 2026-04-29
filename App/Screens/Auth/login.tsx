import React, { useCallback, useState } from "react";
import { View, TextInput, Image, Pressable, BackHandler } from 'react-native';
import { Button } from 'react-native-elements';
import { isValidPhoneNumber } from "libphonenumber-js";

import useCustomHooks from "../../Actions/Hooks/customhook";
import styles from "../Auth/styles";
import { icons } from "../../Utilities/images";
import Mainview from "../../Components/mainview";
import Text from "../../Components/text";
import VectorIcons from "../../Utilities/vectorIcons";
import { windowwidth } from "../../Utilities/dimensions";
import { NavigationProp, stackNavProp } from "../../Actions/types";
import { userLogin } from "../../Common/axiosHooks/userHooks";
import { confirmAlert, isEmpty, loginCheck } from "../../Common/commonFunction";
import { toastFn } from "../../Common/commonFunction";
import { useGetMyDetailQuery } from "../../Common/redux/userHook";
import { CommonActions, useFocusEffect, useNavigationState } from "@react-navigation/native";
import { useSelector } from "react-redux";


type Props = {
    navigation: NavigationProp;
    route: stackNavProp<'Login'>['route'];
};

const Login: React.FC<Props> = ({ route }) => {


    const { data, isLoading } = useGetMyDetailQuery(undefined);
    const userData = useSelector((state: any) => state?.userData);


    const routes = useNavigationState(state => state.routes);
    const index = useNavigationState(state => state.index);


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const params = route?.params;




    const [formData, setFormData] = useState({ mobileNo: '', countyCode: "+91" });
    const [disabledStatus, setDisabledStatus] = useState(false);
    const [validateError, setValidateError] = useState<any>({});



    const onChange = (e: string, id: string) => {
        console.log('onchangee', e, id);
        setValidateError({ ...validateError, [id]: "" });
        setFormData({
            ...formData,
            [id]: e,
        });
    }

    const loginValidation = (data: any) => {
        let errors: any = {};

        if (isEmpty(data?.mobileNo)) {
            errors.mobileNo = 'Mobile number is required';
        }
        else if (!isValidPhoneNumber(data.mobileNo)) {
            errors.mobileNo = 'Invalid mobile number format';
        }
        return errors;
    }

    const loginSubmit = async () => {
        setDisabledStatus(true);
        try {
            const sendData = {
                mobileNo: `${formData?.countyCode}${formData?.mobileNo}`,
                otpType: "mobile",
            };
            let validate = loginValidation(sendData);
            if (isEmpty(validate)) {
                let resp = await userLogin(sendData)
                console.log('userLogin_response', resp);
                if (resp?.status) {
                    toastFn(resp?.message ?? "Otp sent");
                    navigation.navigate('OTP', { mobileNo: `${formData?.countyCode}${formData?.mobileNo}`, redirectTo: params?.redirectTo });
                }
                else {
                    toastFn(resp?.message ?? "Try-Again");
                }
            }
            else {
                setValidateError(validate);
                toastFn(Object.values(validate)?.[0]);
                // toastFn("Fix validation");
            }
        }
        catch (error) {
            console.log('loginSubmit_error', error);
        }
        setDisabledStatus(false);
    }

    const goBackCheck = () => {
        let previousRoute = routes[0];
        if ((previousRoute?.name == "Login" && routes?.length <= 1)) {
            confirmAlert(
                "Do you want to exit app?",
                () => BackHandler.exitApp(),
                () => { },
            )
        }
        else {
            navigation.goBack()
        }
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
            const backAction = () => {

                let previousRoute = routes[0];
                if ((previousRoute?.name == "Login" && routes?.length <= 1)) {
                    confirmAlert(
                        "Do you want to exit app?",
                        () => BackHandler.exitApp(),
                        () => { },
                    )
                    return true;
                }
            };



            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }, [routes])
    )

    return (
        <Mainview
            isheader={false}
            isscollable={false}
            customheader={
                <>
                    <View style={style.headerContainer}>
                        <Pressable onPress={() => goBackCheck()}>
                            <VectorIcons
                                family="AntDesign"
                                name="left"
                                size={windowwidth * 0.055}
                            />
                        </Pressable>
                        {(!params?.redirectTo) && <Pressable onPress={() => {
                            if (isEmpty(userData?.currentAddress)) {
                                navigation.navigate("FetchLocation");
                            }
                            else {
                                navigation.navigate("Bottomtab");
                            }
                        }}>
                            <Text family="bold" size={"medium"} >Skip</Text>
                        </Pressable>}
                    </View>

                </>
            }
        >
            <View style={[style.container]}>
                <Text size={"large"}>{params?.redirectTo ? 'Enter your mobile number' : 'Login or Signup'}</Text>
                {!params?.redirectTo && <Text style={style.title}>Enter your mobile number</Text>}
                <View style={style.phoneContainer}>
                    <Pressable style={style.countrySection}>
                        <Image
                            source={icons.India_Img}
                            style={style.flag}
                        />
                        <Text size={"medium"} family="GMedium">IND</Text>
                        <Text size={"medium"} family="GMedium">+91</Text>
                    </Pressable>
                    <View style={style.divider} />
                    <TextInput
                        style={style.inputPhNo}
                        placeholder="(000)-000-0000"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                        value={formData?.mobileNo}
                        onChangeText={(e) => onChange(e, "mobileNo")}
                    />
                </View>

                {/* {
                    validateError?.mobileNo
                        ?
                        <View style={style?.errorContainer}>
                            <Text size="small" style={style?.errorText}>{validateError?.mobileNo}</Text>
                        </View>
                        :
                        <></>
                } */}

                <Button
                    buttonStyle={style.lgnButton}
                    title="Next"
                    titleStyle={style.lgnButtonTitle}
                    onPress={() => loginSubmit()}
                    disabled={disabledStatus}
                />
            </View>
        </Mainview>

    );
}

export default Login;