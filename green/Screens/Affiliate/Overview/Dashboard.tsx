import React, { useEffect } from "react";
import { Pressable, ScrollView, View, FlatList } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";

import StatCard from "../StatCard";
import Text from "../../../Components/text";
import { Button } from "../../../Components/Field";
import { Colors } from "../../../Utilities/uiasset";
import Images, { image } from "../../../Utilities/images";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import { useLazyAffiliateSummaryQuery } from "../../../Slices/affiliate";
import { getItemColor, openLink } from "../../../Utilities/helerfunction";

import styles from "../styles";

interface Dashboardprops {

}

const Dashboard: React.FC<Dashboardprops> = () => {
    const { theme, copyData } = useCustomHooks();
    const style = styles(theme);
    const { referralCode } = useSelector((state: any) => state.auth.affiliateData);

    const [userAffiliate, { data }] = useLazyAffiliateSummaryQuery();
    const affiliate = data?.result || {};
    const { referralCode: Refcode, summary = {}, totalClicks, youtube, telegram, discord, instagram, twitch, facebook, x, twitter } = affiliate;

    useEffect(() => {
        userAffiliate(referralCode)
    }, []);

    const statsData = [
        { title: "Total Users", value: summary.totalUsers },
        { title: "Total Clicked users", value: totalClicks },
        { title: "Active Users", value: summary.activeUsers },
        { title: "Active Traders", value: summary.activeTraders },
        { title: "Volume", value: summary.totalVolume },
        { title: "Total Commission", value: summary.totalCommission },
        { title: "KYC Completed Users", value: summary.approvedKycUsers },
    ];

    const referralURL = `https://greenexindia.com/affiliate/${Refcode}`

    return (
        <View style={style.dashboard}>
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>

                <FlatList
                    data={statsData}
                    keyExtractor={(item) => item.title}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    renderItem={({ item }) => <StatCard label={item.title} value={item.value} backgroundColor={getItemColor(item.title)} />}
                    nestedScrollEnabled={true}
                />

                <Text style={{ marginTop: '5%' }}>Note:</Text>
                <Text size="small" style={style.subTitle}>You'll earn affiliate commissions whenever your referred users make <Text style={{ color: theme.darktext }} family="semiBold">Deposits</Text>, <Text style={{ color: theme.darktext }} family="semiBold">Withdrawals</Text>, and <Text style={{ color: theme.darktext }} family="semiBold">Trades</Text>.</Text>


                <View style={style.bottomLine} />

                <View>
                    <Text>{Refcode}</Text>
                    <Text size="small" style={style.subTitle}>Affiliate Code</Text>
                    <Button
                        title={"Copy"}
                        buttonStyle={style.copy}
                        textStyle={{ color: theme.darktext }}
                        onPress={() => copyData(Refcode)}
                    />
                </View>

                <View style={style.bottomLine} />

                <View>
                    <Text>Share Via</Text>
                    <Text size="small" style={style.subTitle}>Social Media Link</Text>
                    <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: "5%" }}>
                        <Pressable onPress={() => openLink(youtube)}>
                            <Images type="image" source={image.Youtubes} />
                        </Pressable>
                        <Pressable onPress={() => openLink(x)}>
                            <Images type="image" source={image.Twitter} />
                        </Pressable>
                        <Pressable onPress={() => openLink(telegram)}>
                            <Images type="image" source={image.Telegram} />
                        </Pressable >
                        <Pressable onPress={() => openLink(discord)}>
                            <Images type="image" source={image.Discord} />
                        </Pressable>
                        <Pressable onPress={() => openLink(instagram)}>
                            <Images type="image" source={image.Inta} />
                        </Pressable>
                        <Pressable onPress={() => openLink(twitch)}>
                            <Images type="image" source={image.Twich} />
                        </Pressable>
                        <Pressable onPress={() => openLink(facebook)}>
                            <Images type="image" source={image.Facebook} />
                        </Pressable>
                    </View>

                </View>

                <View style={style.bottomLine} />
                <View>
                    <Text>{referralURL}</Text>
                    <Text size="small" style={style.subTitle}>Affiliate Link</Text>
                    <Button
                        title={"Copy"}
                        buttonStyle={style.copy}
                        textStyle={{ color: theme.darktext }}
                        onPress={() => copyData(referralURL)}
                    />
                </View>


                <View style={style.bottomLine} />

                <View style={{ marginBottom: "20%" }}>
                    <Text size="small" style={{ color: Colors.grey, marginBottom: "5%" }}>Click the image below to save , print or share your referral URL as a QR Code</Text>
                    <View style={style.between}>
                        <View style={style.qrContainer}>
                            <View style={{
                                backgroundColor: Colors.white,
                                padding: 5,
                                borderRadius: 8,
                            }}>
                                <QRCode
                                    value={referralURL}
                                    size={windowwidth * 0.40}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Dashboard