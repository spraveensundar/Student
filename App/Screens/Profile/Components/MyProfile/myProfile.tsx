import React, { isValidElement, useCallback, useState } from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { Platform, Pressable, View } from "react-native";
import Text from "../../../../Components/text";
import { Button, Input } from "../../../../Components/Field";
import { windowwidth } from "../../../../Utilities/dimensions";
import styles from "./styles";
import VectorIcons from "../../../../Utilities/vectorIcons";
import { Colors } from "../../../../Utilities/uiasset";
import { useGetMyDetailQuery } from "../../../../Common/redux/userHook";
import { useFocusEffect } from "@react-navigation/native";
import { dateTimeForm, encryptData, isEmpty, isValidEmail, returnOriginalFile, toastFn } from "../../../../Common/commonFunction";
import DateTime from "../../../../Components/dateTime";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import FileUpload from "../../../../Components/Field/FileUpolad";
import config from "../../../../Common/config";
import { userEditProfile } from "../../../../Common/axiosHooks/userHooks";
import { isValidPhoneNumber } from "libphonenumber-js";
import { ScrollView } from "react-native-gesture-handler";
import FastImage from "@d11/react-native-fast-image";
import { icons } from "../../../../Utilities/images";
import { constantData } from "../../../../Common/constant";
import { getItem } from "../../../../Common/localStorage";
import useSocketemithook from "../../../../Actions/Sockets/globalsocket";



const initialData: any = {
    name: "",
    email: "",
    mobileNo: "",
    dob: "",
    profile: undefined,
    gender: "",
}

const MyProfile: React.FC = () => {



    const { data, isLoading, refetch } = useGetMyDetailQuery(undefined);


    const { theme, navigation } = useCustomHooks()
    const { emitprofile } = useSocketemithook()
    const style = styles(theme);


    const [formData, setFormData] = useState<any>(initialData);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedCalendarKey, setSelectedCalendarKey] = useState("")
    const [validateErrors, setValidateErrors] = useState<any>({});
    const [disableStatus, setDisableStatus] = useState(false);


    useFocusEffect(
        useCallback(() => {
            refetch()
        }, [])
    )

    useFocusEffect(
        useCallback(() => {
            console.log('refetchrefetch', data)
            if (data) {
                const userData = data?.data;
                setFormData({
                    ...formData,
                    name: userData?.name ?? "",
                    email: userData?.email ?? "",
                    mobileNo: userData?.mobileNo ?? "",
                    dob: userData?.dob ?? "",
                    profile: userData?.profile ?? "",
                    gender: userData?.gender ?? "",
                })
            }
        }, [data])
    )

    const onChangeText = (value: any, id: string) => {
        console.log('checkkkk', value, id)

        let setData = {
            ...formData,
            [id]: value,
        }
        if (id == 'profile') {
            setData[id] = value?.[0];
        }
        setValidateErrors({});
        setFormData(setData);
    }


    const handlePicker = (event: any, selectedDate?: Date) => {
        if (event.type === "dismissed") {
            setShowCalendar(false);
            setSelectedCalendarKey("")
            return;
        }

        const pickedDate = event?.nativeEvent?.timestamp;
        if (selectedCalendarKey) {
            setValidateErrors({});
            setFormData({
                ...formData,
                [selectedCalendarKey]: new Date(pickedDate),
            })
        }
        setShowCalendar(false);
        setSelectedCalendarKey("")
    };

    const validation = (data: any) => {
        let errors: any = {};
        if (isEmpty(data?.name)) {
            errors.name = "Name required";
        }
        if (isEmpty(data?.email)) {
            errors.email = "Email-id required";
        }
        else if (!isValidEmail(data?.email)) {
            errors.email = "Enter valid email-id";
        }
        if (isEmpty(data?.mobileNo)) {
            errors.mobileNo = "Mobile number required";
        }
        else if (!isValidPhoneNumber(data.mobileNo)) {
            errors.mobileNo = 'Invalid mobile number format';
        }
        if (!data?.dob) {
            errors.dob = "Date of birth required";
        }
        if (!data?.profile) {
            errors.profile = "Profile image required";
        }
        if (isEmpty(data?.gender)) {
            errors.gender = "Gender required";
        }

        return errors;
    }

    const onSubmit = async () => {
        setDisableStatus(true)
        try {
            let sendData = {
                name: formData?.name,
                email: formData?.email,
                mobileNo: formData?.mobileNo,
                dob: formData?.dob,
                profile: formData?.profile,
                gender: formData?.gender,
            };
            let checkValidation = validation(sendData);
            if (isEmpty(checkValidation)) {

                //     const formAppend = new FormData();
                //     formAppend.append("token", encryptData({
                //         name: sendData?.name,
                //         email: sendData?.email,
                //         mobileNo: sendData?.mobileNo,
                //         dob: sendData?.dob,
                //     },getItem(constantData.secretKey)))
                //     const path = formData?.profile?.path ?? formData?.profile?.uri,
                //         fileName = formData?.profile?.fileName ?? formData?.profile?.filename,
                //         mime = formData?.profile?.mime ?? formData?.profile?.type;
                //     console.log('checkkkkkk',{
                //     uri:
                //       Platform.OS === "android"
                //         ? path
                //         : path?.replace("file://", ""),
                //     name: fileName,
                //     type:
                //       mime === "image/jpg"
                //         ? "image/jpeg"
                //         : mime,
                //   })
                //     formAppend.append("profile",{
                //     uri:
                //       Platform.OS === "android"
                //         ? path
                //         : path?.replace("file://", ""),
                //     name: fileName,
                //     type:
                //       mime === "image/jpg"
                //         ? "image/jpeg"
                //         : mime,
                //   })

                let resp = await userEditProfile(formData);
                console.log('respppspsp', resp)
                if (resp?.status) {
                    emitprofile()
                    toastFn(resp?.message ?? "Updated successfully");
                    await refetch();
                    navigation.goBack();
                }
                else {
                    toastFn(resp?.message ?? "Try-Again");
                }
            }
            else {
                setValidateErrors(checkValidation);
                toastFn(Object.values(checkValidation)?.[0]);
                // toastFn("Fix all validations");
            }
        }
        catch (error) {
            console.log('onSubmit_errror', error);
        }
        setDisableStatus(false)
    }
    console.log('foermmr', formData)

    return (
        <Mainview
            isheader={true}
            headertitle="My Profile"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                    <Button title="Save" onPress={() => onSubmit()} disabled={disableStatus} />
                </View>
            }
        >
            <ScrollView>
                <View style={{
                    flex: 1,
                    marginTop: "5%"
                }}>
                    <Text size="xxmedium" family="GMedium" style={{ marginBottom: 10 }}>My Profile  Details</Text>
                    <Input
                        label={"Name"}
                        placeHolder="Enter name"
                        onChange={(e) => onChangeText(e, "name")}
                        value={formData?.name}
                    />
                    {/* {
                    validateErrors?.name
                        ?
                        <View style={style?.errorContainer}>
                            <Text size="small" style={style?.errorText}>{validateErrors?.name}</Text>
                        </View>
                        :
                        <></>
                } */}

                    <Input
                        label={"Mail ID"}
                        placeHolder="Enter mail ID"
                        onChange={(e) => onChangeText(e, "email")}
                        value={formData?.email}
                    />
                    {/* {
                    validateErrors?.email
                        ?
                        <View style={style?.errorContainer}>
                            <Text size="small" style={style?.errorText}>{validateErrors?.email}</Text>
                        </View>
                        :
                        <></>
                } */}

                    <Input
                        label={"Mobile number"}
                        placeHolder="Enter mobile number"
                        onChange={(e) => onChangeText(e, "mobileNo")}
                        value={formData?.mobileNo}
                    />
                    {/* {
                    validateErrors?.mobileNo
                        ?
                        <View style={style?.errorContainer}>
                            <Text size="small" style={style?.errorText}>{validateErrors?.mobileNo}</Text>
                        </View>
                        :
                        <></>
                } */}

                    <View style={{ position: "relative", width: "100%" }}>
                        <Pressable
                            onPress={() => {
                                setShowCalendar(true);
                                setSelectedCalendarKey("dob")
                            }}
                        >
                            <Input
                                label={"Date of Birth"}
                                placeHolder="Select DOB"
                                style={{ paddingRight: 40 }}
                                value={formData?.dob ? dateTimeForm(formData?.dob, true, false, false, false) : ""}
                                disabled={true}
                            />

                            <VectorIcons
                                family="AntDesign"
                                name="calendar"
                                size={25}
                                style={{
                                    position: "absolute",
                                    right: 10,
                                    top: "60%",
                                    transform: [{ translateY: -10 }],
                                }}
                            />
                        </Pressable>
                    </View>
                    {/* {
                    validateErrors?.dob
                        ?
                        <View style={style?.errorContainer}>
                            <Text size="small" style={style?.errorText}>{validateErrors?.dob}</Text>
                        </View>
                        :
                        <></>
                } */}

                    <Text size="medium" family="GRegular" >Gender</Text>
                    <View style={{
                        flexDirection: 'row',
                        gap: 20,
                        width: windowwidth * 0.3,
                        marginVertical: 10,
                    }}>
                        <Pressable
                            onPress={() => onChangeText("Male", "gender")}
                            style={{
                                ...style.btn,
                                backgroundColor: formData?.gender === "Male" ? theme.tabactive : theme.lightGrey,
                            }}
                        ><Text style={{ color: formData?.gender === "Male" ? theme.activetabtext : 'black' }} family="GMedium" size="medium">Male</Text></Pressable>
                        <Pressable
                            onPress={() => onChangeText("Female", "gender")}
                            style={{
                                ...style.btn,
                                backgroundColor: formData?.gender === "Female" ? theme.tabactive : theme.lightGrey,
                            }}
                        ><Text style={{ color: formData?.gender === "Female" ? theme.activetabtext : 'black' }} family="GMedium" size="medium">Female</Text>
                        </Pressable>
                    </View>
                    {/* {
                    validateErrors?.gender
                        ?
                        <View style={style?.errorContainer}>
                            <Text size="small" style={style?.errorText}>{validateErrors?.gender}</Text>
                        </View>
                        :
                        <></>
                } */}

                    <Text size="medium" family="GRegular" style={{ marginBottom: 10 }}>Profile</Text>
                    <FileUpload
                        source="sheet"
                        // mediaData={
                        //     (formData?.profile)
                        //     ?
                        //     (
                        //         (formData?.profile?.path && typeof(formData?.profile) == 'object' )
                        //         ?
                        //         { uri: formData?.profile?.path }
                        //         :
                        //         (
                        //             typeof(formData?.profile) == 'string'
                        //             ?
                        //             returnOriginalFile(formData?.profile)
                        //             :
                        //             undefined
                        //         )
                        //     )
                        //     :
                        //     undefined
                        // }
                        multiple={false}
                        onChange={(data) => {
                            onChangeText(data, "profile");
                        }}
                        background={Colors.lightGrey}
                    />
                    <FastImage
                        source={
                            (formData?.profile)
                                ?
                                (
                                    ((formData?.profile?.uri || formData?.profile?.path) && typeof (formData?.profile) == 'object')
                                        ?
                                        { uri: (formData?.profile?.uri || formData?.profile?.path) }
                                        :
                                        (
                                            typeof (formData?.profile) == 'string'
                                                ?
                                                { uri: returnOriginalFile(formData?.profile) }
                                                :
                                                icons.Man
                                        )
                                )
                                :
                                icons.Man
                        }
                        style={{
                            width: windowwidth * 0.9,
                            height: windowwidth * 0.4,
                            marginBottom: 20
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />

                    {/* {
                    validateErrors?.profile
                        ?
                        <View style={style?.errorContainer}>
                            <Text size="small" style={style?.errorText}>{validateErrors?.profile}</Text>
                        </View>
                        :
                        <></>
                } */}

                </View>
            </ScrollView>
            {
                showCalendar
                    ?
                    (
                        <RNDateTimePicker
                            value={formData?.dob ? formData?.dob : new Date()}
                            mode={"date"}
                            display="spinner"
                            onChange={handlePicker}
                            maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
                        />
                    )
                    :
                    <></>
            }
        </Mainview>
    )
}

export default MyProfile;