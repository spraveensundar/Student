import { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import Text from '../../../Components/text';
import Toptabs from '../../../Components/toptabs';
import { Input } from '../../../Components/Field';
import Mainview from '../../../Components/mainview';
import VectorIcons from '../../../Utilities/vectorIcons';
import { windowwidth } from '../../../Utilities/dimensions';
import { validator } from '../../../Actions/Constants/validation';
import { authDataProps } from '../../../Actions/Types/formDataTypes';
import DateTimePicker from '../../../Components/Field/Input/DateTimePicker';
import { scrapSelector, useScrapperEditMutation } from '../../../Slices/scrap';
import useCustomHooks, { useApihooks } from '../../../Actions/Hooks/customhook';
import useApiError from '../../../Actions/Hooks/errorhook';

const ScrapDealerEditProfile: React.FC = () => {
    const { navigation, successtoast, failuretoast } = useCustomHooks();
    const { scrapDetails } = useSelector(scrapSelector);

    const [userData, setUserData] = useState<authDataProps>({
        firstName: {
            value: scrapDetails?.firstName,
            rules: { required: true },
            messages: { required: 'First Name is required!' },
            isValid: true,
        },
        lastName: {
            value: scrapDetails?.lastName,
            rules: { required: true },
            messages: { required: 'LastName is required!' },
            isValid: true,
        },
        email: {
            value: scrapDetails?.email,
            rules: { required: true, email: true },
            messages: { required: 'Email is required!', email: 'Invalid email!' },
            isValid: true,
        },
        mobileNumber: {
            value: scrapDetails?.mobileNo,
            rules: { required: true },
            messages: { required: 'Mobile number is required!' },
            isValid: true,
        },
        dob: {
            value: scrapDetails?.dob ? new Date(scrapDetails?.dob) : new Date(),
            rules: { date: true },
            messages: { date: 'Invalid date!' },
            isValid: true,
        },
        gender: {
            value: scrapDetails?.gender,
            rules: { required: true },
            messages: { required: 'Gender is required!' },
            isValid: true,
        },
    });

    const [currentindex, setCurrentindex] = useState((scrapDetails?.gender ?? '').toLowerCase() === 'female' ? 1 : 0);
    const [showDTPicker, setShowDTPicker] = useState(false);

    const [scrapperEdit, { isLoading, error }] = useScrapperEditMutation();
    const { triggerScrapperDetails } = useApihooks();

    useApiError(error);

    const handleSubmit = async () => {
        try {
            const validatedResult = validator(userData);
            setUserData({ ...validatedResult?.data });
            if (validatedResult?.isValid) {
                const formData = new FormData();
                formData.append('scrapperId', scrapDetails?._id);
                formData.append('firstName', userData?.firstName?.value);
                formData.append('lastName', userData?.lastName?.value);
                formData.append('email', userData?.email?.value);
                formData.append('mobileNo', userData?.mobileNumber?.value);
                formData.append('gender', userData?.gender?.value);
                formData.append('dob', (userData?.dob?.value ?? new Date())?.toISOString());
                const registerResult = await scrapperEdit(formData).unwrap();
                if (registerResult?.status) {
                    successtoast(registerResult?.message ?? 'Profile Updated!');
                    triggerScrapperDetails();
                    navigation.goBack();
                }
            } else {
                failuretoast('Invalid form submition, Please check the form!');
            }
        } catch (error: any) {
            console.log('AUTH-ERROR', error);
            failuretoast(error?.data?.message ?? 'Something went wrong!');
        }
    };


    return (
        <Mainview
            headertitle='Edit Profile'
            bottomContent
            isbottomload={isLoading}
            bottomtext='Save'
            onBottompress={() => handleSubmit()}

        >
            <Text family='GMedium' size='semilarge' top={'5%'} >{'My Profile  Details'}</Text>
            <Input
                label={"First Name"}
                labelStyle={{ marginTop: "5%" }}
                placeHolder="Enter Name"
                value={userData?.firstName?.value}
                onChange={(text) => setUserData(prev => ({ ...prev, firstName: { ...prev.firstName, value: text } }))}
                isValid={userData?.firstName?.isValid}
                errorMessage={userData?.firstName?.errorMessage}
            />
            <Input
                label={"Last Name"}
                labelStyle={{ marginTop: "5%" }}
                placeHolder="Enter Name"
                value={userData?.lastName?.value}
                onChange={(text) => setUserData(prev => ({ ...prev, lastName: { ...prev.lastName, value: text } }))}
                isValid={userData?.lastName?.isValid}
                errorMessage={userData?.lastName?.errorMessage}
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

export default ScrapDealerEditProfile;