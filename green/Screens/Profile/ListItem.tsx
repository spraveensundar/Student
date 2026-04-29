import React from "react";
import { Pressable, View } from "react-native";

import Card from "../../Components/Card";
import Text from "../../Components/text";
import Images from "../../Utilities/images";
import { Colors } from "../../Utilities/uiasset";
import VectorIcons from "../../Utilities/vectoricons";
import useCustomHooks from "../../Actions/Hooks/customhook";

import { styles } from "./styles";
import { windowwidth } from "../../Utilities/dimensions";

interface ListItemProps {
    icon?: any;
    title: string;
    iconWidth?: number;
    iconHeight?: number;
    onPress?: () => void;
    rightContent?: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({
    icon = false,
    title,
    iconWidth = windowwidth * 0.065,
    iconHeight = windowwidth * 0.065,
    onPress,
    rightContent,
}) => {

    const { theme } = useCustomHooks();
    const style = styles(theme)
    return (
        <Pressable onPress={onPress}>
            <Card containerStyle={[style.profileContainer, icon ? { padding: "2%" } : { padding: "3%" }]}>
                <View style={style.row}>
                    {
                        icon && (
                            <View style={style.img}>
                                <Images
                                    type="image"
                                    source={icon}
                                    width={iconWidth}
                                    height={iconHeight}
                                    style={{ marginRight: "10%" }}
                                />
                            </View>
                        )
                    }
                    <View style={[icon ? style.profileTitle : style.title]}>
                        <Text family="medium">{title}</Text>
                    </View>
                </View>
                {
                    rightContent ?? (
                        <VectorIcons
                            family="Ionicons"
                            name="chevron-forward"
                            iconcolor={Colors.warmgrey}
                            size={18}
                        />
                    )
                }
            </Card>
        </Pressable>
    );
};

export default ListItem;
