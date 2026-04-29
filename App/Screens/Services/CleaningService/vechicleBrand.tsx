import React, { useCallback, useState } from "react";
import { Pressable, TextInput, View, ScrollView } from "react-native";
import Images, { icons } from "../../../Utilities/images";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import styles from "./styles";
import Text from "../../../Components/text";
import Flexcomponent from "../../../Components/flexcomponent";
import VectorIcons from "../../../Utilities/vectorIcons";
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions";
import { Colors } from "../../../Utilities/uiasset";
import { useGetBrandsListQuery } from "../../../Common/redux/vehicleServiceHook";
import { useFocusEffect } from "@react-navigation/native";
import { returnArrayOnly, returnOriginalFile } from "../../../Common/commonFunction";
import { useDispatch, useSelector } from "react-redux";
import { setNewVehicle } from "../../../Common/redux/authSliceReducer";


interface VechicleBrandProps {
    onNext: () => void;
    changeLoadingStatus?: (data: any) => void;
}

const VechicleBrand: React.FC<VechicleBrandProps> = ({ onNext, changeLoadingStatus }) => {



    const dispatch = useDispatch();
    const newVehicle = useSelector((state: any) => state?.userData?.newVehicle);
    const { data, isLoading, refetch } = useGetBrandsListQuery({ page: 1, limit: 50, vehicleTypeId: newVehicle?.vehicleTypeId });



    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);



    const [search, setSearch] = useState("");


    const vehicleBrand = [
        icons.Suzuki,
        icons.Hyundai,
        icons.Honda,
        icons.Toyota,
        icons.Nissan,
        icons.MG,
        icons.BMW,
        icons.Skoda,
        icons.Audi,
        icons.Volvo,
        icons.Mini,
        icons.Wolves
    ];


    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [newVehicle?.vehicleTypeId])
    )

    useFocusEffect(
        useCallback(() => {
            changeLoadingStatus?.({
                overLapLoader: isLoading
            })
        }, [isLoading])
    )

    const brandList = returnArrayOnly(data?.data).filter((check) => (
        !search ||
        (search && check?.brandName?.toLowerCase()?.includes(search?.toLowerCase()))
    ));

    const onPress = (brandDetail: any) => {
        dispatch(
            setNewVehicle({
                ...newVehicle,
                brandId: brandDetail?._id,
                brandDetail: brandDetail,
            })
        )
        onNext();
    }

    const onSearch = (value: string) => {
        setSearch(value);
    }


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
                brandList?.length === 0
                    ? { flexGrow: 1 }
                    : undefined
            }
        >
            <View style={{ marginTop: 20, flex: 1 }}>
                <Text family="GMedium" size="semilarge">Choose your make type</Text>
                <Flexcomponent paddingHorizontal={"5%"} justifyContent="flex-start" style={{ width: "100%", height: windowheight * 0.05, backgroundColor: theme.card, marginTop: "2.5%", borderRadius: borderradius * 3, alignSelf: "center" }} >
                    <VectorIcons
                        family="Feather"
                        name={"search"}
                        size={windowwidth * 0.045}
                        style={{ backgroundColor: theme.lightGrey }}
                    />
                    <TextInput
                        placeholder="Search vehicle"
                        style={{ flex: 1, paddingHorizontal: "2.5%" }}
                        placeholderTextColor={Colors.lightGreyy}
                        onChangeText={(e) => onSearch((e ?? ""))}
                    />
                </Flexcomponent>

                {/* {vehicleBrand.map((icon, index) => (
                        <Pressable key={index} style={style.vehicleBrand} onPress={onNext}>
                            <Images type="image" source={icon} style={{ width: "100%", height: "100%" }} />
                        </Pressable>
                    ))} */}
                {
                    brandList?.length > 0
                        ?
                        <View style={style.vehicleContainer}>
                            {
                                brandList.map((brandData: any, index: number) => (
                                    <Pressable key={index} style={style.vehicleBrand} onPress={() => onPress(brandData)}>
                                        <Images type="image" source={{ uri: returnOriginalFile(brandData?.brandImage) }} style={{ width: "100%", height: "100%" }} />
                                        <Text>{brandData?.brandName ?? ""}</Text>
                                    </Pressable>
                                ))
                            }
                        </View>
                        :
                        <Pressable style={{
                            flex: 1, justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Text family="GMedium" size="semilarge">No brand to display</Text>
                        </Pressable>
                }

            </View>

        </ScrollView>





    )
}

export default VechicleBrand;