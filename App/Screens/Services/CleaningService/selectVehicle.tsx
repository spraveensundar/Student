import React, { useCallback, useState } from "react";
import { Pressable, View } from "react-native";

import { Button } from "react-native-elements";
import { useFocusEffect, useRoute } from '@react-navigation/native';
import useCustomHooks from "../../../Actions/Hooks/customhook";
import styles from "./styles";
import Text from "../../../Components/text";
import Images, { icons } from "../../../Utilities/images";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, returnArrayOnly, returnOriginalFile } from "../../../Common/commonFunction";
import { useGetMyVehiclesQuery } from "../../../Common/redux/userHook";
import { setNewCleaningService } from "../../../Common/redux/serviceReducer";
import { stackNavProp } from "../../../Actions/types";
import { constantData } from "../../../Common/constant";
import { ScrollView } from "react-native-gesture-handler";


interface SelectVehicleProps {
    onNext: () => void;
    changeLoadingStatus?: (data: any) => void;
}

const SelectVehicle: React.FC<SelectVehicleProps> = ({ onNext, changeLoadingStatus, }) => {


    const dispatch = useDispatch();
    const newCleaningService: any = useSelector((state: any) => state?.serviceData?.newCleaningService)
    const { data, isLoading, isFetching, refetch } = useGetMyVehiclesQuery({ page: 1, limit: 100 });


    const { theme, navigation } = useCustomHooks();
    const route = useRoute();
    const style = styles(theme);


    const [selectedVehicle, setSelectedVehicle] = useState<any>({})


    const vehicleList = returnArrayOnly(data?.data);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            if (newCleaningService?.vehicleId && newCleaningService?.selectedVehicleDetail) {
                setSelectedVehicle(newCleaningService?.selectedVehicleDetail)
            }
            else {
                if (isEmpty(selectedVehicle)) {
                    setSelectedVehicle(vehicleList?.[0]);
                }
            }
        }, [newCleaningService?.vehicleId, vehicleList])
    );

    useFocusEffect(
        useCallback(() => {
            changeLoadingStatus?.({
                overLapLoader: isLoading
            })
        }, [isLoading])
    )

    console.log('jgfdhfdsf', newCleaningService)

    const selectVehicle = (vehicleData: any) => {
        if (newCleaningService?.from == constantData.packageSubsriptionFrom.renew || newCleaningService?.from == constantData.packageSubsriptionFrom.upgrade) {

        }
        else {
            setSelectedVehicle(vehicleData);
        }
    }

    const addVehicleForSubscription = (navigateTo: any) => {
        dispatch(
            setNewCleaningService({
                vehicleId: selectedVehicle?._id,
                brandId: selectedVehicle?.brandId,
                brandVehicleId: selectedVehicle?.brandVehicleId,
                selectedVehicleDetail: selectedVehicle,
            })
        );
        navigation.navigate(navigateTo);
    }


    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            >
                {
                    vehicleList?.length > 0
                        ?
                        <View style={{ justifyContent: 'space-between', height: '100%', marginTop: 20, }}>
                            <View style={{ flexDirection: 'column', gap: 15, flex: 1 }}>
                                <Text family="GMedium" size="semilarge">Select vehicle</Text>

                                {vehicleList?.map((value) => {
                                    console.log('vehickkk', value)
                                    return (
                                        <>
                                            <Pressable
                                                onPress={() => selectVehicle(value)}
                                            >
                                                <View style={(value?._id == selectedVehicle?._id) ? style.vehicleActive : style.vehicle}>
                                                    <Images
                                                        type="image"
                                                        source={{ uri: returnOriginalFile(value?.brandVehicleDetails?.brandVehicleImage) }}
                                                        style={{ width: "100%", height: "100%" }}
                                                    />
                                                    <Text family="GMedium" size="semilarge">{value?.brandVehicleDetails?.vehicleBodyType} - {value?.registrationNo}</Text>
                                                </View>
                                            </Pressable>
                                        </>
                                    )
                                })}

                            </  View>
                        </View>
                        :
                        <View style={{
                            flex: 1, justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Text family="GMedium" size="semilarge">No vehicles to display. Add vehicle</Text>
                        </View>
                }

                
            </ScrollView>
            <View>
                {
                    (newCleaningService?.from == constantData?.packageSubsriptionFrom.renew || newCleaningService?.from == constantData.packageSubsriptionFrom.upgrade)
                        ?
                        <></>
                        :
                        <View >
                            <Button title="Add vehicle" buttonStyle={style.button} onPress={() => onNext()} />
                        </View>
                }

                {
                    vehicleList?.length > 0
                        ?
                        <View style={{ marginBottom: "5%", }}>
                            {
                                newCleaningService?.serviceType === constantData.subscriptionType.subscribe
                                    ?
                                    <Button title="View Subscription" buttonStyle={style.button} onPress={() => addVehicleForSubscription("Subscription")} />
                                    :
                                    <Button title="View Plans" buttonStyle={style.button} onPress={() => addVehicleForSubscription("OnTimeClean")} />
                            }
                        </View>
                        :
                        <></>
                }

            </View>
        </View>

    )
}

export default SelectVehicle;