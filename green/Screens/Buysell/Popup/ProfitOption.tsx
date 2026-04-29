import React from "react";
import { Pressable, View } from "react-native";

import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import Sheet from "../../../Components/bottomsheet";
import { Colors } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectoricons";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { RFvalue, windowheight, windowwidth } from "../../../Utilities/dimensions";

import { styles } from "../styles";

interface ConfirmProps {
    ref?: any;
    formData?: any;
    onChange?: any
}

const ProfitOption: React.FC<ConfirmProps> = ({
    ref,
    formData,
    onChange
}) => {
    const { theme, closebottomsheet } = useCustomHooks();
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
                    <Text family="semiBold" style={{ color: theme.darktext, fontSize: RFvalue(14) }}>Select option</Text>
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
                {[{ key: 'makeronly', label: 'Maker Only' },
                { key: 'trailingStop', label: 'Trailing Stop' },
                { key: 'stop_limit', label: 'Stop Limit' },
                { key: 'stop_market', label: 'Stop Market' },
                { key: 'take_profit', label: 'Take Profit Market' },
                { key: 'take_profit_limit', label: 'Take Profit Limit' },
                ].map(({ key, label }) => (
                    <Pressable
                        key={key}
                        style={{ flexDirection: "row", justifyContent: "space-between" }}
                        onPress={() => {
                            onChange(key),
                                closebottomsheet(ref)
                        }}
                    >
                        <Text size="medium" color={theme.darktext} style={[{ marginBottom: "3%" }]}>
                            {label}
                        </Text>
                        {
                            formData?.orderType === key ? (
                                <VectorIcons
                                    family="Feather"
                                    name="check"
                                    iconcolor={Colors.green}
                                    size={windowheight * 0.025}
                                />
                            ) : null
                        }
                    </Pressable>
                ))}
            </View>
        </Sheet>
    )

}

export default ProfitOption;