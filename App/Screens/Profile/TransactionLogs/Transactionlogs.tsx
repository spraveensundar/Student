import useCustomHooks from "../../../Actions/Hooks/customhook"
import React, { useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Mainview from "../../../Components/mainview";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";
import { FlatList, Pressable, ScrollView, View } from "react-native";
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions";
import VectorIcons from "../../../Utilities/vectoricons";
import { Dropdown, Input, InputDateTime } from "../../../Components/Field";
import Flexcomponent from "../../../Components/flexcomponent";
import Card from "../../../Components/Card";
import Text from "../../../Components/text";
import { Colors } from "../../../Utilities/uiasset";
import Logfilter from "./filter";
import Recenttransaction from "./recenttransaction";
import History from "./history";
import Creditdebit from "./ceditdebit";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'TransactionLogs'>;

const TransactionLogs: React.FC<Props> = () => {

    const { theme, navigation, bottomsheetref: fil1, openbottomsheet, closebottomsheet } = useCustomHooks()

    const [assetHistory, setAssetHistory] = useState(false)
    const initialstate = {
        startdate: "",
        enddate: "",
        transferType: "All",
        selectedType: "All",
        newchange: false
    }
    const [startdate, setStartdate] = useState<any>("")
    const [enddate, setEnddate] = useState<any>("")

    const [selected, setSelected] = useState<any>(initialstate)
    const [credit, setCredit] = useState("All")


    return (
        <Mainview
            onleftfn={() => navigation.goBack()}
            headertitle="Transaction Logs"
            isheader={true}
            righticon={
                <VectorIcons
                    family="AntDesign"
                    name={"filter"}
                    size={windowwidth * 0.05}
                />
            }
            onrightfn={() => {
                openbottomsheet(fil1)
            }}
        >

            <View style={{ height: windowheight * 0.9, width: "auto", justifyContent: "flex-start", backgroundColor: theme.background }}>

                <Flexcomponent justifyContent={"flex-start"} alignItems="center" >

                    <Pressable onPress={() => setAssetHistory(!assetHistory && true)} style={{ height: "auto", justifyContent: "center", alignItems: "center", width: "30%", }}>
                        <Card containerStyle={{ justifyContent: "center", alignItems: "center", padding: 10, backgroundColor: !assetHistory ? "#fff" : "#202225" }}>
                            <Text
                                family="regular"
                                size="small"
                                // style={{ paddingHorizontal: 15, }}
                                color={assetHistory ? "#fff" : "#202225"}>History</Text>
                        </Card>
                    </Pressable>


                    <Pressable onPress={() => setAssetHistory(!assetHistory && true)} style={{ height: windowheight * 0.05, justifyContent: "center", alignItems: "center", width: "40%", marginLeft: "5%" }}>
                        <Card containerStyle={{ justifyContent: "center", alignItems: "center", padding: 10, backgroundColor: assetHistory ? "#fff" : "#202225" }}>
                            <Text
                                family="regular"
                                size="small"
                                // style={{ paddingHorizontal: 15, }}
                                color={!assetHistory ? "#fff" : "#202225"}
                            >Recent Transactions</Text>
                        </Card>
                    </Pressable>



                </Flexcomponent>
                {/* 
                <Flexcomponent justifyContent="space-between" alignItems="center" style={{ width: "100%", marginTop: "2%" }}>


                    <Flexcomponent height={windowheight * 0.06} style={{ borderRadius: borderradius * 0.5 }} width={"30%"} bakgroundcolor={theme.card}  >
                        <InputDateTime
                            placeHolder="Start Date"
                            inputType="date"
                            value={startdate}
                            onConfirm={(text: any) => {
                                console.log(text, "hellllooooooooooooo");
                                setStartdate(text)
                            }}
                            containerstyle={{
                                height: "100%",
                                top: 3
                            }}
                            datePickerProps={{
                                maximumDate: new Date()
                            }}

                        />

                        <VectorIcons
                            name={"calendar"}
                            family="Feather"
                            iconcolor={theme.secondarytext}
                            size={windowwidth * 0.045}
                        />


                    </Flexcomponent>


                    <Flexcomponent height={windowheight * 0.06} style={{ borderRadius: borderradius * 0.5 }} width={"30%"} bakgroundcolor={theme.card}  >
                        <InputDateTime
                            placeHolder="End Date"
                            inputType="date"
                            value={enddate}
                            onConfirm={(event: any,) => {
                                setEnddate(event)
                            }}
                            containerstyle={{
                                height: "100%",
                                top: 3
                            }}
                            datePickerProps={{
                                maximumDate: new Date()
                            }}

                        />

                        <VectorIcons
                            name={"calendar"}
                            family="Feather"
                            iconcolor={theme.secondarytext}
                            size={windowwidth * 0.045}
                        />
                    </Flexcomponent>


                    <Flexcomponent ispress={true} onPress={() => openbottomsheet(fil1)} paddingHorizontal={"3%"} height={windowheight * 0.06} justifyContent="space-between" style={{ borderRadius: borderradius * 0.5 }} width={"30%"} bakgroundcolor={theme.card}  >
                        <View style={{ width: "80%" }} >
                            <Text numoflines={2} color={theme.tabactive} >{selected}</Text>
                        </View>
                        <VectorIcons
                            name={"chevron-down"}
                            family="Ionicons"
                            iconcolor={theme.secondarytext}
                            size={windowwidth * 0.045}
                        />
                    </Flexcomponent>


                </Flexcomponent> */}

                {!assetHistory ?
                    <History
                        transferType={selected?.transferType}
                        enddate={selected?.enddate}
                        startdate={selected?.startdate}
                        selectedType={selected?.selectedType}
                        
                    />
                    :

                    <Recenttransaction
                        transferType={selected?.transferType}
                        enddate={selected?.enddate}
                        startdate={selected?.startdate}
                    />

                }


            </View>

            <Logfilter
                sheetref={fil1}
                snappoint={["40%"]}
                assetHistory={!assetHistory}

            />

            {/* <Creditdebit
                sheetref={fil2}
                snappoint={["32.5%"]}
                filterdata={filter2}
                onselect={(value: any) => {
                    closebottomsheet(fil1)
                    console.log(value, "etstttttttttt");
                    setCredit(value)
                }}
            /> */}


        </Mainview >
    )

}
export default TransactionLogs