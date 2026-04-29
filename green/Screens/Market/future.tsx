import React, { useCallback, useEffect, useState } from "react"
import { FlatList, Pressable, View } from "react-native"
import Flexcomponent from "../../Components/flexcomponent"
import { borderradius, windowheight, windowwidth } from "../../Utilities/dimensions"
import useCustomHooks from "../../Actions/Hooks/customhook"
import Text from "../../Components/text"
import Currencyswitch from "../../Components/currencyswitch"
import { Colors, Fontfamily } from "../../Utilities/uiasset"
import VectorIcons from "../../Utilities/vectoricons"
import Images, { image } from "../../Utilities/images"
import { SetFutureparams } from "../../Slices/helper"
import { useSelector } from "react-redux"
import { isEmpty } from "lodash"
import { getTokenImage } from "../../Utilities/helerfunction"
import NoData from "../../Components/NoData"
import useSocket from "../../Actions/Socket/sockethook"

interface Marketfutureprops {
    pairData?: any;
    onSelect?: any;
    addFavourite?: any
    favourite?: any
}

const Marketfuture: React.FC<Marketfutureprops> = ({
    pairData,
    onSelect,
    addFavourite,
    favourite
}) => {
    const { theme, navigation, dispatch } = useCustomHooks()
    const [activeindex, setActiveindex] = useState(0);

    // const events: any = {
    //     "FututresPrice": useCallback((data: any) => {
    //         console.log(data, "PRICE_CONVERSION_LISTPRICE_CONVERSION_LISTPRICE_CONVERSION_LIST");

    //     }, [])
    // }

    // const { isConnected } = useSocket({
    //     events: events,
    //     autoConnect: true,
    //     url:"https://stage-backend.greenexindia.com"
    // })
    return (
        <View style={{ flex: 1, }} >
            <Flexcomponent justifyContent="space-between" style={{ marginTop: "1%" }} >
                <View style={{ width: "auto", paddingHorizontal: "7.5%", paddingVertical: "1.5%", backgroundColor: theme.tabactive, alignItems: "center", justifyContent: "center", borderRadius: borderradius * 3 }} >
                    <Text family="medium" color={theme.activetabtext} >All</Text>
                </View>

                <Currencyswitch
                    index={activeindex}
                    onchangeindex={setActiveindex}
                />
            </Flexcomponent>

            <Flexcomponent style={{ paddingHorizontal: "2.5%" }} paddingVertical={"2.5%"} width={"100%"} >
                <Flexcomponent style={{ width: "25%", justifyContent: "center" }} >
                    <Text size="semimedium" family="medium" color={Colors.graytext} >Name</Text>
                </Flexcomponent>


                <Flexcomponent justifyContent="flex-end" style={{ width: "25%" }} >
                    <Text size="semimedium" family="medium" color={Colors.graytext}>Last Price</Text>
                </Flexcomponent>


                <Flexcomponent justifyContent="flex-end" style={{ width: "22%" }} >
                    <Text size="semimedium" family="medium" color={Colors.graytext} >24 Chg.</Text>
                    {/* <VectorIcons
                        family="FontAwesome5"
                        name={"sort"}
                        iconcolor={Colors.graytext}
                        size={windowwidth * 0.04}
                        style={{ marginLeft: "5%" }}
                    /> */}
                </Flexcomponent>

                <Flexcomponent justifyContent="flex-end" style={{ width: "28%" }} >
                    <Text size="semimedium" family="medium" color={Colors.graytext} >24h Vol.</Text>
                </Flexcomponent>
            </Flexcomponent>

            <View style={{ flex: 1, paddingHorizontal: "2.5%" }} >

                {pairData.length > 0 ? (
                    <FlatList
                        data={pairData}
                        renderItem={({ item, index }) => (
                            <Flexcomponent onPress={() => {
                                SetFutureparams("trade"),
                                    onSelect(item.tickerRoot),
                                    navigation.navigate('Dashboard', { screen: 'Future' })
                            }} ispress={true} style={{ marginVertical: "2.5%" }} height={windowheight * 0.05} width={"100%"} >
                                <Flexcomponent alignItems="flex-start" justifyContent="space-around" style={{ width: "25%" }}>
                                    <Pressable style={{ alignItems: "center", flexDirection: "row" }} onPress={() => addFavourite(item._id, item, item.tickerRoot)}>
                                        <View style={{ marginRight: 5 }}>
                                            <VectorIcons
                                                family="FontAwesome"
                                                name={favourite?.some((val: any) => val.pairName === item.tickerRoot) ? "star" : "star-o"}
                                                size={windowwidth * 0.040}
                                                iconcolor={favourite?.some((val: any) => val.pairName === item.tickerRoot) ? "#FDD25A" : theme.darktext}
                                            />
                                        </View>
                                        <Images
                                            type="image"
                                            source={getTokenImage(item.tickerRoot)}
                                            width={windowwidth * 0.065}
                                            height={windowwidth * 0.065}
                                        />
                                    </Pressable>
                                    <View>
                                        <Text size="xsmall" color={theme.futuretext} >  {item.tickerRoot}</Text>
                                        <Text size="xsmall" color={Colors.graytext} >  {item.marketPrice.toFixed(2)}</Text>
                                    </View>
                                </Flexcomponent>

                                <View style={{ width: "25%", justifyContent: "center", alignItems: "flex-end", paddingRight: 4 }} >
                                    <Text size="xsmall" color={Colors.lightgreen} >{item.last}</Text>
                                </View>

                                <View style={{ width: "22%", justifyContent: "center", alignItems: "flex-end" }} >
                                    <Text size="xsmall" color={Colors.red} >{item.change}</Text>
                                </View>
                                <View style={{ width: "28%", justifyContent: "center", alignItems: "flex-end" }} >
                                    <Text size="xsmall" color={theme.darktext} >{item.volume}</Text>
                                </View>
                            </Flexcomponent>
                        )}
                    />
                ) : (
                    <View style={{ alignItems: "center", justifyContent: "center", marginTop: "20%" }}>
                        <NoData title="Watch list is Empty" />
                    </View>
                )}

            </View>
        </View>
    )


}

export default Marketfuture