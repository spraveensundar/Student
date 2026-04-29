import React, { useEffect, useRef } from "react";
import { Pressable, View } from "react-native";
import CustomBottomSheet from "../../../../Components/CustomBottomSheet";
import BottomSheet from '@gorhom/bottom-sheet';
import theme from "../../../../Utilities/theme";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import Text from "../../../../Components/text";
import Flexcomponent from "../../../../Components/flexcomponent";
import styles from "./styles";
import Images, { icons } from "../../../../Utilities/images";
import { windowheight, windowwidth } from "../../../../Utilities/dimensions";
import { Button } from "../../../../Components/Field";
import { useRoute } from "@react-navigation/native";
import UseModal from "../../../../Components/useModal";

type vehicleTypeProps = {
    vehicle: boolean;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};


const AddVehicle: React.FC<vehicleTypeProps> = ({ vehicle, visible,
    setVisible, }) => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const bottomsheetref = useRef<BottomSheet>(null);


    useEffect(() => {
        bottomsheetref.current?.expand;
    }, []);

    return (
        <UseModal
            visible={visible}
            setVisible={setVisible}
            containerStyle={{
                height: windowheight * 0.3,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                gap: 20
            }}
        >
            <View style={{ gap: 20 }}>
                <Text family="GMedium" size="semilarge">Select Vehicle</Text>
                <Flexcomponent justifyContent="space-between" style={style.container} paddingHorizontal={20} >
                    <Images type="image" source={icons.Baleno} width={windowwidth * 0.2} height={windowwidth * 0.2} />
                    <View style={{ gap: 10 }}>
                        <Text family="GMedium" size="medium">Hyundai Grand i10</Text>
                        <Pressable style={{ width: windowwidth * 0.15, backgroundColor: "#FF3D3D1A", paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5 }}>
                            <Text family="GMedium" size="tinylarge" color="#FF3D3D">Delete</Text>
                        </Pressable>
                    </View>
                    <View style={{ backgroundColor: "#D9D9D9", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginBottom: '8%' }}>
                        <Text family="GRegular" size="tinylarge">Petrol</Text>
                    </View>
                </Flexcomponent>
                <View >
                    <Button title="Add Vehicle" onPress={() => {
                        !vehicle
                            ? navigation.navigate('AddVehicleType')
                            : navigation.navigate('VehicleManage', { VehicleAdded: true });
                    }}
                    />
                </View>
            </View>
        </UseModal>

    )
}

export default AddVehicle;