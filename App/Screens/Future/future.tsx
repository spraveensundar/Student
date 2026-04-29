import React, { useEffect, useState } from "react"
import Mainview from "../../Components/mainview"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../../Navigations/navigationtypes";
import { Pressable, ScrollView, View } from "react-native";
import SegmentedControl from "../../Components/segemental";
import { borderradius, RFvalue, windowheight, windowwidth } from "../../Utilities/dimensions";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Currencyswitch from "../../Components/currencyswitch";
import Currencyselect from "../../Components/currencyselect";
import { image } from "../../Utilities/images";
import Flexcomponent from "../../Components/flexcomponent";
import Text from "../../Components/text";
import { style } from "./style";
import { Colors, Fontfamily, Fontsize } from "../../Utilities/uiasset";
import { Button } from "../../Components/Field";
import Chart from "./chart";
import Bookcomponent from "./book";
import Tradecomponent from "./tradecomponent";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { helperSelector } from "../../Slices/helper";
import { setFutureTicker, setTradePairData } from "../../Slices/future";
import { getItem, setItem } from "../../Actions/Storage/localstorage";
import { isEmpty } from "lodash";
import { getTokenImage } from "../../Utilities/helerfunction";

type Props = NativeStackScreenProps<BottomTabParamList, 'Future'>;

const Future: React.FC<Props> = () => {




    const [activeindex, setActive] = useState(0)
    const { theme, navigation, dispatch } = useCustomHooks()
    const styles = style(theme)
    const { futureTicker } = useSelector((state: any) => state.future);
    
    const tab = [
        {
            title: "Chart",

        },
        {
            title: "Order Book",

        },
        {
            title: "Recent Trades",

        },
    ]

    const [tabindex, setTabindex] = useState(0)
    const { futureparams } = useSelector(helperSelector)

    useEffect(() => {
        if (futureparams == "trade") {
            setTabindex(1)
        }
    }, [futureparams])

    return (
        <Mainview
            isheader={false}
            isbottomtab={true}
            isscollable={false}
            horizontalpadding={"4%"}
        >
            <View style={{ flex: 0.275 }} >
                <Currencyswitch
                    index={activeindex}
                    onchangeindex={(index: number) => setActive(index)}
                />
                <Flexcomponent alignItems="center" >
                    <Currencyselect
                        currency={futureTicker?.tickerRoot}
                        descrption="PERPETUALS"
                        currencyicon={getTokenImage(futureTicker?.tickerRoot)}
                        onselect={() => navigation.navigate("Market")}
                    />
                    <View style={{ width: "50%", justifyContent: "center", alignItems: "flex-end", }} >
                        <Text style={{ textAlign: "center" }} color={theme.secondarytext} fontSize={RFvalue(13)} family="medium" >Up to 100x Leverage</Text>
                    </View>
                </Flexcomponent>

                <Flexcomponent justifyContent="space-between" style={{ marginTop: "2.5%", borderRadius: borderradius * 0.5, width: "100%" }} paddingHorizontal={"2%"} height={windowheight * 0.09} bakgroundcolor={theme.card}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ width: "100%" }}
                        contentContainerStyle={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
                    >
                        <View style={[styles.pricecontainer,]} >
                            <Text fontSize={RFvalue(12.5)} family="medium" numoflines={1} color={Colors.red} >{futureTicker?.marketPrice}</Text>
                            <Text fontSize={RFvalue(10.5)} numoflines={1} color={theme.textNobel} >{futureTicker?.marketPrice}</Text>
                        </View>
                        {/* <View style={[styles.pricecontainer,]} >
                            <Text fontSize={RFvalue(11.5)} numoflines={1} color={theme.secondarytext} >MARK PRICE</Text>
                            <Text fontSize={RFvalue(11.5)} numoflines={1} color={theme.futuretext} >{futureTicker.marketPrice}</Text>
                        </View> */}
                        <View style={[styles.pricecontainer,]} >
                            <Text fontSize={RFvalue(11.5)} numoflines={1} color={theme.secondarytext} >24h CHANGE</Text>
                            <Text fontSize={RFvalue(11.5)} numoflines={1} color={theme.homegreen} >{futureTicker?.changePrice} ( {futureTicker?.percent24Change}%)</Text>
                        </View>
                        <View style={[styles.pricecontainer,]} >
                            <Text fontSize={RFvalue(11.5)} numoflines={1} color={theme.secondarytext} >24h High</Text>
                            <Text fontSize={RFvalue(11.5)} numoflines={1} color={theme.futuretext}  >{futureTicker?.high} ( {futureTicker?.percent24High}%)</Text>
                        </View>
                        <View style={[styles.pricecontainer]} >
                            <Text fontSize={RFvalue(11.5)} numoflines={1} color={theme.secondarytext} >24h Low</Text>
                            <Text fontSize={RFvalue(11.5)} numoflines={1} color={theme.futuretext}  >{futureTicker?.low}</Text>
                        </View>
                        <View style={[styles.pricecontainer]} >
                            <Text fontSize={RFvalue(11.5)} numoflines={1} color={theme.secondarytext} >24h Volume  ({futureTicker?.baseCurrency})</Text>
                            <Text fontSize={RFvalue(11.5)} numoflines={1} color={theme.futuretext}  >{futureTicker?.volume}</Text>
                        </View>
                        <View style={[styles.pricecontainer]} >
                            <Text fontSize={RFvalue(11.5)} numoflines={1} color={theme.secondarytext} >24h Volume ({futureTicker?.quoteCurrency})</Text>
                            <Text fontSize={RFvalue(11.5)} numoflines={1} color={theme.futuretext}  >{futureTicker?.deal}</Text>
                        </View>
                    </ScrollView>
                </Flexcomponent>
            </View>

            <View style={{ flex: 0.65, paddingTop: "2.5%", }} >
                <Flexcomponent justifyContent="space-between" style={{ flex: 0.08 }} >
                    {tab?.map((e, i) => (
                        <Pressable onPress={() => setTabindex(i)} style={i == tabindex ? styles.activetab : styles.inactivetab} >
                            <Text family={i == tabindex ? "bold" : "regular"} fontSize={Fontsize.semimedium} color={i == tabindex ? theme.activetabtext : theme.futuretext} >{e?.title}</Text>
                        </Pressable>
                    ))}
                </Flexcomponent>

                <View style={{ flex: 0.91 }} >
                    {
                        tabindex == 0 && (
                            <Chart />
                        )
                    }
                    {
                        tabindex == 1 && (
                            <Bookcomponent
                                currentIndex={futureTicker._id}
                            />
                        )
                    }
                    {
                        tabindex == 2 && (
                            <Tradecomponent />
                        )
                    }
                </View>


            </View>
            <View style={{ flex: 0.075, backgroundColor: theme.card, width: windowwidth, alignSelf: "center", justifyContent: "center" }} >
                <Flexcomponent justifyContent="center" >
                    <Button
                        leftContent={false}
                        rightContent={false}
                        title="BUY / LONG"
                        buttonStyle={{
                            width: "37.5%",
                            borderRadius: borderradius * 0.5,
                            paddingVertical: "2.5%"
                        }}
                        textStyle={{
                            fontFamily: Fontfamily.medium,
                            fontSize: RFvalue(12)
                        }}
                        onPress={() => navigation.navigate("Buysell")}
                    />

                    <Button
                        leftContent={false}
                        rightContent={false}
                        title="SELL / SHORT"
                        buttonStyle={{
                            width: "37.5%",
                            borderRadius: borderradius * 0.5,
                            paddingVertical: "2.5%",
                            marginLeft: "5%",
                            backgroundColor: Colors.red
                        }}
                        textStyle={{
                            fontFamily: Fontfamily.medium,
                            fontSize: RFvalue(12)
                        }}
                        onPress={() => navigation.navigate("Buysell")}

                    />
                </Flexcomponent>
            </View>
        </Mainview>

    )

}

export default Future

