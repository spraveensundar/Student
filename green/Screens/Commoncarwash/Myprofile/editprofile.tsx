import { TextInput, View } from "react-native"
import { Input } from "../../../Components/Field"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text"
import VectorIcons from "../../../Utilities/vectorIcons"
import { windowwidth } from "../../../Utilities/dimensions"
import Toptabs from "../../../Components/toptabs"
import { useState } from "react"
import { authDataProps } from "../../../Actions/Types/formDataTypes"
import { useSelector } from "react-redux"
import { authSelector } from "../../../Slices/auth"
import DateTimePicker from "../../../Components/Field/Input/DateTimePicker"
import { useCleaningRegisterMutation } from "../../../Slices/cleaning"
import { validator } from "../../../Actions/Constants/validation"
import { Toastfn } from "../../../Utilities/helerfunction"
import useCustomHooks, { useProfile } from "../../../Actions/Hooks/customhook"
import { refreshServiceManData } from "../../../Actions/Constants/apiHelpers"
import { SafeAreaView } from "react-native-safe-area-context"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"


const Editprofile: React.FC = () => {
    const { navigation } = useCustomHooks();
    const {refetch} = useProfile()
    const { serviceMan } = useSelector(authSelector);

    const [userData, setUserData] = useState<authDataProps>({
        firstName: {
            value: serviceMan?.name,
            rules: { required: true },
            messages: { required: 'Name is required!' },
            isValid: true,
        },
        email: {
            value: serviceMan?.email,
            rules: { required: true, email: true },
            messages: { required: 'Email is required!', email: 'Invalid email!' },
            isValid: true,
        },
        mobileNumber: {
            value: serviceMan?.mobileNo,
            rules: { required: true },
            messages: { required: 'Mobile number is required!' },
            isValid: true,
        },
        dob: {
            value: serviceMan?.dob ? new Date(serviceMan?.dob) : new Date(),
            rules: { date: true },
            messages: { date: 'Invalid date!' },
            isValid: true,
        },
        gender: {
            value: serviceMan?.gender,
            rules: { required: true },
            messages: { required: 'Gender is required!' },
            isValid: true,
        },
    });
    const [showDTPicker, setShowDTPicker] = useState(false);
    const [currentindex, setCurrentindex] = useState((serviceMan?.gender ?? '').toLowerCase() === 'female' ? 1 : 0);

    const [triggerCleaningRegister, { isLoading }] = useCleaningRegisterMutation();

    const handleSubmit = async () => {
        try {
            const validatedResult = validator(userData);
            setUserData({ ...validatedResult?.data });
            console.log('validatedResult', validatedResult);
            if (validatedResult?.isValid) {
                const formData = new FormData();

                formData.append('name', userData?.firstName?.value);
                formData.append('email', userData?.email?.value);
                formData.append('mobileNo', userData?.mobileNumber?.value);
                formData.append('gender', userData?.gender?.value);
                formData.append('dob', (userData?.dob?.value ?? new Date())?.toISOString());

                console.log('formData', formData);

                const registerResult = await triggerCleaningRegister(formData).unwrap();
                if (registerResult?.status) {
                    console.log('registerResult', registerResult);
                    Toastfn(registerResult?.message ?? 'Profile Updated!');
                    // await refreshServiceManData();
                    refetch()
                    navigation.goBack();
                }
            } else {
                Toastfn('Invalid form submition, Please check the form!');
            }
        } catch (error: any) {
            console.log('AUTH-ERROR', error);
            Toastfn(error?.data?.message ?? 'Something went wrong!');
        }
    };

    console.log('serviceMan', serviceMan);
    // return (
    //     <SafeAreaView style={{ flex: 1, paddingHorizontal: "20%", paddingVertical: "20%" }} >
            
    //         <KeyboardAwareScrollView>

    //           <Input
    //             label={"Name"}
    //             labelStyle={{ marginTop: "5%" }}
    //             placeHolder="Enter Name"
    //             value={userData?.firstName?.value}
    //             onChange={(text) => setUserData(prev => ({ ...prev, firstName: { ...prev.firstName, value: text } }))}
    //             isValid={userData?.firstName?.isValid}
    //             errorMessage={userData?.firstName?.errorMessage}
    //         />

    //          <Input
    //             label={"Name"}
    //             labelStyle={{ marginTop: "5%" }}
    //             placeHolder="Enter Name"
    //             value={userData?.firstName?.value}
    //             onChange={(text) => setUserData(prev => ({ ...prev, firstName: { ...prev.firstName, value: text } }))}
    //             isValid={userData?.firstName?.isValid}
    //             errorMessage={userData?.firstName?.errorMessage}
    //         />
    //         </KeyboardAwareScrollView>

    //     </SafeAreaView>
    // )
    return (
        <Mainview
            isheader
            headertitle="My Profile"
            bottomtext="Next"
            bottomContent
            onBottompress={() => handleSubmit()}
            ismainloading={isLoading}
        >
            <Text top={"5%"} size="medium" >Edit Profile  Details</Text>

            <Input
                label={"Name"}
                labelStyle={{ marginTop: "5%" }}
                placeHolder="Enter Name"
                value={userData?.firstName?.value}
                onChange={(text) => setUserData(prev => ({ ...prev, firstName: { ...prev.firstName, value: text } }))}
                isValid={userData?.firstName?.isValid}
                errorMessage={userData?.firstName?.errorMessage}
            />

            <Input
                label={"Mail ID"}
                labelStyle={{ marginTop: "2.5%" }}
                placeHolder="Enter mail ID"
                value={userData?.email?.value}
                onChange={(text) => setUserData(prev => ({ ...prev, email: { ...prev.email, value: text } }))}
                isValid={userData?.email?.isValid}
                errorMessage={userData?.email?.errorMessage}
            />

            <Input
                label={"Mobile number"}
                labelStyle={{ marginTop: "2.5%" }}
                placeHolder="Enter mobile number"
                value={userData?.mobileNumber?.value}
                onChange={(text) => setUserData(prev => ({ ...prev, mobileNumber: { ...prev.mobileNumber, value: text } }))}
                isValid={userData?.mobileNumber?.isValid}
                errorMessage={userData?.mobileNumber?.errorMessage}
            />

            <DateTimePicker
                label={"Date of Birth"}
                labelStyle={{ marginTop: "2.5%" }}
                placeHolder="Enter DOB"
                inputprops={{
                    editable: false,
                }}
                rightContent={
                    <View style={{ width: "17.5%", height: "100%", position: "absolute", right: 0, justifyContent: "center", alignItems: "center" }} >
                        <VectorIcons
                            family="Lucide"
                            size={windowwidth * 0.065}
                            name={"calendar-days"}
                        />
                    </View>
                }
                value={userData?.dob?.value}
                showPicker={showDTPicker}
                onPressPicker={() => setShowDTPicker(true)}
                onDismiss={() => setShowDTPicker(false)}
                onConfirm={(item: any) => setUserData(prev => ({ ...prev, dob: { ...prev.dob, value: item } }))}
                datePickerProps={{ maximumDate: new Date(), display: 'spinner' }}
                isValid={userData?.dob?.isValid}
                errorMessage={userData?.dob?.errorMessage}
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
                isValid={userData?.gender?.isValid}
                errorMessage={userData?.gender?.errorMessage}
            />

        </Mainview>
    )

}

export default Editprofile