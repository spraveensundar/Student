import React, { useState } from "react";
import { Pressable, View } from "react-native";
import UseModal from "../../../../Components/useModal";
import Text from "../../../../Components/text";
import { windowheight } from "../../../../Utilities/dimensions";
import styles from "./styles";
import useCustomHooks from "../../../../Actions/Hooks/customhook";

type deleteAddressProps = {
    onConfirmDelete: (...args: any[])=>any;
    onHide: (...args: any[])=>any;
};

const DeleteAddress: React.FC<deleteAddressProps> = ({
    onConfirmDelete = () => {}, onHide = () => {},
}) => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const [isDelete, setIsDelete] = useState(false);

    const handlePress = (choice: boolean) => {
        onConfirmDelete();
    };
    return (
        <UseModal
            visible={true}
            setVisible={onHide}
            containerStyle={{
                height: windowheight * 0.25,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                gap: 20
            }}
        >
            <View style={{ gap: 30, flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text family="GMedium" size="xxmedium">Are you sure you want to delete?</Text>
                <View style={{ justifyContent: "space-between", flexDirection: 'row', gap: 25 }}>
                    <Pressable
                        onPress={() => handlePress(true)}
                        style={[
                            style.deleteBtn,
                            { backgroundColor: isDelete ? theme.btnColor : "#FFF" }
                        ]}
                    >
                        <Text family="GMedium" size="medium" color={isDelete ? "#FFF" : theme.btnColor}>
                            Yes
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => onHide()}
                        style={[
                            style.deleteBtn,
                            { backgroundColor: !isDelete ? theme.btnColor : "#FFF" }
                        ]}
                    >
                        <Text family="GMedium" size="medium" color={!isDelete ? "#FFF" : theme.btnColor}>
                            No
                        </Text>
                    </Pressable>
                </View>
            </View>
        </UseModal >
    )
}
export default DeleteAddress;