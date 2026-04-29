import React, { useCallback, useEffect, useState } from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import Text from "../../../../Components/text";
import { Linking, Pressable, View } from "react-native";
import VectorIcons from "../../../../Utilities/vectorIcons";
import Images, { icons } from "../../../../Utilities/images";
import { useGetAppDataQuery } from "../../../../Common/redux/userHook";
import { useFocusEffect } from "@react-navigation/native";

const ContactUs: React.FC = () => {



    const { data, refetch } = useGetAppDataQuery(undefined);


    const { theme, navigation } = useCustomHooks();


    const [supportData, setSupportData] = useState<any>({});


    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    );

    useEffect(() => {
        setSupportData(data?.data)
    }, [data?.data]);


    return (
        <Mainview
            isheader={true}
            headertitle={params?.title ?? "Contact Us"}
            onleftfn={() => navigation.goBack()}
        >
            <View style={{ marginTop: "5%", gap: 10 }}>
                <Text family="GMedium" size="semilarge">Contact details</Text>
                <Text family="GRegular" size="semimedium" style={{ lineHeight: 18 }}>Have a question, feedback, or
                    partnership idea? We're always happy to help.
                    Reach out to us using the form below or contact us directly through the given details.
                </Text>
                <View style={{ backgroundColor: theme.card, padding: 20, borderRadius: 10, gap: 20 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Pressable
                            onPress={() => Linking.openURL(`tel:${supportData?.contactMobileNo}`)}
                        >
                            <Images type="image" source={icons.Profilephone} />
                        </Pressable>
                        <View>
                            <Text family="GRegular" size="semimedium">Contact number</Text>
                            <Text family="GBold" size="medium">{supportData?.contactMobileNo}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Pressable
                            onPress={() => Linking.openURL(`mailto:${supportData?.contactEmailId}`)}
                        >
                            <Images type="image" source={icons.Gmail} />
                        </Pressable>
                        <View>
                            <Text family="GRegular" size="semimedium">Email Address</Text>
                            <Text family="GBold" size="medium">{supportData?.contactEmailId}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Mainview>
    )
}

export default ContactUs;