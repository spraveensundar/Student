import React from "react";
import { Pressable, View } from "react-native";

import Text from "../../../../Components/text";

interface TabHeaderprops {
    theme?: any
    tabs?: any
    style?: any,
    activeindex?: any,
    onchangeindex?: any
}

const TabHeader: React.FC<TabHeaderprops> = ({
    theme,
    tabs = [],
    style,
    activeindex,
    onchangeindex
}) => {
    return (
        <View style={[style.between, { marginBottom: "4%" }]}>
            {
                tabs?.map((e: any, i: any) => {
                    const value = i === 0 ? "isolated" : "cross";
                    return (
                        <Pressable onPress={() => onchangeindex(value)} style={[activeindex == value ? style.marginActive : style.margin]}>
                            <Text size="small" style={{ color: theme.darktext }}>{e}</Text>
                        </Pressable>
                    )
                })
            }
        </View>
    )

}

export default TabHeader;