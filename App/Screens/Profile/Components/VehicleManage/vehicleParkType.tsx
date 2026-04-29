import React, { useCallback, useState } from "react";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { KeyboardAvoidingView, Pressable, ScrollView, View } from "react-native";
import styles from "./styles";
import Images, { icons } from "../../../../Utilities/images";
import Text from "../../../../Components/text";
import AddVehicle from "./addVehicle";
import { Button, Input } from "../../../../Components/Field";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, returnOriginalFile, toastFn, validateVehicleNo } from "../../../../Common/commonFunction";
import { addUserVehicle, editUserVehicle } from "../../../../Common/axiosHooks/userHooks";
import { removeNewVehicle } from "../../../../Common/redux/authSliceReducer";
import { windowheight } from "../../../../Utilities/dimensions";

type vehicleTypeProps = {
    onNext?: () => void;
    changeLoadingStatus?: (data: any) => void;
};

const initialFormData = {
    parkingType: "Open",
    transmissionType: "Manual",
    fuelType: "Petrol",
    registrationNo: "",
}


const parkingOptions = [
    "Open",
    "Stilt",
    "Basement",
]
const fuelOptions = [
    "Petrol",
    "Diesel",
    "Electric",
];
const transmissionOptions = [
    "Manual",
    "Automatic",
]

const VehicleParkType: React.FC<vehicleTypeProps> = ({ onNext, changeLoadingStatus, }) => {



    const dispatch = useDispatch();
    const newVehicle: any = useSelector((state: any) => state?.userData?.newVehicle);


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const [isVehicleAdd, setIsVehicleAdd] = useState(false);
    const [visible, setVisible] = useState(false)
    const [disableStatus, setDisabledStatus] = useState(false);
    const [formData, setFormData] = useState(initialFormData)


    console.log('newvaaaa', newVehicle);

    useFocusEffect(
        useCallback(() => {
            if (newVehicle?.id) {
                setFormData({
                    parkingType: newVehicle?.parkingType ?? initialFormData?.parkingType,
                    transmissionType: newVehicle?.transmissionType ?? initialFormData?.transmissionType,
                    fuelType: newVehicle?.fuelType ?? initialFormData?.fuelType,
                    registrationNo: newVehicle?.registrationNo ?? initialFormData?.registrationNo,
                });
            }
        }, [newVehicle])
    );

    const onChange = (value: any, id: string) => {
        let setData = {
            ...formData,
            [id]: value,
        };
        setFormData(setData);
    }

    const onSelect = (value: any, id: string) => {
        let setData = {
            ...formData,
            [id]: value,
        };
        setFormData(setData);
    }

    const validation = (data: any) => {
        let error: any = {};
        if (isEmpty(data?.registrationNo)) {
            error.registrationNo = "Enter registration number"
        }
        else if (!validateVehicleNo(data?.registrationNo)) {
            error.registrationNo = "Enter valid registration number"
        }
        return error;
    }

    const onSubmit = async () => {
        changeLoadingStatus?.({
            overLapLoader: true,
        })
        setDisabledStatus(true);
        try {
            let sendData: any = {
                vehicleTypeId: newVehicle?.vehicleTypeId,
                brandId: newVehicle?.brandId,
                brandVehicleId: newVehicle?.brandVehicleId,
                parkingType: formData?.parkingType,
                transmissionType: formData?.transmissionType,
                fuelType: formData?.fuelType,
                registrationNo: formData?.registrationNo,
            };
            let errors = validation(sendData);
            if (isEmpty(errors)) {
                let resp: any;
                if (newVehicle?.id) {
                    sendData.vehicleId = newVehicle.id;
                    resp = await editUserVehicle(sendData);
                }
                else {
                    resp = await addUserVehicle(sendData);
                }
                console.log('addUserVehicle_resp', resp, sendData);
                if (resp?.status) {
                    toastFn(resp?.message ?? (newVehicle?.id ? "Vehicle updated" : "Vehicle added"));
                    dispatch(removeNewVehicle());
                    if (onNext) {
                        onNext();
                    }
                    else {
                        navigation.goBack();
                    }
                }
            }
            else {
                toastFn(errors?.registrationNo ?? "Try-Again");
            }
        }
        catch (error: any) {
            console.log('onSubmit_error', error);
        }
        changeLoadingStatus?.({
            overLapLoader: false,
        })
        setDisabledStatus(false);
    }


    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, }}
            keyboardVerticalOffset={windowheight * 0.12}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >

                <View style={{ marginTop: "5%", justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ gap: 20, padding: 20, }}>
                        <View style={style.vehicle}>
                            <Images type="image" source={{ uri: returnOriginalFile(newVehicle?.brandVehicleDetail?.brandVehicleImage) }} style={{ width: "100%", height: "100%" }} />
                            <Text family="GMedium" size="large">{newVehicle?.brandVehicleDetail?.vehicleBodyType}</Text>
                        </View>
                        <Text family="GMedium" size="medium">Parking Type</Text>
                        <View style={{ flexDirection: 'row', gap: 20 }}>

                            {
                                parkingOptions.map((value) => {
                                    return (
                                        <>
                                            <Pressable onPress={() => onSelect(value, "parkingType")} style={{
                                                paddingHorizontal: 20, borderRadius: 10,
                                                paddingVertical: 5, backgroundColor: formData?.parkingType == value ? theme.btnColor : theme.lightGrey
                                            }}>
                                                <Text family="GRegular" size="semimedium" align="center" color={formData?.parkingType == value ? theme.activetabtext : theme.primarytext}>{value}</Text>
                                            </Pressable>
                                        </>
                                    )
                                })
                            }

                            {/* <Pressable onPress={() => onSelect("Open","parkingType")} style={{
                        paddingHorizontal: 20, borderRadius: 10,
                        paddingVertical: 5, backgroundColor: formData?.parkingType === "Open" ? theme.btnColor : theme.lightGrey
                    }}>
                        <Text align="center" color={formData?.parkingType === "Open" ? theme.activetabtext : theme.primarytext}>Open</Text>
                    </Pressable>
                    <Pressable onPress={() => onSelect("Stilt","parkingType")} style={{
                        paddingHorizontal: 20, borderRadius: 10,
                        paddingVertical: 10, backgroundColor: formData?.parkingType === "Stilt" ? theme.btnColor : theme.lightGrey
                    }}>
                        <Text align="center" color={formData?.parkingType === "Stilt" ? theme.activetabtext : theme.primarytext}>Stilt</Text>
                    </Pressable>
                    <Pressable onPress={() => onSelect("Basement", "parkingType")}
                        style={{
                            paddingHorizontal: 20, borderRadius: 10,
                            paddingVertical: 5, backgroundColor: formData?.parkingType === "Basement" ? theme.btnColor : theme.lightGrey
                        }}>
                        <Text align="center" color={formData?.parkingType === "Basement" ? theme.activetabtext : theme.primarytext}>Basement</Text>
                    </Pressable> */}
                        </View>

                        <Text family="GMedium" size="medium">Fuel Type</Text>
                        <View style={{ flexDirection: 'row', gap: 20 }}>
                            {
                                fuelOptions.map((value) => {
                                    return (
                                        <>
                                            <Pressable onPress={() => onSelect(value, "fuelType")} style={{
                                                paddingHorizontal: 20, borderRadius: 10,
                                                paddingVertical: 5, backgroundColor: formData?.fuelType == value ? theme.btnColor : theme.lightGrey
                                            }}>
                                                <Text family="GRegular" size="semimedium" align="center" color={formData?.fuelType == value ? theme.activetabtext : theme.primarytext}>{value}</Text>
                                            </Pressable>
                                        </>
                                    )
                                })
                            }
                        </View>

                        <Text family="GMedium" size="medium">Transmission Type</Text>
                        <View style={{ flexDirection: 'row', gap: 20 }}>
                            {
                                transmissionOptions.map((value) => {
                                    return (
                                        <>
                                            <Pressable onPress={() => onSelect(value, "transmissionType")} style={{
                                                paddingHorizontal: 20, borderRadius: 10,
                                                paddingVertical: 5, backgroundColor: formData?.transmissionType == value ? theme.btnColor : theme.lightGrey
                                            }}>
                                                <Text family="GRegular" size="semimedium" align="center" color={formData?.transmissionType == value ? theme.activetabtext : theme.primarytext}>{value}</Text>
                                            </Pressable>
                                        </>
                                    )
                                })
                            }
                        </View>

                        <Text family="GMedium" size="medium" >
                            Registration number (E.x: TN59EB8392)
                        </Text>
                        <Input
                            placeholder="Enter Registration number"
                            value={formData?.registrationNo}
                            disabled={(newVehicle?.id && newVehicle?.registrationNo) ? true : false}
                            onChange={(value) => onChange((value?value:"")?.toUpperCase(), "registrationNo")}
                        />
                    </View>

                    <View style={{ marginBottom: 20, }}>
                        <Button title={newVehicle?.id ? "Edit Vehicle" : "Add Vehicle"} onPress={() => onSubmit()} />
                    </View>

                    {/* {(vehicle && !isVehicleAdd) && (
                <View style={{ marginBottom: 20, }}>
                    <Button title="Add Vehicle" onPress={() => { setIsVehicleAdd(true); setVisible(true) }} />
                </View>
            )}
            {isVehicleAdd && <AddVehicle vehicle={vehicle} visible={visible} setVisible={setVisible} />} */}
                </View>
            </ScrollView>

        </KeyboardAvoidingView>



    )
}

export default VehicleParkType;