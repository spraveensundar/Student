import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";
import Mainview from "../../../Components/mainview";
import React, { useCallback, useEffect, useState } from "react";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { FlatList, Pressable, StyleProp, TextInput, View, ViewProps, ViewStyle } from "react-native";
import { borderradius, RFvalue, windowheight, windowwidth } from "../../../Utilities/dimensions";
import Flexcomponent from "../../../Components/flexcomponent";
import Text from "../../../Components/text";
import { useLazyReferaldetailsQuery, useLazyReferalhistoryQuery } from "../../../Slices/auth";
import VectorIcons from "../../../Utilities/vectoricons";
import { Colors, Fontfamily, limit } from "../../../Utilities/uiasset";
import { InputDateTime } from "../../../Components/Field";
import Card from "../../../Components/Card";
import Loadercomponent from "../../../Components/loadercomponent";
import Nodata from "../../../Components/nodata";



type Props = NativeStackScreenProps<Stacknavigationtypes, 'Referaldashboard'>;
const Referaldashboard: React.FC<Props> = () => {
    const { theme, navigation, convert } = useCustomHooks()

    interface boxprops {
        title: string,
        count: string | number,
        bg?: string,
        conatinerstyle?: StyleProp<ViewStyle>
    }
    const Boxcomponent = ({
        title,
        count,
        bg = "#8450E7",
        conatinerstyle
    }: boxprops) => {
        return (
            <View style={[{ width: "47.5%", paddingVertical: "7.5%", borderRadius: borderradius * 0.5, backgroundColor: bg, alignItems: "center", justifyContent: "center" }, conatinerstyle]} >
                <Text size="medium" color={theme.activetab} >{count}</Text>
                <Text size="semimedium" top={"2.5%"} color={theme.secondarytext} >{title}</Text>
            </View>
        )
    }

    const [referaldetails, { data, isLoading }] = useLazyReferaldetailsQuery()
    console.log(data, "referaldata");

    const [transactiondata, setTransactiondata] = useState<any[]>([])

    useEffect(() => {
        referaldetails(true)
    }, [])

    const refferaldata = data?.result?.data[0] ?? ""

    const [startdate, setStartdate] = useState<any>("")
    const [enddate, setEnddate] = useState<any>("")
    const [referalhistory] = useLazyReferalhistoryQuery()
    const [queryparams, setQureyparams] = useState<any>("")
    const [page, setPage] = useState(1)

    const [maxreached, setMaxreached] = useState(false)

    const fetchData = useCallback(async () => {
        const res = await referalhistory({
            page: page,
            limit: limit.recent_tranaction,
            startDate: startdate ? new Date(startdate).getTime() : "",
            endDate: enddate ? new Date(enddate).getTime() : "",
            search: queryparams

        })
        console.log(res, "responseeeeeeeeeeeeeeeeeeee");
        const result = res?.data?.result?.data
        if (page == 1) {
            setTransactiondata(result)
        }
        else {
            setTransactiondata((prevstate) => [...prevstate, ...(result ?? [])])
        }

        if (res?.data?.result.count < limit.recent_tranaction) {
            setMaxreached(true)
        }
    }, [startdate, enddate, queryparams, isLoading, maxreached, page])


    useEffect(() => {
        const delay = setTimeout(() => {
            setPage(1);
            setMaxreached(false);
            setTransactiondata([])
        }, 500);

        return () => clearTimeout(delay);
    }, [startdate, enddate, queryparams])

    useEffect(() => {
        fetchData()
    }, [page, fetchData])

    return (
        <Mainview
            headertitle="Referal Dashboard"
            onleftfn={() => navigation?.goBack()}
            isscollable={false}
            righticon={
                <Pressable onPress={() => navigation?.navigate("Reference")}>
                    <VectorIcons
                        family="Ionicons"
                        name="share-social-outline"
                        iconcolor={theme.darktext}
                        size={windowwidth * 0.05}
                    />
                </Pressable>
            }

        >
            <>
                <Flexcomponent style={{ flexWrap: "wrap" }} justifyContent="space-between" >
                    <Boxcomponent title="UnQualified referrals" count={refferaldata?.refferUnQualifiedCount} />
                    <Boxcomponent title="Qualified referrals" count={refferaldata?.refferQualifiedCount} bg="#004C82" />
                    <Boxcomponent conatinerstyle={{ marginTop: "10%" }} title="Referral Count" count={refferaldata?.refferCount} bg="#6265FF" />
                    <Boxcomponent conatinerstyle={{ marginTop: "10%" }} title="Total Rewards" count={convert(refferaldata?.amount)} bg="#008186" />
                </Flexcomponent>

                <Flexcomponent justifyContent="space-between" height={windowheight * 0.055} >
                    <Text size="medium" >Referral History</Text>

                    <View style={{ width: "47.5%", height: windowheight * 0.055, borderRadius: borderradius * 0.5, flexDirection: "row", alignItems: "center", backgroundColor: theme.card }} >
                        <View style={{ width: "20%", justifyContent: "center", alignItems: "center" }} >
                            <VectorIcons
                                family="Feather"
                                name={"search"}
                                size={windowwidth * 0.045}
                                iconcolor={theme.secondarytext}
                            />

                        </View>

                        <TextInput
                            style={{ paddingHorizontal: "5%", color: theme.textinput, fontFamily: Fontfamily.regular, fontSize: RFvalue(12), flex: 1 }}
                            placeholder="Search..."
                            placeholderTextColor={theme.secondarytext}
                            value={queryparams}
                            onChangeText={(text) => setQureyparams(text)}

                        />
                    </View>

                </Flexcomponent>



                <Flexcomponent alignItems="flex-end" justifyContent="space-between" >
                    <View style={{ width: "40%", alignItems: "center" }} >
                        <Flexcomponent height={windowheight * 0.055} style={{ borderRadius: borderradius * 0.5 }} width={"100%"} bakgroundcolor={theme.card} top={"5%"}  >
                            <InputDateTime
                                placeHolder="start date"
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
                                themes={theme}
                            />
                            <VectorIcons
                                name={"calendar"}
                                family="Feather"
                                iconcolor={theme.secondarytext}
                                size={windowwidth * 0.045}
                            />
                        </Flexcomponent>
                    </View>

                    <View style={{ width: "40%", marginLeft: "5%", alignItems: "center" }} >
                        <Flexcomponent height={windowheight * 0.055} style={{ borderRadius: borderradius * 0.5 }} width={"100%"} bakgroundcolor={theme.card} top={"5%"}  >
                            <InputDateTime
                                placeHolder="end date"
                                inputType="date"
                                value={enddate}
                                onConfirm={(text: any) => {
                                    console.log(text, "hellllooooooooooooo");
                                    setEnddate(text)
                                }}
                                containerstyle={{
                                    height: "100%",
                                    top: 3
                                }}
                                datePickerProps={{
                                    maximumDate: new Date()
                                }}
                                themes={theme}
                            />
                            <VectorIcons
                                name={"calendar"}
                                family="Feather"
                                iconcolor={theme.secondarytext}
                                size={windowwidth * 0.045}
                            />
                        </Flexcomponent>
                    </View>

                    <Pressable onPress={() => {
                        setStartdate("")
                        setEnddate("")
                        setQureyparams("")
                    }} style={{ width: "12.5%", height: windowheight * 0.055, backgroundColor: theme.card, borderRadius: borderradius * 0.5, justifyContent: "center", alignItems: "center" }} >
                        <VectorIcons
                            family="Octicons"
                            name="history"
                            iconcolor={theme.darktext}
                            size={18}
                        />
                    </Pressable>

                </Flexcomponent>

            </>

            <View style={{ flex: 1, paddingTop: "2.5%" }} >
                <FlatList
                    data={transactiondata}
                    renderItem={({ item, index }) => (
                        <Card containerStyle={{ padding: "5%", marginVertical: "2.5%" }} >
                            <Flexcomponent justifyContent="space-between" alignItems="center" >
                                <View style={{ flex: 0.5, }}>
                                    <Text family="regular" size="semimedium" color={Colors.graytext} >Refferal Username</Text>
                                    <Text family="medium" size="semimedium" style={{ marginTop: 3 }} >{item?.childUserName}</Text>
                                </View>
                                <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                                    <Text family="regular" size="semimedium" color={Colors.graytext} >Type</Text>
                                    <Text family="medium" size="semimedium" style={{ marginTop: 3 }} >{item?.transferType}</Text>
                                </View>
                            </Flexcomponent>

                            <Flexcomponent top={"5%"} justifyContent="space-between" alignItems="center" >
                                <View style={{ flex: 0.5, }}>
                                    <Text family="regular" size="semimedium" color={Colors.graytext} >Currency</Text>
                                    <Text family="medium" size="semimedium" style={{ marginTop: 3 }} >INR</Text>
                                </View>
                                <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                                    <Text family="regular" size="semimedium" color={Colors.graytext} >Your Commission</Text>
                                    <Text family="medium" size="semimedium" style={{ marginTop: 3 }} >{convert(item?.amount)}</Text>
                                </View>
                            </Flexcomponent>



                            <Flexcomponent top={"5%"} justifyContent="space-between" >
                                <Card backgroundColor={theme.background} containerStyle={{ padding: "2.5%", width: "45%", alignItems: "center" }} >
                                    <Text family="medium" size="semimedium"  >{(new Date(item?.createdAt)).toDateString()}</Text>
                                </Card>

                                <View style={{ width: "50%", alignItems: "flex-end" }} >
                                    <Text color={item?.status == "completed" ? Colors.green : (item?.status == "rejected") ? Colors.red : theme.activetab} family="medium" size="semimedium"  >{item?.status}</Text>
                                </View>
                            </Flexcomponent>

                        </Card>
                    )}
                    ListFooterComponent={(page > 1 && isLoading) ?
                        <Loadercomponent containerstyle={{ height: windowheight * 0.05 }} /> : null
                    }
                    ListEmptyComponent={
                        <Nodata
                            viewstyle={{ height: windowheight * 0.5 }}
                        />
                    }
                />


            </View>
        </Mainview>
    )

}


export default Referaldashboard