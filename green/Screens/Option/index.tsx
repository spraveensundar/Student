import React, { useRef, useState } from "react";
import { FlatList, Pressable, ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { dataList, expiryData, optionsData } from "./data";
import TableHeader from "./Head";
import Text from "../../Components/text";
import Mainview from "../../Components/mainview";
import { Colors, Fontsize } from "../../Utilities/uiasset";
import VectorIcons from "../../Utilities/vectoricons";
import { Button, Switch } from "../../Components/Field";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Currencyswitch from "../../Components/currencyswitch";
import { BottomTabParamList } from "../../Navigations/navigationtypes";

import { styles } from "./styles";
import Flexcomponent from "../../Components/flexcomponent";
import Currencyselect from "../../Components/currencyselect";
import { image } from "../../Utilities/images";
import { RFvalue } from "../../Utilities/dimensions";
import OptionList from "./List";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import TradePopupProps from "./TradePoup";
import TradePopup from "./TradePoup";

type Props = NativeStackScreenProps<BottomTabParamList, 'Option'>;

const Option: React.FC<Props> = () => {
    const { theme, bottomsheetref, openbottomsheet, closebottomsheet, navigation } = useCustomHooks();
    const style = styles(theme);


    const [priceDetails, getPriceDetails] = useState("")
    const optionsSheetRef = useRef<BottomSheetModal>(null);
    const expirySheetRef = useRef<BottomSheetModal>(null);

    const [activeindex, setActive] = useState(0);
    const [checked, setChecked] = useState(false);
    const [enabled, setEnabled] = useState(false);



    const [selectedCurrency, setSelectedCurrency] = useState({
        name: "BTC/USDT",
        value: "113,008.80",
    });

    const [selectedExpiry, setSelectedExpiry] = useState({
        date: "03 Sep 25",
        expiresIn: "1D",
    });

    const renderRow = ({ item }: any) => {
        return (
            <View style={style.row}>

                {/* Price */}
                <View style={style.content}>
                    <Pressable onPress={() => { openbottomsheet(bottomsheetref), getPriceDetails(item.price) }} hitSlop={10}>
                        <Text style={style.amount}>{item.price}</Text>
                    </Pressable>
                </View>

                {/* Mark Price */}
                <View style={[style.content]}>
                    <Text style={style.amount}>{item.call}</Text>
                    <View>
                        <View style={style.tableContent}>
                            {
                                enabled == true && (
                                    <View style={style.info}>
                                        <Text style={{ color: Colors.orange }} size="small">ROI</Text>
                                    </View>
                                )
                            }
                            <Text style={{ color: Colors.red }} size="small">{item.callRoi}</Text>
                        </View>
                        {
                            checked == true && (
                                <Text style={style.cell} size="small">IV-45.2655 %</Text>
                            )
                        }
                    </View>
                </View>

                {/* Put Price */}
                <View style={[style.content]}>
                    <Text style={style.amount}>0.000</Text>
                    <View style={style.tableContent}>
                        {
                            enabled == true && (
                                <View style={style.info}>
                                    <Text style={{ color: Colors.orange }} size="small">ROI</Text>
                                </View>
                            )
                        }
                        <Text style={{ color: Colors.red }} size="small">-34.25 %</Text>
                    </View>
                </View>

                {/* If you need add the content  */}
            </View>
        )
    }

    console.log(selectedExpiry, "selectedExpiry")

    return (
        <Mainview
            isheader={false}
            isscollable={false}
            horizontalpadding={0}
            isbottomtab={true}
        >
            <View style={{ marginRight: '6%' }} >
                <Currencyswitch
                    index={activeindex}
                    onchangeindex={(index: number) => setActive(index)}
                />
            </View>

            <View style={{ paddingHorizontal: "6%", flexDirection: "row", justifyContent: "space-between", marginTop: '3%', }}>
                <Currencyselect
                    currency={selectedCurrency.name}
                    descrption={"PERPETUALS"}
                    currencyicon={image.Btcicon}
                    width={"50%"}
                    onselect={() => optionsSheetRef?.current?.present()}
                />

                <Currencyselect
                    currency={selectedExpiry.date}
                    descrption="Expiry section"
                    width={"45%"}
                    onselect={() => expirySheetRef?.current?.present()}
                />
            </View>


            <View style={style.container}>
                <View style={style.checkBoxContainer}>
                    <Pressable style={style.check} onPress={() => setChecked(!checked)}>
                        <Text>Show IV  </Text>
                        <View style={[style.checkInner, { backgroundColor: checked ? Colors.green : "transparent" }]}>
                            {checked && (
                                <VectorIcons
                                    family="Feather"
                                    name="check"
                                    iconcolor={Colors.white}
                                    size={16}
                                />
                            )}
                        </View>
                    </Pressable>
                    <Switch
                        label="Seller mode"
                        value={enabled}
                        onChange={() => setEnabled(!enabled)}
                        labelStyle={{ fontSize: Fontsize.semimedium }}

                    />
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    overScrollMode="never"
                >
                    <FlatList
                        data={dataList}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={renderRow}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.2}
                        bounces={false}
                        overScrollMode="never"
                        stickyHeaderIndices={[0]}
                        ListHeaderComponent={<TableHeader />}
                        onEndReached={() => console.log("load more")}
                    />
                </ScrollView>

                
            </View>
            <View style={style.basket}>
                    <Button
                        title="Create Basket "
                        buttonStyle={style.basketButton}
                        rightContent={
                            <VectorIcons
                                family="Ionicons"
                                name="add"
                                iconcolor={Colors.white}
                                size={18}
                            />
                        }
                        onPress={() => navigation.navigate("CreateBasket")}
                    />
                </View>

            <OptionList
                data={optionsData}
                title={"Options"}
                ref={optionsSheetRef}
                onClose={() => optionsSheetRef.current?.close()}
                onSelect={(item: any) =>
                    setSelectedCurrency({
                        name: item.name,
                        value: item.value,
                    })
                }
                selectedId={optionsData.find(d => d.value === selectedCurrency.value)?.id}
            />

            <OptionList
                data={expiryData}
                title={"Expiry"}
                ref={expirySheetRef}
                onClose={() => expirySheetRef.current?.close()}
                onSelect={(item: any) =>
                    setSelectedExpiry({
                        date: item.date,
                        expiresIn: item.expiresIn,
                    })
                }
                selectedId={expiryData.find(d => d.date === selectedExpiry.date)?.id}
            />

            <TradePopup
                title={`BTC ${priceDetails}`}
                ref={bottomsheetref}
                onClose={() => closebottomsheet(bottomsheetref)}
            />

        </Mainview>
    )

}

export default Option;
