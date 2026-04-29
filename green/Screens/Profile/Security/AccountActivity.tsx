import React from "react";
import { View, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Description from "../Description";
import Card from "../../../Components/Card";
import Text from "../../../Components/text";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";
import { useSelector } from "react-redux";
import { formatDateTime, formatToReadableDate } from "../../../Utilities/helerfunction";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'AccountActivity'>;

const AccountActivity: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const { loginHistory } = useSelector((state: any) => state.auth.userData);

    console.log(loginHistory, "loginHistory")

    const devices = [
        {
            id: "1",
            name: "SM-A015V",
            lastAccess: "Jul 29, 2025, 10:05 AM",
        },
        {
            id: "2",
            name: "iPhone 14 Pro",
            lastAccess: "Jul 20, 2025, 08:15 PM",
        },
        {
            id: "3",
            name: "SM-A015V",
            lastAccess: "Jun 12, 2025, 03:45 PM",
        },
        {
            id: "4",
            name: "SM-A015V",
            lastAccess: "Jun 12, 2025, 03:45 PM",
        },
        {
            id: "5",
            name: "SM-A015V",
            lastAccess: "Jun 12, 2025, 03:45 PM",
        },
        {
            id: "6",
            name: "SM-A015V",
            lastAccess: "Jun 12, 2025, 03:45 PM",
        },
        {
            id: "7",
            name: "SM-A015V",
            lastAccess: "Jun 12, 2025, 03:45 PM",
        },
        {
            id: "8",
            name: "SM-A015V",
            lastAccess: "Jun 12, 2025, 03:45 PM",
        },
    ];

    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle="Account Activity"
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>
                {/* <FlatList
                    data={devices}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Card
                            containerStyle={{
                                padding: "4%",
                                marginBottom: 12,
                                backgroundColor: theme.theme === "dark" ? "#16181A" : theme.card,
                            }}
                        >
                            <Text>{item.name}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "2%" }}>
                                <Text style={{ color: "#31A062" }}>Last Accessed</Text>
                                <Text style={{ color: theme.secondarytext }}>{item.lastAccess}</Text>
                            </View>
                        </Card>
                    )}
                /> */}
                <Card
                    containerStyle={{
                        padding: "4%",
                        marginBottom: 12,
                        backgroundColor: theme.theme === "dark" ? "#16181A" : theme.card,
                    }}
                >
                    <Text>{loginHistory.regionName}, {loginHistory.countryName}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "2%" }}>
                        <Text style={{ color: "#31A062" }}>Last Accessed</Text>
                        <Text style={{ color: theme.secondarytext }}>{formatDateTime(loginHistory.startTime)}</Text>
                    </View>
                </Card>
                <Text style={[style.note, { marginTop: "5%" }]}>Note :</Text>
                <Description
                    content="withdrawal will be temporarily disabled for 24 hours after any change in your password, mobile number, or email."
                />
            </View>
        </Mainview>
    )

}

export default AccountActivity;