import React from "react";
import { View } from "react-native";
import Text from "../../Components/text";
import { Input } from "../../Components/Field";
import useCustomHooks from "../../Actions/Hooks/customhook";

const ChallanNumber: React.FC = () => {
    const { navigation, theme } = useCustomHooks();
    return (
        <View>
            <Input
                label={'Chalan Number'}
                placeholder="Enter Chalan Number"
                placeholderTextColor={theme.placeholderColor}
                bottom={20}
            />
        </View>
    )
}

export default ChallanNumber;