import React from "react";
import { View, Pressable, Alert } from "react-native";

import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import { Colors } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectoricons";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";

import { styles } from "../styles";

interface HeaderProps {
    onPress?: () => void;
    onleftfun?: () => void
}

const Header: React.FC<HeaderProps> = ({ onPress, onleftfun }) => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme)
    return (
        <View style={style.header}>
            <Pressable onPress={() => navigation.goBack()} style={[style.leftContent]} hitSlop={10}>
                <VectorIcons
                    family="Ionicons"
                    name="chevron-back"
                />
            </Pressable>
            <View style={style.createBasket}>
                <Text style={style.headerText}> Create basket</Text>
            </View>
            <View style={style.rightContent}>
                <Pressable style={style.rowContainer} onPress={onPress}>
                    <Images
                        type="svg"
                        name="Analyze"
                        width={windowwidth * 0.070}
                        height={windowheight * 0.090}
                    />
                    <Text style={{ color: Colors.orange }}> Analyze</Text>
                </Pressable>
            </View>
        </View>

    );
};

export default Header;