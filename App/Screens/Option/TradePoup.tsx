import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import useCustomHooks from "../../Actions/Hooks/customhook";

import Text from "../../Components/text";
import Images from "../../Utilities/images";
import Sheet from "../../Components/bottomsheet";
import { RFvalue, windowheight, windowwidth } from "../../Utilities/dimensions";
import { Colors } from "../../Utilities/uiasset";
import { Button } from "../../Components/Field";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

interface TradePopupProps {
    ref?: any;
    data?: any[];
    title?: any;
    onSelect?: (item: any) => void;
    onClose?: () => void;
    selectedId?: any
}

const TradePopup: React.FC<TradePopupProps> = ({
    ref,
    data = [],
    title,
    onClose,

}) => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    return (
        <Sheet
            sheetref={ref}
            custominterface={true}
            snappoint={["60%"]}
        >
            <View style={{ flex: 1 }}>
                <View style={style.container}>
                    <View style={style.bewteen}>
                        <View style={{ flexDirection: "column" }}>
                            <Text family="semiBold" style={{ color: theme.darktext, fontSize: RFvalue(14) }}>{title}</Text>
                            <Text style={{ color: Colors.graytext }}>03 Sep 2025</Text>
                        </View>
                        <Pressable onPress={onClose}>
                            <Images
                                type="svg"
                                name={theme.theme === "dark" ? "Bottomclose" : "Bottomclosedark"}
                                width={windowwidth * 0.060}
                                height={windowheight * 0.040}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={{ padding: "5%", flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Pressable style={{ width: "28%", paddingVertical: "2%", backgroundColor: theme.theme === "dark" ? Colors.white : Colors.black, alignItems: "center", borderRadius: 10 }}>
                            <Text style={{ color: theme.theme === "dark" ? "#111" : "#fff" }}>Call</Text>
                        </Pressable>
                        <Pressable style={{ width: "28%", paddingVertical: "2%", backgroundColor: theme.card, alignItems: "center", borderRadius: 10, marginLeft: "5%", borderWidth: 1, borderColor: theme.theme === "dark" ? "#2F2F2F" : theme.boderColor }}>
                            <Text style={{ color: Colors.graytext }}>Put</Text>
                        </Pressable>
                    </View>

                    <View style={{ marginTop: "5%" }}>
                        <View style={style.bewteen}>
                            <Text style={{ color: Colors.graytext }}>Last Price</Text>
                            <Text style={{ color: theme.darktext }}>520.00 <Text style={{ color: Colors.green }}>(0.87 %)</Text></Text>
                        </View>

                        <View style={[style.bewteen, { marginTop: "3%" }]}>
                            <Text style={{ color: Colors.graytext }}>Market Price / IV</Text>
                            <Text style={{ color: theme.darktext }}>520.00 <Text style={{ color: Colors.green }}>(0.87 %)</Text></Text>
                        </View>

                        <View style={[style.bewteen, { marginTop: "3%" }]}>
                            <Text style={{ color: Colors.graytext }}>Bid Price / Ask Price</Text>
                            <Text style={{ color: theme.darktext }}>520.00 <Text style={{ color: Colors.green }}>(0.87 %)</Text></Text>
                        </View>

                        <View style={[style.bewteen, { marginTop: "3%" }]}>
                            <Text style={{ color: Colors.graytext }}>Open Interest (USDT)</Text>
                            <Text style={{ color: theme.darktext }}>6.95</Text>
                        </View>

                        <View style={[style.bewteen, { marginTop: "3%" }]}>
                            <Text style={{ color: Colors.graytext }}>Delta</Text>
                            <Text style={{ color: theme.darktext }}>0.44</Text>
                        </View>

                        <View style={[style.bewteen, { marginTop: "3%" }]}>
                            <Text style={{ color: Colors.graytext }}>Gamma</Text>
                            <Text style={{ color: theme.darktext }}>0.000175</Text>
                        </View>

                        <View style={[style.bewteen, { marginTop: "3%" }]}>
                            <Text style={{ color: Colors.graytext }}>Theta</Text>
                            <Text style={{ color: theme.darktext }}>-307.63</Text>
                        </View>

                        <View style={[style.bewteen, { marginTop: "3%" }]}>
                            <Text style={{ color: Colors.graytext }}>Vega</Text>
                            <Text style={{ color: theme.darktext }}>19.37 %</Text>
                        </View>

                    </View>

                    <Pressable style={{
                        width: "100%",
                        backgroundColor: Colors.green,
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: "10%",
                    }}
                        onPress={onClose}>
                        <Text family="medium" size={"semimedium"} style={{ color: Colors.white }} >Trade</Text>
                    </Pressable>

                </View>
            </View>

        </Sheet>
    )

}

export default TradePopup;


const styles = (theme: any) => StyleSheet.create({
    container: {
        padding: "4%",
        backgroundColor: theme.bottomheader,
        paddingHorizontal: "6%"
    },
    bewteen: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    content: {
        paddingVertical: "3%",
        paddingHorizontal: "6%"
    },
    select: {
        width: windowwidth * 0.10,
        height: windowwidth * 0.10,
        borderRadius: 100,
        borderColor: theme.theme === "dark" ? "" : theme.boderColor,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
