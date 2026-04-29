import React from "react";
import { View } from "react-native";
import UseModal from "../../../Components/useModal";
import { windowheight } from "../../../Utilities/dimensions";
import TimeSlot from "../WatchActivity/timeSlot";
import { Button } from "../../../Components/Field";
import useCustomHooks from "../../../Actions/Hooks/customhook";

interface rescheduleProps {
    visible: boolean;
    setVisible: ((v: boolean) => void);
}

const RescheduleOrder: React.FC<rescheduleProps> = ({
    visible,
    setVisible,
}) => {
    const { theme, navigation } = useCustomHooks();
    return (
        <UseModal
            visible={visible}
            setVisible={setVisible}
            containerStyle={{
                height: windowheight * 0.55,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                gap: 20
            }}
        >
            <TimeSlot />
            <View>
                <Button title="Update" onPress={() => navigation.navigate("RescheduleUpdate")} />
            </View>
        </UseModal>
    )
}

export default RescheduleOrder;