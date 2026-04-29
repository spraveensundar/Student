import { useState } from "react"
import { Input } from "../../../Components/Field"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text"
import Toptabs from "../../../Components/toptabs"
import { Pressable, View } from "react-native"
import { Colors } from "../../../Utilities/uiasset"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import { helperSelector, setemailverify, update_otpparams } from "../../../Slices/helper"
import { Toastfn } from "../../../Utilities/helerfunction"
import { authDataProps } from '../../../Actions/Types/formDataTypes';
import { validator } from "../../../Actions/Constants/validation"
import { useCleaningRegisterMutation } from "../../../Slices/cleaning"
import { useSelector } from "react-redux"
import { authSelector, useSendOTPMutation } from "../../../Slices/auth"
import { sendOTPPayload } from "../../../Slices/types"
import VectorIcons from "../../../Utilities/vectorIcons"
import { windowwidth } from "../../../Utilities/dimensions"

const CleaningResiter: React.FC = () => {
    const [currentindex, setCurrentindex] = useState(0);
    const { navigation, dispatch } = useCustomHooks();
    const { serviceMan } = useSelector(authSelector);
    const { currentlocation, emailverify } = useSelector(helperSelector);

    const [userData, setUserData] = useState<authDataProps>({
        firstName: {
            value: "",
            rules: { required: true },
            messages: { required: 'Name is required!' },
            isValid: true,
        },
        email: {
            value: "",
            rules: { required: true, email: true },
            messages: { required: 'Email is required!', email: 'Invalid email!' },
            isValid: true,
        },
        gender: {
            value: "Male",
            rules: { required: true },
            messages: { required: 'Gender is required!' },
            isValid: true,
        },
        city: {
            value: "",
            rules: { required: true },
            messages: { required: 'City is required!' },
            isValid: true,
        },
        sector: {
            value: "",
            rules: { required: true },
            messages: { required: 'Sector is required!' },
            isValid: true,
        },
        locality: {
            value: "",
            rules: { required: true },
            messages: { required: 'Locality is required!' },
            isValid: true,
        },
    });

    const [triggerCleaningRegister, { isLoading }] = useCleaningRegisterMutation();
    const [triggerVerifyMailId, { }] = useSendOTPMutation();

    const handleVerifyEmail = async () => {
        try {
            const validationResult = validator({ email: userData?.email });
            setUserData(prev => ({ ...prev, ...validationResult?.data }));
            if (validationResult?.isValid) {
                const payload: sendOTPPayload = {
                    email: userData?.email?.value,
                    otpType: 'email',
                }

                const sendMilOTP = await triggerVerifyMailId(payload).unwrap();

                console.log('sendMilOTP', sendMilOTP);

                if (sendMilOTP?.status) {
                    Toastfn('OTP sent to give Email-Id!');
                    const otpparms = {
                        params: {
                            email: userData?.email?.value,
                            otpType: 'email',
                        },
                        from: "register"
                    }
                    navigation?.navigate("OTP")
                    dispatch(update_otpparams(otpparms))
                }
            } else {
                Toastfn(userData?.email?.errorMessage ?? 'please fill the valid email id!');
            }
        } catch (error) {
            console.log('VERIDY-MAIL-ID-ERROR', error);
        }
    }

    const handleSubmit = async () => {
        try {
            const validatedResult = validator(userData);
            setUserData({ ...validatedResult?.data });
            if (validatedResult?.isValid && emailverify) {
                const formData = new FormData();

                formData.append('name', userData?.firstName?.value);
                formData.append('email', userData?.email?.value);
                formData.append('gender', userData?.gender?.value);
                // formData.append('dob', userData?.dob?.value);
                if (serviceMan?.mobileNo) {
                    formData.append('mobileNo', serviceMan?.mobileNo);
                }
                if (currentlocation?.coordinates) {
                    formData.append('latitude', currentlocation?.coordinates?.latitude);
                    formData.append('longitude', currentlocation?.coordinates?.longitude);
                }
                formData.append('city', userData?.city?.value);
                formData.append('sector', userData?.sector?.value);
                formData.append('locality', userData?.locality?.value);

                console.log('formData', formData);

                const registerResult = await triggerCleaningRegister(formData).unwrap();
                if (registerResult?.status) {
                    Toastfn(registerResult?.message ?? 'Registration completed!');
                    if (serviceMan?.verificationStatus?.isRegistered === "rejected") {
                        navigation.navigate('SupportPartnerConfirmation');
                    }else{
                        navigation.navigate('Aadharverification');
                    }
                }
                console.log('registerResult', registerResult);
            } else {
                Toastfn(!emailverify ? 'Email verification is required!' : 'Invalid form submition, Please check the form!');
            }
        } catch (error: any) {
            console.log('AUTH-ERROR', error);
            Toastfn(error?.data?.message ?? 'Something went wrong!');
        }
    };

    return (
        <Mainview
            headertitle="My Profiles"
            onleftfn={() => {
                dispatch(setemailverify(false));
                navigation.goBack();
            }}
            bottomContent
            isbottomload={false}
            bottomtext="Save"
            onBottompress={() => handleSubmit()}
            ismainloading={isLoading}
        >
            <Text family="GMedium" size="semilarge" top={"5%"} >My Profile Details</Text>
            <Input
                key={"Name"}
                label={"Name"}
                labelStyle={{ marginTop: "5%" }}
                placeHolder="Enter name"
                value={userData.firstName?.value}
                onChange={(text: any) => setUserData(prev => ({ ...prev, firstName: { ...prev.firstName, value: text } }))}
                isValid={userData.firstName?.isValid}
                errorMessage={userData.firstName?.errorMessage}
            />

            <Text family="GRegular" size="medium" top={"2.5%"} >Gender</Text>

            <Toptabs
                tabs={["Male", "Female"]}
                activeindex={currentindex}
                onchange={(i) => {
                    setCurrentindex(i);
                    setUserData(prev => ({
                        ...prev,
                        gender: {
                            ...prev.gender,
                            value: i === 0 ? "Male" : "Female",
                        }
                    }))
                }}
                width={60}
                isValid={userData.gender?.isValid}
                errorMessage={userData.gender?.errorMessage}
            />

            <Input
                key={"Mail"}
                label={"Mail ID"}
                labelStyle={{ marginTop: "5%" }}
                placeHolder="Enter mail ID"
                style={{ width: "70%" }}
                value={userData.email?.value}
                onChange={(text: any) => {
                    if (emailverify || !userData?.email?.value) {
                        dispatch(setemailverify(false))
                    }
                    setUserData(prev => ({ ...prev, email: { ...prev.email, value: text } }))
                }}
                rightContent={
                    emailverify ? <View style={{ width: "40%", height: "100%", paddingHorizontal: windowwidth * 0.03, position: "absolute", right: 0, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end" }} >
                        <Text color={Colors.green} style={{ textDecorationLine: "underline", paddingHorizontal: windowwidth * 0.01 }} family="GMedium" size="semimedium" >Verified</Text>
                        <VectorIcons family="MaterialIcons" name={'verified'} iconcolor={Colors.green} />
                    </View> : <Pressable onPress={() => {
                        handleVerifyEmail();
                    }} style={{ width: "40%", height: "100%", position: "absolute", right: 0, top: 0, bottom: 0, justifyContent: "center" }} >
                        <Text color={Colors.green} style={{ textDecorationLine: "underline" }} family="GMedium" size="semimedium" >Verify Mail ID ?</Text>
                    </Pressable>
                }
                isValid={userData.email?.isValid}
                errorMessage={userData.email?.errorMessage}
            />

            <Input
                key={"City"}
                label={"City"}
                containerprops={{ borderWidth: 0 }}
                placeHolder="Enter City"
                value={userData.city?.value}
                onChange={(text: any) => setUserData(prev => ({ ...prev, city: { ...prev.city, value: text } }))}
                isValid={userData.city?.isValid}
                errorMessage={userData.city?.errorMessage}
            />

            <Input
                key={"Sector"}
                label={"Sector"}
                containerprops={{ borderWidth: 0 }}
                placeHolder="Enter Sector"
                value={userData.sector?.value}
                onChange={(text: any) => setUserData(prev => ({ ...prev, sector: { ...prev.sector, value: text } }))}
                isValid={userData.sector?.isValid}
                errorMessage={userData.sector?.errorMessage}
            />

            <Input
                key={"Locality"}
                label={"Locality"}
                containerprops={{ borderWidth: 0 }}
                placeHolder="Enter locality"
                value={userData.locality?.value}
                onChange={(text: any) => setUserData(prev => ({ ...prev, locality: { ...prev.locality, value: text } }))}
                isValid={userData.locality?.isValid}
                errorMessage={userData.locality?.errorMessage}
            />

        </Mainview >
    )
}

export default CleaningResiter