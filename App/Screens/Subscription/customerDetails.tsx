import React, { useCallback, useState } from "react";
import Mainview from "../../Components/mainview";
import useCustomHooks from "../../Actions/Hooks/customhook";
import styles from "./styles";
import { View, ScrollView, Pressable } from "react-native";
import { Colors } from "../../Utilities/uiasset";
import Text from "../../Components/text";
import { Button, Dropdown, Input } from "../../Components/Field";
import { borderradius, windowwidth } from "../../Utilities/dimensions";
import Checkbox from "../../Components/Field/Input/Checkbox";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/stacknavigationtypes";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import VectorIcons from "../../Utilities/vectorIcons";
import DateTime from "../../Components/dateTime";
import { dateTimeForm, isEmpty, toastFn, validateVehicleNo } from "../../Common/commonFunction";
import { setNewCleaningService } from "../../Common/redux/serviceReducer";
import { useDispatch, useSelector } from "react-redux";
import ErrorText from "../../Components/ErrorText";
import config from "../../Common/config";
import { useFocusEffect } from "@react-navigation/native";
import { useGetMyDetailQuery } from "../../Common/redux/userHook";
import { fetchLatLng } from "../../Common/axiosHooks/userHooks";
import { constantData } from "../../Common/constant";


type Props = NativeStackScreenProps<Stacknavigationtypes, 'CustomerDetails'>;

const initialFormData = {
    name: "",
    emailId: "",
    gender: "Male",
    address: "",
    sector: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    flatNo: "",
    blockNo: "",
    registrationNo: "",
    parkingType: "Open",
    parkingDetail: "",
    acceptTermsConditions: false,
}

let previousData: any = {};

const CustomerDetails: React.FC<Props> = ({ route }) => {



    const dispatch = useDispatch();
    const { data, isLoading, refetch } = useGetMyDetailQuery(undefined);
    const newCleaningService: any = useSelector((state: any) => state?.serviceData?.newCleaningService)



    const { theme, navigation, } = useCustomHooks();
    const style = styles(theme);



    const [formData, setFormData] = useState<any>(initialFormData);
    const [validateErrors, setValidateErrors] = useState<any>({});
    const [disableStatus, setDisableStatus] = useState(false);



    const userDetail = data?.data;
    const onTime: boolean = (newCleaningService?.serviceType == constantData.subscriptionType.ots ? true : false);

    console.log('CustomerDetailsnewCleaningServicenewCleaningService', newCleaningService)

    useFocusEffect(
        useCallback(() => {

            if (newCleaningService?.customerDetail) {
                previousData = {
                    ...newCleaningService?.customerDetail
                }
                setFormData({ ...previousData })

            }
            else {
                previousData = {
                    name: userDetail?.name ?? "",
                    emailId: userDetail?.email ?? "",
                    gender: userDetail?.gender ?? "Male",

                    address: newCleaningService?.address ? newCleaningService?.address : (newCleaningService?.addressData?.fullAddress ? newCleaningService?.addressData?.fullAddress : ""),
                    blockNo: newCleaningService?.blockNo,
                    flatNo: newCleaningService?.flatNo ?? "",
                    apartmentName: newCleaningService?.apartmentName ?? "",
                    sector: newCleaningService?.sector ?? "",
                    area: newCleaningService?.area ?? "",
                    landmark: newCleaningService?.landmark ?? "",
                    city: newCleaningService?.addressData?.city,
                    state: newCleaningService?.addressData?.state,
                    country: newCleaningService?.addressData?.country,

                    registrationNo: newCleaningService?.selectedVehicleDetail?.registrationNo,
                    parkingType: newCleaningService?.selectedVehicleDetail?.parkingType ?? "",
                    parkingDetail: "",
                    acceptTermsConditions: false,
                    latitude: newCleaningService?.latitude,
                    longitude: newCleaningService?.longitude,
                }
                if (onTime) {
                    let currentTime = new Date().setDate(new Date().getDate() + 1);
                    previousData.packageActiveDate = currentTime;
                    previousData.serviceStartTime = {
                        hour: new Date(currentTime).getHours(),
                        minute: new Date(currentTime).getMinutes(),
                        display: dateTimeForm(new Date(currentTime), false, true, true),
                    };
                }
                setFormData(previousData);
            }
        }, [data, newCleaningService])
    )

    const onChange = (value: any, key: string) => {
        setValidateErrors({});
        console.log('oudiudifsfs', value)
        let setData = {
            ...formData,
            [key]: value,
        }
        if (key == "packageActiveDate") {
            let hour = new Date(value).getHours(), minute = new Date(value).getMinutes();
            setData = {
                ...setData,
                serviceStartTime: {
                    hour: hour,
                    minute: minute,
                    display: dateTimeForm(new Date(value), false, true, true),
                },
            };
        }
        setFormData(setData)
    }

    console.log('formkrnjfs', formData)

    const validation = (data: any) => {
        let error: any = {};
        if (onTime && isEmpty(formData?.packageActiveDate)) {
            error.packageActiveDate = "Select start time"
        }
        if (isEmpty(data?.name)) {
            error.name = "Enter name"
        }
        if (isEmpty(data?.emailId)) {
            error.emailId = "Enter email-id"
        }
        else if (!config.EMAIL_REGEX.test(data?.emailId)) {
            error.emailId = "Enter valid email-id"
        }
        if (isEmpty(data?.emailId)) {
            error.emailId = "Enter email-id"
        }
        if (isEmpty(data?.gender)) {
            error.gender = "Select gender"
        }
        if (isEmpty(data?.address)) {
            error.address = "Enter address"
        }
        if (isEmpty(data?.sector)) {
            error.sector = "Enter sector"
        }
        if (isEmpty(data?.landmark)) {
            error.landmark = "Enter landmark"
        }
        if (isEmpty(data?.flatNo)) {
            error.flatNo = "Enter Flat No"
        }
        if (isEmpty(data?.blockNo)) {
            error.blockNo = "Enter Tower/ Block No"
        }
        if (isEmpty(data?.registrationNo)) {
            error.registrationNo = "Enter registration number"
        }
        else if (!validateVehicleNo(data?.registrationNo)) {
            error.registrationNo = "Enter valid registration number"
        }
        if (isEmpty(data?.parkingType)) {
            error.parkingType = "Enter parking type"
        }
        if (isEmpty(data?.parkingDetail)) {
            error.parkingDetail = "Enter parking detail"
        }
        // if (isEmpty(data?.instruction)) {
        //     error.instruction = "Enter instructions"
        // }
        return error;
    }

    const onContinue = async () => {
        setDisableStatus(true);
        let sendData: any = {
            name: formData?.name,
            emailId: formData?.emailId,
            gender: formData?.gender,
            address: formData?.address,
            sector: formData?.sector,
            landmark: formData?.landmark,
            city: formData?.city,
            state: formData?.state,
            country: formData?.country,
            flatNo: formData?.flatNo,
            blockNo: formData?.blockNo,
            apartmentName: formData?.apartmentName,
            registrationNo: formData?.registrationNo,
            parkingType: formData?.parkingType,
            parkingDetail: formData?.parkingDetail,
            instruction: formData?.instruction ?? "",
            acceptTermsConditions: formData?.acceptTermsConditions,
            latitude: formData?.latitude,
            longitude: formData?.longitude,
        }

        if (onTime) {
            sendData.packageActiveDate = formData?.packageActiveDate;
            sendData.serviceStartTime = formData?.serviceStartTime;
        }
        const validate = validation(sendData);
        console.log('acceptTermsConditionsacceptTermsConditions', validate)
        if (isEmpty(validate)) {
            if (!formData?.acceptTermsConditions) {
                setDisableStatus(false);
                toastFn("Please accept terms & conditions")
                return setValidateErrors({
                    acceptTermsConditions: "Please accept terms & conditions"
                });
            }
            let fetchLocationData: any;
            let locationUpdate: any = {};
            if (previousData?.address != formData?.address) {
                fetchLocationData = {
                    address: formData?.address,
                };
            }
            else if (
                previousData?.sector != formData?.sector || previousData?.flatNo != formData?.flatNo ||
                previousData?.area != formData?.area || previousData?.city != formData?.city
            ) {
                fetchLocationData = {
                    addressType: formData?.addressType,
                    sector: formData?.sector,
                    flatNo: formData?.flatNo,
                    area: formData?.area,
                    city: formData?.city,
                    state: formData?.state,
                    country: formData?.country,
                };
            }
            if (!isEmpty(fetchLocationData)) {
                let resp = await fetchLatLng(fetchLocationData);
                console.log('fetchlatlngggresp', resp, fetchLocationData)
                if (resp?.status) {
                    sendData.latitude = resp?.data?.latitude;
                    sendData.longitude = resp?.data?.longitude;
                    locationUpdate = {
                        addressData: resp?.data?.addressData,
                        address: resp?.data?.address,
                        latitude: resp?.data?.latitude,
                        longitude: resp?.data?.longitude,
                    }
                }
                else {
                    setDisableStatus(false);
                    toastFn(resp?.message ?? "Location not recognized")
                }
            }

            setValidateErrors({})
            dispatch(
                setNewCleaningService({
                    customerDetail: sendData,
                    ...locationUpdate,
                })
            );
            navigation.navigate('Payment')
        }
        else {
            toastFn("Fix all validations");
            setValidateErrors(validate);
        }
        setDisableStatus(false);
    }


    return (
        <Mainview
            isheader={true}
            headertitle="Customer Details"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={{ paddingHorizontal: "6%", paddingTop: "5%", marginBottom: "5%", gap: 20, alignItems: 'center', }}>
                    <Checkbox
                        label="Accept Terms & Conditions"
                        initial={formData?.acceptTermsConditions}
                        onChange={() => onChange(!formData?.acceptTermsConditions, 'acceptTermsConditions')}
                    />
                    <Button onPress={() =>
                        onContinue()
                    }
                        buttonStyle={[style.Button, { backgroundColor: theme.btnColor, }]} title="Continue" />
                </View>
            }>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={[style.container, { gap: 20 }]}>
                    <Text size="semilarge" family="GMedium" >Customer Details</Text>

                    {
                        onTime
                            ?
                            <>
                                <View style={{ gap: 20 }}>
                                    <Text size="medium" family="GRegular">Select date & time</Text>
                                    <DateTime
                                        onChange={(e) => { onChange(new Date(e).getTime(), "packageActiveDate"); console.log('vallll', new Date(e).getTime()) }}
                                        value={formData?.packageActiveDate ? new Date(formData?.packageActiveDate) : null}
                                    />
                                </View>
                                <ErrorText
                                    errorMessage={validateErrors?.packageActiveDate}
                                />
                            </>
                            :
                            <></>
                    }

                    <Input
                        label={"Name"}
                        placeHolder="Enter Name "
                        value={formData?.name || ""}
                        onChange={(e) => onChange(e, "name")}
                        isValid={!validateErrors?.name}
                        errorMessage={validateErrors?.name}
                    />
                    <Input
                        label={"Email-Id"}
                        placeHolder="Enter email"
                        value={formData?.emailId || ""}
                        onChange={(e) => onChange(e, "emailId")}
                        isValid={!validateErrors?.emailId}
                        errorMessage={validateErrors?.emailId}
                    />
                    <Text size="medium" family="GRegular" >Gender</Text>
                    <View style={style.btnn}>
                        <Pressable
                            onPress={() => onChange("Male", "gender")}
                            style={{
                                ...style.btn,
                                backgroundColor: formData?.gender === "Male" ? theme.tabactive : theme.lightGrey,
                            }}
                        ><Text style={{ color: formData?.gender === "Male" ? theme.activetabtext : 'black' }} family="GMedium" size="medium">Male</Text></Pressable>
                        <Pressable
                            onPress={() => onChange("Female", "gender")}
                            style={{
                                ...style.btn,
                                backgroundColor: formData?.gender === "Female" ? theme.tabactive : theme.lightGrey,
                            }}
                        ><Text style={{ color: formData?.gender === "Female" ? theme.activetabtext : 'black' }} family="GMedium" size="medium">Female</Text>
                        </Pressable>
                    </View>

                    {
                        validateErrors?.gender
                            ?
                            <ErrorText
                                errorMessage={validateErrors?.gender}
                            />
                            :
                            <></>
                    }



                    <Input
                        key={'Address'}
                        label={'Address'}
                        placeHolder='Address'
                        style={{ height: 100, textAlignVertical: 'top' }}
                        inputProps={{ multiline: true, numberOfLines: 5 }}
                        value={formData?.address || ""}
                        onChange={(e) => onChange(e, "address")}
                        isValid={!validateErrors?.address}
                        errorMessage={validateErrors?.address}
                        disabled={true}
                    />

                    {/* <Dropdown
                        label={'Sector'}
                        placeholder={'Choose sector type'}
                    /> */}

                    <Input
                        label={"Tower/ Block No"}
                        placeHolder="Enter Tower / Block No"
                        value={formData?.blockNo || ""}
                        onChange={(e) => onChange(e, "blockNo")}
                        isValid={!validateErrors?.blockNo}
                        errorMessage={validateErrors?.blockNo}
                        disabled={true}
                    />

                    <Input
                        label={"Flat no/house No"}
                        placeHolder="Enter Flat No/house no"
                        value={formData?.flatNo || ""}
                        onChange={(e) => onChange(e, "flatNo")}
                        isValid={!validateErrors?.flatNo}
                        errorMessage={validateErrors?.flatNo}
                        disabled={true}
                    />

                    <Input
                        label={"Apartment Name/Sector"}
                        placeHolder="Enter Flat No, Apartment Name / door number"
                        value={formData?.apartmentName || ""}
                        onChange={(e) => onChange(e, "apartmentName")}
                        isValid={!validateErrors?.apartmentName}
                        errorMessage={validateErrors?.apartmentName}
                        disabled={true}
                    />

                    {/* <Input
                        label={"Flat No"}
                        placeHolder="Enter Flat No"
                        value={formData?.flatNo || ""}
                        onChange={(e) => onChange(e, "flatNo")}
                        isValid={!validateErrors?.flatNo}
                        errorMessage={validateErrors?.flatNo}
                        disabled={true}
                    /> */}

                    <Input
                        label={"Sector"}
                        placeHolder="Enter Sector"
                        value={formData?.sector || ""}
                        onChange={(e) => onChange(e, "sector")}
                        isValid={!validateErrors?.sector}
                        errorMessage={validateErrors?.sector}
                        disabled={true}
                    />

                    <Input
                        label={"Land Mark"}
                        placeHolder="Enter Land Mark"
                        value={formData?.landmark || ""}
                        onChange={(e) => onChange(e, "landmark")}
                        isValid={!validateErrors?.landmark}
                        errorMessage={validateErrors?.landmark}
                    // disabled={true}
                    />

                    <Input
                        label={"City"}
                        placeHolder="Enter city"
                        value={formData?.city || ""}
                        onChange={(e) => onChange(e, "city")}
                        isValid={!validateErrors?.city}
                        errorMessage={validateErrors?.city}
                        disabled={true}
                    />

                    <Input
                        label={"Registration No (E.x: TN59EB8392)"}
                        placeHolder="Enter Registration No without space"
                        value={formData?.registrationNo || ""}
                        onChange={(e) => onChange(e, "registrationNo")}
                        isValid={!validateErrors?.registrationNo}
                        errorMessage={validateErrors?.registrationNo}
                        disabled={true}
                    />

                    <View style={{ gap: 20 }}>
                        <Text size="medium" family="GRegular" >Parking Type</Text>
                        <View style={style.btnn}>
                            <Pressable
                                onPress={() => onChange("Open", "parkingType")}
                                style={{
                                    ...style.btn,
                                    backgroundColor: formData?.parkingType === "Open" ? theme.tabactive : theme.lightGrey,
                                }}
                            ><Text style={{ color: formData?.parkingType === "Open" ? theme.activetabtext : 'black' }} family="GMedium" size="medium">Open</Text></Pressable>
                            <Pressable
                                onPress={() => onChange("Stilt", "parkingType")}
                                style={{
                                    ...style.btn,
                                    backgroundColor: formData?.parkingType === "Stilt" ? theme.tabactive : theme.lightGrey,
                                }}
                            ><Text style={{ color: formData?.parkingType === "Stilt" ? theme.activetabtext : 'black' }} family="GMedium" size="medium">Stilt</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => onChange("Basement", "parkingType")}
                                style={{
                                    ...style.btn,
                                    backgroundColor: formData?.parkingType === "Basement" ? theme.tabactive : theme.lightGrey,
                                }}
                            ><Text style={{ color: formData?.parkingType === "Basement" ? theme.activetabtext : 'black' }} family="GMedium" size="medium">Basement</Text>
                            </Pressable>
                        </View>

                        {
                            validateErrors?.parkingType
                                ?
                                <ErrorText
                                    errorMessage={validateErrors?.parkingType}
                                />
                                :
                                <></>
                        }

                        <Input
                            label={"Parking Details"}
                            placeHolder="Enter Parking Landmark / No"
                            multiline={true}
                            numberOfLines={4}
                            style={{ height: 120, textAlignVertical: 'top', textAlign: 'left', paddingTop: 15 }}
                            value={formData?.parkingDetail || ""}
                            onChange={(e) => onChange(e, "parkingDetail")}
                            isValid={!validateErrors?.parkingDetail}
                            errorMessage={validateErrors?.parkingDetail}
                        />
                    </View>

                    <Input
                        label={"Instruction to cleaner"}
                        placeHolder="Enter instruction to cleaner"
                        value={formData?.instruction || ""}
                        onChange={(e) => onChange(e, "instruction")}
                        isValid={!validateErrors?.instruction}
                        errorMessage={validateErrors?.instruction}
                    />

                </View>
            </ScrollView>

        </Mainview >
    )
}

export default CustomerDetails;