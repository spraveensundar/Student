import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import Text from "../../Components/text";
import { Colors } from "../../Utilities/uiasset";

interface DescriptionProps {
    title?: string;
    content?: string;
    containerStyle?: StyleProp<ViewStyle>
}

const Description: React.FC<DescriptionProps> = ({
    title,
    content,
    containerStyle
}) => {
    return (
        <View style={containerStyle}>
            {
                title && (
                    <Text size="medium">{title}</Text>
                )
            }
            {
                content && (
                    <Text style={{ color: Colors.warmgrey, marginTop: "3%" }}>{content}</Text>
                )
            }
        </View>
    )

}

export default Description;