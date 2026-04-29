import React from "react";
import { View } from "react-native";
import { Input } from "../../Components/Field";
import useCustomHooks from "../../Actions/Hooks/customhook";

const VehicleNumber: React.FC = () => {
    const { navigation, theme } = useCustomHooks();
    return (
        <View>
            <Input
                label={'Vehicle Number'}
                placeholder="Enter Vehicle Number"
                placeholderTextColor={theme.placeholderColor}
                bottom={20}
            />
            <Input
                label={'Chase Number (last 5 Digit )'}
                placeholder="Enter Chase Number"
                placeholderTextColor={theme.placeholderColor}
                bottom={20}
            />
            <Input
                label={'Engine Number (last 5 Digit )'}
                placeholder="Enter Engine Number"
                placeholderTextColor={theme.placeholderColor}
                bottom={20}
            />
        </View>
    )
}

export default VehicleNumber;