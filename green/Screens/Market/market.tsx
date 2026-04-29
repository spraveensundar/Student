import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import Mainview from "../../Components/mainview";
import React, { useCallback, useEffect, useState } from "react";
import Flexcomponent from "../../Components/flexcomponent";
import { borderradius, windowheight, windowwidth } from "../../Utilities/dimensions";
import Images from "../../Utilities/images";
import { Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import Text from "../../Components/text";
import { Input } from "../../Components/Field";
import useCustomHooks, { useApihooks } from "../../Actions/Hooks/customhook";
import VectorIcons from "../../Utilities/vectoricons";
import { Colors, Fontfamily, Fontsize } from "../../Utilities/uiasset";
import Marketfuture from "./future";
import MarketOption from "./MarketOption";
import Analytics from "./Analytics";
import { useSelector } from "react-redux";
import { isEmpty } from 'lodash';
import { setFutureTicker, setTradePairData, useAddFavouritePairMutation } from "../../Slices/future";
import { setItem } from "../../Actions/Storage/localstorage";
import useApiError from "../../Actions/Hooks/errorhook";
import useSocket from "../../Actions/Socket/sockethook";
import { socketevents } from "../../Actions/Socket/customhooks";
import { io } from "socket.io-client";
import { authSelector } from "../../Slices/auth";

interface UserState {
    user: {
        userdetails: {
            secretKey: string;
            futureFav?: { pairName: string }[];
        };
    };
}

interface PairData {
    _id: string;
    baseCurrency: string;
    quoteCurrency: string;
    tickerRoot: string;
    marketPrice: number;
    last: number;
    change: number;
    volume: number;
}


interface FutureState {
    future: {
        futurePairData: PairData[];
    };
}

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Market'>;

const Market: React.FC<Props> = () => {
    const { theme, navigation, dispatch, successtoast, failuretoast } = useCustomHooks()
    const styles = style(theme)
    const { futurePairData } = useSelector((state: any) => state.future);
    const { futureFav } = useSelector((state: any) => state.auth.userData);
    const { triggeruserdetails } = useApihooks();


    const data = ["Future", "Option", "Analytics"]
    const [activeindex, setActiveindex] = useState(0)
    const [pairSearch, setPairSearch] = useState<string>('');
    const [pairData, setPairData] = useState<PairData[]>([]);

    const [addFavourite, { error }] = useAddFavouritePairMutation();

    useApiError(error);

    const handleAddFavourite = async (id: any, name: any) => {
        const payload: any = {
            pairId: id,
            pairName: name,
        };
        console.log(payload, "payload")
        const response = await addFavourite(payload).unwrap();
        console.log(response, "response")
        if (response.success) {
            // successtoast("Success", response.message);
            triggeruserdetails()

        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    const handlePairSearch = (text: string) => {
        setPairSearch(text);
        let regx = new RegExp(text, "i");

        if (futurePairData && futurePairData.length > 0) {
            if (!isEmpty(text)) {
                const filtered = futurePairData.filter((val: any) => {
                    const pairName = val.baseCurrency + "/" + val.quoteCurrency;
                    return pairName.match(regx);
                });
                setPairData(filtered);
            } else {
                setPairData(futurePairData);
            }
        }
    };

    const handlePairChange = (pair: any) => {
        try {
            const pairDetail = futurePairData.find((val: any) => val.tickerRoot === pair);
            console.log("pairDetail", pairDetail)
            setItem("futurespair", pair)
            dispatch(setTradePairData(pairDetail));
            dispatch(setFutureTicker(pairDetail));
            navigation.goBack()
        } catch (error) {
            console.log('handlePairChange__err', error);
        }
    };

    useEffect(() => {
        if (!isEmpty(futurePairData)) {
            if (!isEmpty(pairSearch)) {
                let regx = new RegExp(pairSearch, "i");
                let FilterData = futurePairData.filter((val: any) => {
                    let pairName = val.baseCurrency + "/" + val.quoteCurrency;
                    return pairName.match(regx);
                });
                setPairData(FilterData);
            } else {
                setPairData(futurePairData);
            }
        }
    }, [futurePairData, pairSearch]);


   

    



    return (
        <Mainview
            isheader={false}
            isscollable={false}
            horizontalpadding={"2%"}
        >
            <View style={{ flex: 1, paddingTop: "2.5%", }} >
                <Flexcomponent justifyContent="flex-start" >
                    <Pressable onPress={() => navigation.goBack()} style={{ width: "15%", alignItems: "center", justifyContent: "center" }} >
                        <VectorIcons
                            family="FontAwesome"
                            name="angle-left"
                            size={30}
                        />
                    </Pressable>
                </Flexcomponent>
                <Flexcomponent paddingHorizontal={"5%"} justifyContent="flex-start" style={{ width: "95%", height: windowheight * 0.06, backgroundColor: theme.card, borderRadius: borderradius * 3, marginTop: "2.5%", alignSelf: "center" }} >
                    <VectorIcons
                        family="Feather"
                        name={"search"}
                        size={windowwidth * 0.045}
                    />
                    <TextInput
                        value={pairSearch}
                        placeholder="Search contracts"
                        style={{ flex: 1, paddingHorizontal: "2.5%", color: theme.textinput, fontFamily: Fontfamily.regular, fontSize: Fontsize.semimedium }}
                        placeholderTextColor={Colors.graytext}
                        onChangeText={handlePairSearch}
                    />
                </Flexcomponent>

                <Flexcomponent justifyContent="flex-start" width={windowwidth} height={windowheight * 0.05} style={{ borderBottomWidth: 1, borderBottomColor: "#333436", alignSelf: "center" }} top={"2.5%"} >
                    {data?.map((e: any, i: number) => (
                        <Pressable onPress={() => setActiveindex(i)} style={i == activeindex ? styles.activetab : styles.tab} >
                            <Text>{e}</Text>
                        </Pressable>))}
                </Flexcomponent>

                <View style={{ flex: 1 }} >
                    {
                        activeindex == 0 && (
                            <Marketfuture
                                pairData={pairData}
                                onSelect={handlePairChange}
                                addFavourite={handleAddFavourite}
                                favourite={futureFav}
                            />
                        )
                    }
                    {activeindex == 1 &&
                        <MarketOption />
                    }

                    {
                        activeindex == 2 &&
                        <Analytics />
                    }
                </View>

            </View>



        </Mainview>
    )

}

export default Market

const style = (theme?: any) => StyleSheet.create({
    activetab: {
        borderBottomWidth: 1,
        borderBottomColor: theme.inversetext,
        width: "25%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    tab: {
        width: "25%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
})