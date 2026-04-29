import React from "react";
import { View, StyleProp, ViewStyle, TextStyle } from "react-native";

import Text from "../../Components/text";
import useCustomHooks from "../../Actions/Hooks/customhook";

import { styles } from "./styles";

interface TableHeaderProps {
    containerStyle?: StyleProp<ViewStyle>;
    cellStyle?: StyleProp<TextStyle>;
    currencyStyle?: StyleProp<TextStyle>;
}

const TableHeader: React.FC<TableHeaderProps> = ({ }) => {
    const { theme } = useCustomHooks();
    const style = styles(theme)
    return (
        <View style={style.headerContainer}>

            <View style={style.content}>
                <Text style={style.cell}>Price / OI</Text>
                <Text style={style.currency}>(INR)</Text>
            </View>

            <View style={style.content}>
                <Text style={style.cell}>Call Mark Price</Text>
                <Text style={style.currency}>(INR)</Text>
            </View>

            <View style={style.content}>
                <Text style={style.cell}>Put Mark Price</Text>
                <Text style={style.currency}>(INR)</Text>
            </View>

            {/* If you need add the content*/}

        </View>
    );
};

export default TableHeader;