import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useDispatch, useSelector } from 'react-redux';

import Text from "../../../../Components/text";
import { toastFn } from "../../../../Common/commonFunction";
import { Button, Input } from "../../../../Components/Field";
import { windowheight } from "../../../../Utilities/dimensions";
import { validator } from "../../../../Common/redux/validation";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { setScrapData } from "../../../../Common/redux/scrapService";

import styles from "../styles";

type Props = {
    onNext: () => void;
    changeLoadingStatus?: (data: any) => void;
};

const ScrapDetail: React.FC<Props> = ({ onNext }) => {
    const { theme } = useCustomHooks();
    const style = styles(theme);
    const dispatch = useDispatch();

    const scrapData = useSelector((state: any) => state.scrapService.scrapData);

    const [vehicle, setVehicle] = useState<any>({
        vehicleType: {
            value: scrapData?.vehicleType || "",
            rules: { required: true },
            messages: { required: "Vehicle Type is required!" },
            isValid: true,
            errorMessage: "",
        },
        vehicleMake: {
            value: scrapData?.vehicleMake || "",
            rules: { required: true },
            messages: { required: "Vehicle Make is required!" },
            isValid: true,
            errorMessage: "",
        },
        vehicleModel: {
            value: scrapData?.vehicleModel || "",
            rules: { required: true },
            messages: { required: "Vehicle Model is required!" },
            isValid: true,
            errorMessage: "",
        },
        vehicleRegisterDate: {
            value: scrapData?.vehicleRegisterDate || "",
            rules: { required: true },
            messages: { required: "Vehicle Register Date is required!" },
            isValid: true,
            errorMessage: "",
        },
        vehicleYear: {
            value: scrapData?.vehicleYear || "",
            rules: { required: true },
            messages: { required: "Vehicle Year is required!" },
            isValid: true,
            errorMessage: "",
        },
        vehicleRegistrationNo: {
            value: scrapData?.vehicleRegistrationNo || "",
            rules: { required: true },
            messages: { required: "Vehicle Registration No is required!" },
            isValid: true,
            errorMessage: "",
        },
        vehicleOwnerName: {
            value: scrapData?.vehicleOwnerName || "",
            rules: { required: true },
            messages: { required: "Vehicle Owner Name is required!" },
            isValid: true,
            errorMessage: "",
        },
        vehicleOwnerMobileNo: {
            value: scrapData?.vehicleOwnerMobileNo || "",
            rules: { required: true, number: true },
            messages: {
                required: "Owner Mobile No is required!",
                number: "Number is required!"
            },
            isValid: true,
            errorMessage: "",
        },
        vehicleTitle: {
            value: scrapData?.vehicleTitle || "",
            rules: { required: true },
            messages: { required: "Vehicle Title is required!" },
            isValid: true,
            errorMessage: "",
        },
        vehicleDescription: {
            value: scrapData?.vehicleDescription || "",
            rules: { required: true },
            messages: { required: "Description is required!" },
            isValid: true,
            errorMessage: "",
        },
    });

    type VehicleField = keyof typeof vehicle;
    const handleChange = (field: VehicleField, value: string) => {
        setVehicle((prev: any) => ({
            ...prev,
            [field]: {
                ...prev[field],
                value,
                isValid: true,
                errorMessage: "",
            },
        }));
    };

    const handleSubmit = () => {
        const validatedResult = validator(vehicle);
        setVehicle({ ...validatedResult?.data });
        if (validatedResult?.isValid) {
            dispatch(setScrapData({
                vehicleType: vehicle?.vehicleType?.value,
                vehicleMake: vehicle?.vehicleMake?.value,
                vehicleModel: vehicle?.vehicleModel?.value,
                vehicleYear: vehicle?.vehicleYear?.value,
                vehicleRegisterDate: vehicle?.vehicleRegisterDate?.value,
                vehicleRegistrationNo: vehicle?.vehicleRegistrationNo?.value,
                vehicleOwnerName: vehicle?.vehicleOwnerName?.value,
                vehicleOwnerMobileNo: vehicle?.vehicleOwnerMobileNo?.value,
                vehicleTitle: vehicle?.vehicleTitle?.value,
                vehicleDescription: vehicle?.vehicleDescription?.value,
            }));
            onNext();
        } else {
            toastFn("Invalid form submission, Please check the form!");
        }
    };

    return (
        <>
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1 }}
                keyboardVerticalOffset={windowheight * 0.12}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={style.container}>
                        <Text size="xxmedium" family="GMedium" style={{ marginBottom: 10 }}>Product Details</Text>
                        <Input
                            label="Vehicle Type"
                            placeHolder="Vehicle Type"
                            value={vehicle.vehicleType.value}
                            isValid={vehicle.vehicleType.isValid}
                            errorMessage={vehicle.vehicleType.errorMessage}
                            onChange={(text) => handleChange("vehicleType", text)}
                        />
                        <Input
                            label="Vehicle Make"
                            placeHolder="Vehicle Make"
                            value={vehicle.vehicleMake.value}
                            isValid={vehicle.vehicleMake.isValid}
                            errorMessage={vehicle.vehicleMake.errorMessage}
                            onChange={(text) => handleChange("vehicleMake", text)}
                        />
                        <Input
                            label="Vehicle Model"
                            placeHolder="Vehicle Model"
                            value={vehicle.vehicleModel.value}
                            isValid={vehicle.vehicleModel.isValid}
                            errorMessage={vehicle.vehicleModel.errorMessage}
                            onChange={(text) => handleChange("vehicleModel", text)}
                        />
                        <Input
                            label="Vehicle Year"
                            placeHolder="Enter Vehicle Year"
                            value={vehicle.vehicleYear.value}
                            isValid={vehicle.vehicleYear.isValid}
                            errorMessage={vehicle.vehicleYear.errorMessage}
                            onChange={(text) => handleChange("vehicleYear", text)}
                        />
                        <Input
                            label="Vehicle Registration Date / Purchase Date"
                            placeHolder="Vehicle Registration Date / Purchase Date"
                            value={vehicle.vehicleRegisterDate.value}
                            isValid={vehicle.vehicleRegisterDate.isValid}
                            errorMessage={vehicle.vehicleRegisterDate.errorMessage}
                            onChange={(text) => handleChange("vehicleRegisterDate", text)}
                        />
                        <Input
                            label="Vehicle Registration No"
                            placeHolder="Vehicle Registration No"
                            value={vehicle.vehicleRegistrationNo.value}
                            isValid={vehicle.vehicleRegistrationNo.isValid}
                            errorMessage={vehicle.vehicleRegistrationNo.errorMessage}
                            onChange={(text) => handleChange("vehicleRegistrationNo", text)}
                        />
                        <Input
                            label="Vehicle Owner Name"
                            placeHolder="Vehicle Owner Name"
                            value={vehicle.vehicleOwnerName.value}
                            isValid={vehicle.vehicleOwnerName.isValid}
                            errorMessage={vehicle.vehicleOwnerName.errorMessage}
                            onChange={(text) => handleChange("vehicleOwnerName", text)}
                        />
                        <Input
                            label="Vehicle OwnerMobile No"
                            placeHolder="Enter Owner Mobile"
                            value={vehicle.vehicleOwnerMobileNo.value}
                            isValid={vehicle.vehicleOwnerMobileNo.isValid}
                            errorMessage={vehicle.vehicleOwnerMobileNo.errorMessage}
                            onChange={(text) => handleChange("vehicleOwnerMobileNo", text)}
                        />
                        <Input
                            label="Vehicle Title Name"
                            placeHolder="Enter Title Name"
                            value={vehicle.vehicleTitle.value}
                            isValid={vehicle.vehicleTitle.isValid}
                            errorMessage={vehicle.vehicleTitle.errorMessage}
                            onChange={(text) => handleChange("vehicleTitle", text)}
                        />
                        <Input
                            label="Vehicle Description"
                            placeHolder="Enter Vehicle Description"
                            value={vehicle.vehicleDescription.value}
                            isValid={vehicle.vehicleDescription.isValid}
                            errorMessage={vehicle.vehicleDescription.errorMessage}
                            onChange={(text) => handleChange("vehicleDescription", text)}
                            multiline={true}
                        />
                        <View style={{ marginTop: '10%' }} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Button
                title="Next"
                onPress={handleSubmit}
            />
        </>
    );
};

export default ScrapDetail;