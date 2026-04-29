import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, View, Text as NormalText, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";

import StatCard from "../StatCard";
import Text from "../../../Components/text";
import { image } from "../../../Utilities/images";
import { Colors } from "../../../Utilities/uiasset";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { useLazyAffiliateCommissionQuery } from "../../../Slices/affiliate";

import styles from "../styles";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import { Dropdown } from "../../../Components/Field";
interface RewardsHubprops {

}

const RewardsHub: React.FC<RewardsHubprops> = ({

}) => {
    const { theme } = useCustomHooks();
    const style = styles(theme)

    const { referralCode, lastClaimDate, rewardGenerated, claimAmount, totalCommission } = useSelector((state: any) => state.auth.affiliateData);

    console.log("GREX18adf", referralCode)

    const [targetTime, setTargetTime] = useState<number | null>(null);

    const [affiliateCommission, { data, error }] = useLazyAffiliateCommissionQuery();
    const affiliateCommi = data?.result || {};

    console.log(data, "datadatadatadatadatadata", error)


    useEffect(() => {
        affiliateCommission({})
    }, []);


    useEffect(() => {
        const futureDate = new Date(new Date(lastClaimDate).getTime() + rewardGenerated * 24 * 60 * 60 * 1000).getTime()
        console.log("futureDatefutureDatefutureDate", futureDate);
        setTargetTime(futureDate)
    }, [lastClaimDate, rewardGenerated]);

    const dropdownData = [
        { label: "1 W", value: "1" },
        { label: "1 M", value: "2" },
        { label: "3 M", value: "2" },
        { label: "6 M", value: "2" },
        { label: "6 M", value: "2" },

    ];


    return (
        <View style={style.dashboard}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.between}>
                    <StatCard label={"Total Earning"} value={"0"} />
                    <StatCard
                        label={"Earning"}
                        value={parseFloat(totalCommission || "0") + parseFloat(claimAmount || "0")}
                        backgroundColor="#36A04D" containerStyle={{ width: "50%" }}
                        icon={
                            <Pressable style={{ position: "absolute", top: -10, right: 10, flexDirection: "row" }} >
                                <Dropdown
                                    list={dropdownData}
                                    themes={theme}
                                    placeholder=""
                                    background={"transparent"}
                                    inputStyle={{
                                        borderWidth: 0,
                                        width: '50%',
                                        justifyContent: "flex-end",
                                    }}
                                    conatinerstyle={{
                                        width: windowwidth * 0.31,
                                        alignItems: "flex-end"
                                    }}
                                    height={windowheight * 0.05}

                                />
                            </Pressable>}
                    />
                </View>
                <View style={[style.between]}>
                    <StatCard label={"Pending Claims"} value={"0"} backgroundColor="#8450E7" />
                    <View style={{ width: "50%", height: 120, marginBottom: 16, }}>
                        <ImageBackground
                            source={image.card}
                            style={{
                                width: "100%",
                                height: 120,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            resizeMode="stretch"
                        >
                            <Text style={{ color: Colors.darkgray }}>Next Payout</Text>
                            <View style={[style.between, { marginTop: "2%" }]}>
                                <View style={{ alignItems: "center" }}>
                                    <LinearGradient colors={["#188E45", "#05431D"]} style={style.timerBox}>
                                        <Text style={style.timerText}>10</Text>
                                    </LinearGradient>
                                    <Text style={style.unitText}>Day</Text>
                                </View>
                                <Text size="medium" family="bold" style={{ color: "#05431D", marginBottom: 20 }}> : </Text>
                                <View style={{ alignItems: "center" }}>
                                    <LinearGradient colors={["#188E45", "#05431D"]} style={style.timerBox}>
                                        <Text style={style.timerText}>10</Text>
                                    </LinearGradient>
                                    <Text style={style.unitText}>Hours</Text>
                                </View >
                                <Text size="medium" family="bold" style={{ color: "#05431D", marginBottom: 20 }}> :</Text>
                                <View style={{ alignItems: "center" }}>
                                    <LinearGradient colors={["#188E45", "#05431D"]} style={style.timerBox}>
                                        <Text style={style.timerText}>10</Text>
                                    </LinearGradient>
                                    <Text style={style.unitText}>Seconds</Text>
                                </View>
                                <Text size="medium" family="bold" style={{ color: "#05431D", marginBottom: 20 }}>:</Text>
                                <View style={{ alignItems: "center" }}>
                                    <LinearGradient colors={["#188E45", "#05431D"]} style={style.timerBox}>
                                        <NormalText style={style.timerText}>10</NormalText>
                                    </LinearGradient>
                                    <Text style={style.unitText}>Minutes</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                <View>
                    <Text>Rewards History</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default RewardsHub;