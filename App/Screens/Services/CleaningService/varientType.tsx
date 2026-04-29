import React, { useCallback, useState } from "react";
import { Pressable, TextInput, View, ScrollView } from "react-native";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import styles from "./styles";
import Images, { icons } from "../../../Utilities/images";
import Text from "../../../Components/text";
import Flexcomponent from "../../../Components/flexcomponent";
import VectorIcons from "../../../Utilities/vectorIcons";
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions";
import { Colors } from "../../../Utilities/uiasset";
import { useGetBrandsVehicleListQuery } from "../../../Common/redux/vehicleServiceHook";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { returnArrayOnly, returnOriginalFile } from "../../../Common/commonFunction";
import { setNewVehicle } from "../../../Common/redux/authSliceReducer";



interface VarientTypeProps {
    onNext: () => void;
    changeLoadingStatus?: (data: any) => void;
}

const VarientType: React.FC<VarientTypeProps> = ({ onNext, changeLoadingStatus }) => {



    const newVehicle: any = useSelector((state: any) => state?.userData?.newVehicle);
    const { data, isLoading, refetch } = useGetBrandsVehicleListQuery({
        page: 1,
        limit: 50,
        brandId: newVehicle?.brandId,
    });
    const dispatch = useDispatch();



    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);



    const [search, setSearch] = useState("");



    const varientType = [
        { img: icons.Baleno, name: "Baleno" },
        { img: icons.Swift, name: "Swift" },
        { img: icons.Dzire, name: "Dzire" },
        { img: icons.Alto, name: "Alto" },
        { img: icons.SCross, name: "S Cross" },
        { img: icons.Ertiga, name: "Ertiga" },
        { img: icons.XL6, name: "XL6" },
        { img: icons.Jimmy, name: "Jimmy" },
        { img: icons.Invicto, name: "Invicto" },
        { img: icons.Omni, name: "Omni" },
        { img: icons.Gypsy, name: "Gypsy" },
        { img: icons.SX4, name: "SX4" },
    ];

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [newVehicle?.brandId])
    )

    useFocusEffect(
            useCallback(()=>{
                changeLoadingStatus?.({
                    overLapLoader: isLoading
                })
            },[isLoading])
        )

    const brandVehicleList = returnArrayOnly(data?.data).filter((check) => (
        !search ||
        (search && check?.brandVehicleName?.toLowerCase()?.includes(search?.toLowerCase()))
    ));

    console.log('brandVehicleListbrandVehicleList', data, brandVehicleList)

    const onPress = (brandVehicleDetail: any) => {
        dispatch(
            setNewVehicle({
                ...newVehicle,
                brandVehicleId: brandVehicleDetail?._id,
                brandVehicleDetail: brandVehicleDetail,
            })
        )
        onNext();
    }

    const onSearch = (value: string) => {
        setSearch(value);
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 20, }}>
                <Text family="GMedium" size="semilarge">Choose your varient type</Text>
                <Flexcomponent paddingHorizontal={"5%"} justifyContent="flex-start" style={{ width: "100%", height: windowheight * 0.05, marginTop: "2.5%", borderRadius: borderradius * 3, alignSelf: "center" }} >
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
                        onChangeText={(e) => onSearch(e)}
                    />
                </Flexcomponent>
                <View style={style.vehicleContainer}>
                    {/* {varientType.map((type, index) => (
                        <Pressable key={index} style={style.vehicleBrand} onPress={onNext}>
                            <Images type="image" source={type.img} style={{ width: "100%", height: "100%" }} />
                            <Text family="GMedium" size="semimedium">{type.name}</Text>
                        </Pressable>
                    ))} */}

                    {brandVehicleList.map((value: any, index) => (
                        <Pressable key={index} style={style.vehicleBrand} onPress={() => onPress(value)}>
                            <Images type="image" source={{ uri: returnOriginalFile(value?.brandVehicleImage) }} style={{ width: "100%", height: "100%" }} />
                            <Text family="GMedium" size="semimedium">{value.brandVehicleName}</Text>
                        </Pressable>
                    ))}

                </View>
            </View>
        </ScrollView>
    )
}

export default VarientType;