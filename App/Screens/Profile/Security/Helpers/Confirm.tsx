import React from "react";
import { Pressable, View } from "react-native";

import Text from "../../../../Components/text";
import Sheet from "../../../../Components/bottomsheet";
import { Colors } from "../../../../Utilities/uiasset";
import useCustomHooks from "../../../../Actions/Hooks/customhook";

import { styles } from "../../styles";

interface ConfirmProps {
    ref?: any;
    title?: any;
    description?: string;
    cancel?: () => void,
    confirm?: () => void
}

const Confirm: React.FC<ConfirmProps> = ({
    ref,
    title,
    description,
    cancel,
    confirm

}) => {
    const { theme } = useCustomHooks();
    const style = styles(theme);

    return (
        <Sheet
            custominterface={true}
            sheetref={ref}
            snappoint={["33%"]}
            backgroundStyle={style.sheet}
        >
            <View style={{ padding: "5%" }}>
                <Text size="medium" style={{ color: theme.darktext }}>{title}</Text>
                <Text style={{ color: Colors.grey, marginTop: "3%" }}>{description}</Text>
                <View style={[style.row, { marginTop: "10%" }]}>
                    <Pressable style={style.changeButton} onPress={cancel}>
                        <Text family="medium" size={"semimedium"} style={[{ color: Colors.white }]}>Cancel</Text>
                    </Pressable>
                    <Pressable style={[style.changeButton, { backgroundColor: Colors.green, marginLeft: "4%" }]} onPress={confirm}>
                        <Text family="medium" size={"semimedium"} style={[{ color: Colors.white }]}>Continue</Text>
                    </Pressable>
                </View>
            </View>
        </Sheet>
    )

}

export default Confirm;