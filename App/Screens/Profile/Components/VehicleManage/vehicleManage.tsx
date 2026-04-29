import React, { useCallback, useState } from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { Pressable, View } from "react-native";
import Text from "../../../../Components/text";
import Flexcomponent from "../../../../Components/flexcomponent";
import Images, { icons } from "../../../../Utilities/images";
import { windowwidth } from "../../../../Utilities/dimensions";
import styles from "./styles";
import { Button } from "../../../../Components/Field";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import VehicleParkType from "./vehicleParkType";
import AddVehicle from "./addVehicle";
import { useLazyGetMyVehiclesQuery } from "../../../../Common/redux/userHook";
import { confirmAlert, returnOriginalFile, toastFn } from "../../../../Common/commonFunction";
import { deleteUserVehicle } from "../../../../Common/axiosHooks/userHooks";
import { setNewVehicle } from "../../../../Common/redux/authSliceReducer";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../../../Navigations/stacknavigationtypes";

interface vehicleTypeProps {
    VehicleAdded: boolean;
}
type Props = NativeStackScreenProps<Stacknavigationtypes, 'VehicleManage'>;


const VehicleManage: React.FC<Props> = ({ route }) => {


    const [trigger, { data, isFetching }] = useLazyGetMyVehiclesQuery();
    const dispatch = useDispatch();
    const newVehicle: any = useSelector((state: any) => state?.userData?.newVehicle);

    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);



    const [isVehicleAdd, setIsVehicleAdd] = useState(false);
    const [visible, setVisible] = useState(false);
    const [disableStatus, setDisableStatus] = useState(false);



    useFocusEffect(
        useCallback(() => {
            trigger({ page: 1, limit: 100 });
        }, [])
    )

    console.log('hiiiiiii', isFetching, data)


    const vehicleList = data?.data;

    console.log('vehicleListvehicleList', data, vehicleList)

    const onDelete = async (vehicleDetail: any) => {
        setDisableStatus(true);
        confirmAlert(
            "Do you want to delete this?",
            () => deleteFunction(vehicleDetail),
            () => { setDisableStatus(false); }
        )
        async function deleteFunction(vehicleDetail: any) {
            let sendData = {
                vehicleId: vehicleDetail?._id
            }
            let resp = await deleteUserVehicle(sendData);
            if (resp?.status) {
                toastFn(resp?.message ?? "Vehicle deleted")
                trigger({ page: 1, limit: 100 });
            }
            else {
                toastFn(resp?.message ?? "Try-Again");
            }
            setDisableStatus(false)
        }
    }

    const onEditClick = (vehicleDetail: any) => {
        console.log('editttt', vehicleDetail)
        dispatch(
            setNewVehicle({
                vehicleTypeId: vehicleDetail?.vehicleTypeId,
                vehicleTypeDetail: vehicleDetail?.vehicleTypeDetails,
                brandId: vehicleDetail?.brandId,
                brandDetail: vehicleDetail?.brandDetails,
                brandVehicleId: vehicleDetail?.brandVehicleId,
                brandVehicleDetail: vehicleDetail?.brandVehicleDetails,
                fuelType: vehicleDetail?.fuelType,
                transmissionType: vehicleDetail?.transmissionType,
                parkingType: vehicleDetail?.parkingType,
                registrationNo: vehicleDetail?.registrationNo,
                id: vehicleDetail?._id,
            })
        )
        navigation.navigate("AddVehicleType");
    }

    console.log('newVehiclenewVehicle', newVehicle)

    return (
        <Mainview
            isheader={true}
            headertitle="Manage your vehicle"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                (
                    <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                        <Button
                            disabled={disableStatus}
                            title="Add Vehicle"
                            onPress={() => {
                                navigation.navigate("AddVehicleType");
                                // if (VehicleAdded) {
                                //     navigation.navigate("AddVehicleType", { chooseType: true });
                                // } else {
                                //     setIsVehicleAdd(true);
                                //     setVisible(true);
                                // }
                            }}
                        />
                    </View>
                )
            }

        >

            <View style={{ marginTop: "5%", gap: 20 }}>
                <Text family="GMedium" size="semilarge">My Vehicle</Text>
                {
                    vehicleList?.length > 0
                        ?
                        <>
                            {
                                vehicleList?.map((value: any) => {
                                    console.log('valuevalue', value)
                                    return (
                                        <>

                                            <Flexcomponent justifyContent="space-between" style={style.container} paddingHorizontal={20} paddingVertical={10} >
                                                <Pressable
                                                    onPress={() => onEditClick(value)}
                                                >
                                                    <Images type="image" source={{ uri: returnOriginalFile(value?.brandVehicleDetails?.brandVehicleImage) }} width={windowwidth * 0.2} height={windowwidth * 0.2} />
                                                </Pressable>

                                                <View style={{ gap: 10 }}>
                                                    <Pressable
                                                        onPress={() => onEditClick(value)}
                                                    >

                                                        <Text family="GMedium" size="medium">{value?.brandVehicleDetails?.brandName} {value?.brandVehicleDetails?.brandVehicleName}</Text>
                                                        <Text family="GMedium" size="medium">RegNo: {value?.registrationNo}</Text>
                                                    </Pressable>

                                                    <Pressable
                                                        disabled={disableStatus}
                                                        style={{ width: windowwidth * 0.15, backgroundColor: "#FF3D3D1A", paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5 }}
                                                        onPress={() => onDelete(value)}
                                                    >
                                                        <Text family="GMedium" size="tinylarge" color="#FF3D3D">Delete</Text>
                                                    </Pressable>
                                                </View>
                                                <View style={{ backgroundColor: "#D9D9D9", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginBottom: '8%' }}>
                                                    <Text family="GRegular" size="tinylarge">{value?.fuelType}</Text>
                                                </View>
                                            </Flexcomponent>
                                        </>
                                    )
                                })
                            }
                        </>
                        :
                        <>
                            <Flexcomponent justifyContent="space-between" style={style.container} paddingVertical={15} paddingHorizontal={20} >
                                <Text family="GRegular" size="medium">
                                    No Vehicles
                                </Text>
                            </Flexcomponent>
                        </>
                }

            </View>


            {/* {
            
            !isVehicleAdd
            ? 
            (
                <View style={{ marginTop: "5%", gap: 20 }}>
                    <Text family="GMedium" size="semilarge">My Vehicle</Text>
                    {
                        vehicleList?.length > 0
                            ?
                            <>
                                {
                                    vehicleList?.map((value:any) => {
                                        console.log('valuevalue',value)
                                        return (
                                            <>
                                            
                                                <Flexcomponent justifyContent="space-between" style={style.container} paddingHorizontal={20} >
                                                    <Pressable
                                                        onPress={() => onEditClick(value)}
                                                    >
                                                        <Images type="image" source={{ uri: returnOriginalFile(value?.brandVehicleDetails?.brandVehicleImage) }} width={windowwidth * 0.2} height={windowwidth * 0.2} />
                                                    </Pressable>

                                                    <View style={{ gap: 10 }}>
                                                        <Pressable
                                                            onPress={() => onEditClick(value)}
                                                        >

                                                            <Text family="GMedium" size="medium">{value?.brandVehicleDetails?.brandName} {value?.brandVehicleDetails?.brandVehicleName}</Text>
                                                        </Pressable>

                                                        <Pressable
                                                            disabled={disableStatus}
                                                            style={{ width: windowwidth * 0.15, backgroundColor: "#FF3D3D1A", paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5 }}
                                                            onPress={() => onDelete(value)}
                                                        >
                                                            <Text family="GMedium" size="tinylarge" color="#FF3D3D">Delete</Text>
                                                        </Pressable>
                                                    </View>
                                                    <View style={{ backgroundColor: "#D9D9D9", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginBottom: '8%' }}>
                                                        <Text family="GRegular" size="tinylarge">{value?.fuelType}</Text>
                                                    </View>
                                                </Flexcomponent>
                                            </>
                                        )
                                    })
                                }
                            </>
                            :
                            <>
                                <Flexcomponent justifyContent="space-between" style={style.container} paddingHorizontal={20} >
                                    <Text>
                                        No Vehicles
                                    </Text>
                                </Flexcomponent>
                            </>
                    }
                    
                    {VehicleAdded &&
                        <Flexcomponent justifyContent="space-between" style={style.container} paddingHorizontal={20} >
                            <Images type="image" source={icons.Swift} width={windowwidth * 0.2} height={windowwidth * 0.2} />
                            <View style={{ gap: 10 }}>
                                <Text family="GMedium" size="medium">Maruti Swift</Text>
                                <Pressable style={{ width: windowwidth * 0.15, backgroundColor: "#FF3D3D1A", paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5 }}>
                                    <Text family="GMedium" size="tinylarge" color="#FF3D3D">Delete</Text>
                                </Pressable>
                            </View>
                            <View style={{ backgroundColor: "#D9D9D9", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginBottom: '8%' }}>
                                <Text family="GRegular" size="tinylarge">Petrol</Text>
                            </View>
                        </Flexcomponent>
                    }
                </View>
            )
            :
            (
                    <View style={{ flex: 1 }}>
                        <VehicleParkType vehicle={VehicleAdded} />
                        <AddVehicle vehicle={VehicleAdded} visible={visible} setVisible={setVisible} />
                    </View>
                )
            } */}


        </Mainview >
    )
}

export default VehicleManage;