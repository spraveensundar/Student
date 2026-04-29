import React from "react";
import { Pressable, View } from "react-native";

import Text from "../../../../Components/text";
import Card from "../../../../Components/Card";
import Images from "../../../../Utilities/images";
import { windowwidth } from "../../../../Utilities/dimensions";
import useCustomHooks from "../../../../Actions/Hooks/customhook";

import { styles } from "../../styles";

interface EditCardProps {
    value?: any;
    text?: string;
    onPress?: () => void
}

const EditCard: React.FC<EditCardProps> = ({
    value,
    text,
    onPress
}) => {
    const { theme } = useCustomHooks();
    const style = styles(theme);

    return (
        <Card containerStyle={style.edit}>
            <View style={{ width: "80%" }}>
                <Text>{value}</Text>
                <Text style={{ paddingTop: "2%", color: theme.secondarytext }}>{text}</Text>
            </View>
            <Pressable onPress={onPress}>
                {
                    theme.theme === "dark" ?
                        <Images
                            type="svg"
                            name="Pen"
                            width={windowwidth * 0.06}
                        />
                        :
                        <Images
                            type="svg"
                            name="PenDark"
                            width={windowwidth * 0.06}
                        />
                }

            </Pressable>
        </Card>
    )

}

export default EditCard;