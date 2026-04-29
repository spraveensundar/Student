import React from "react";
import { Pressable, View } from "react-native";

import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import Sheet from "../../../Components/bottomsheet";
import { Button } from "../../../Components/Field";
import Flexcomponent from "../../../Components/flexcomponent";
import { Colors, Fontsize } from "../../../Utilities/uiasset";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { RFvalue, windowheight, windowwidth } from "../../../Utilities/dimensions";

import { styles } from "../styles";

interface ConfirmProps {
    ref?: any;
    accountName?: any
    marginMode?: any
    futureTradePair?: any
    wallet?: any
    onChange?: () => void
}

const AccountMargin: React.FC<ConfirmProps> = ({
    ref,
    accountName,
    marginMode,
    futureTradePair,
    wallet,
    onChange
}) => {
    const { theme, closebottomsheet, navigation } = useCustomHooks();
    const style = styles(theme);
    return (
        <Sheet
            sheetref={ref}
            snappoint={["40%"]}
            custominterface={true}
            backgroundStyle={style.sheetContainer}
        >
            <View style={style.sheet}>
                <View style={style.between}>
                    <Text family="semiBold" style={{ color: theme.darktext, fontSize: RFvalue(14) }}>Account Margin</Text>
                    <Pressable onPress={() => { closebottomsheet(ref) }}>
                        <Images
                            type="svg"
                            name={theme.theme === "dark" ? "Bottomclose" : "Bottomclosedark"}
                            width={windowwidth * 0.060}
                            height={windowheight * 0.040}
                        />
                    </Pressable>
                </View>
            </View>
            <View style={{ padding: "5%" }}>
                <Flexcomponent justifyContent="space-between">
                    <Text size="tiny" color={Colors.grey}>Account in Use</Text>
                    <View>
                        <Text size="tiny" color={theme.darktext}>{accountName}</Text>
                    </View>
                </Flexcomponent>
                <View style={{ alignItems: "flex-end" }}>
                    <Button
                        title="Switch"
                        buttonStyle={style.swtich}
                        textStyle={{ fontSize: Fontsize.small }}
                        onPress={() => { closebottomsheet(ref), navigation.navigate("SubAccount") }}
                    />
                </View>
                <View style={style.line} />
                <Flexcomponent justifyContent="space-between" style={{ marginTop: "3%" }}>
                    <Text size="tiny" color={Colors.grey}>Margin Mode</Text>
                    <View>
                        <Text size="tiny" color={theme.darktext} style={{ textTransform: "uppercase" }}>{marginMode}</Text>
                    </View>
                </Flexcomponent>
                <Flexcomponent justifyContent="space-between" style={{ marginTop: "3%" }}>
                    <Text size="tiny" color={Colors.grey}>Available Margin</Text>
                    <View>
                        <Text size="tiny" color={theme.darktext}>{wallet && wallet?.availableBalance?.toFixed(futureTradePair?.quoteDecimal)} {futureTradePair?.quoteCurrency}</Text>
                    </View>
                </Flexcomponent>
                <Button title="Change margin mode" buttonStyle={{ marginTop: "10%" }} onPress={onChange} />
            </View>
        </Sheet>
    )

}

export default AccountMargin;