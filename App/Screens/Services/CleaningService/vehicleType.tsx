import React, { useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import styles from "./styles";
import Text from "../../../Components/text";
import FastImage from "@d11/react-native-fast-image";
import { icons, lotties } from "../../../Utilities/images";
import Lottie from "../../../Components/lottieview";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import { useGetVehicleTypeListQuery } from "../../../Common/redux/vehicleServiceHook";
import { useFocusEffect } from "@react-navigation/native";
import { returnArrayOnly, returnOriginalFile } from "../../../Common/commonFunction";
import { setNewVehicle } from "../../../Common/redux/authSliceReducer";
import { useDispatch, useSelector } from "react-redux";


interface VehicleTypeProps {
    onNext: () => void;
    changeLoadingStatus?: (data: any) => void;
}

const VehicleType: React.FC<VehicleTypeProps> = ({ onNext, changeLoadingStatus }) => {



    const { isLoading, data, refetch } = useGetVehicleTypeListQuery({ page: 1, limit: 10 });
    const dispatch = useDispatch();
    const newVehicle = useSelector((state:any)=>state?.userData?.newVehicle);



    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);



    const [ search, setSearch ] = useState("");



    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            changeLoadingStatus?.({
                overLapLoader: isLoading
            })
        }, [isLoading])
    )

    const vehicleTypeList = returnArrayOnly(data?.data).filter((check) => (
        !search ||
        (search && String(check?.vehicleName)?.toLowerCase()?.includes(search?.toLowerCase()))
    ));

    const onPress = (vehicleTypeDetail: any) => {
        dispatch(
            setNewVehicle({
                ...newVehicle,
                vehicleTypeId: vehicleTypeDetail?._id,
                vehicleTypeDetail: vehicleTypeDetail,
            })
        )
        onNext();
    }

    const onSearch = (value: string) => {
        setSearch(value);
    }

    console.log('vehicleTypeListvehicleTypeList',vehicleTypeList)

    return (

        <View style={{ gap: 8, marginTop: 20, }}>
            <Text family="GMedium" size="semilarge">Choose your vehicle Type</Text>
            {
                vehicleTypeList.map((value)=>{
                    return(
                        <Pressable style={style.vehicleType} onPress={()=>onPress(value)}>
                            <FastImage
                                style={{ width: "80%", height: "85%" }}
                                source={{uri:returnOriginalFile(value?.vehicleImage)}}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                            <Text family="GMedium" size="semilarge">{value?.vehicleName}</Text>
                        </Pressable>
                    )
                })
            }
            

            {/* <FastImage
                    style={style.vehicleImg}
                    source={icons.Bike}
                    resizeMode={FastImage.resizeMode.contain}
                /> */}
            {/* <Pressable style={style.vehicleType}>
                <Lottie
                    src={lotties.bike}
                    style={{ width: "80%", height: "85%", transform: [{ scaleX: -1 }], marginLeft: "15%" }}
                />
                <Text family="GMedium" size="semilarge">Bike</Text>
            </Pressable> */}
        </View>


    )
}

export default VehicleType;