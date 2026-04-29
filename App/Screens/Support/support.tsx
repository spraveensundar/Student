import React, { useCallback, useEffect, useState } from "react";
import { Linking, Pressable, View } from 'react-native';
import Mainview from "../../Components/mainview";
import Card from "../../Components/Card";
import Text from "../../Components/text";
import Images, { icons, lotties } from "../../Utilities/images";
import Flexcomponent from "../../Components/flexcomponent";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Lottie from "../../Components/lottieview";
import { windowwidth } from "../../Utilities/dimensions";
import Listcomponent from "../../Components/listcomponent";
import { useGetAppDataQuery } from "../../Common/redux/userHook";
import { useFocusEffect } from "@react-navigation/native";

const Support: React.FC = () => {


    const { data, refetch } = useGetAppDataQuery(undefined);


    const { theme, navigation } = useCustomHooks()

    const [supportData, setSupportData] = useState<any>({});

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    );

    useEffect(() => {
        setSupportData(data?.data)
    }, [data?.data]);

    console.log('supportDatasupportData', supportData)


    return (
        <Mainview
            headertitle="Support"
            lefticon={<></>}
        >

            <Card containerStyle={{ backgroundColor: "#F3F3F3", flexDirection: "row", alignItems: "center", marginTop: "5%", paddingHorizontal: "2.5%", paddingVertical: "5%" }}>
                <View style={{ width: "17.5%" }} >
                    <Images
                        type="image"
                        source={icons.Customer} />
                </View>

                <View style={{ width: "70%", marginTop: 25 }} >
                    <Text family="GMedium" size="medium">Contact customer care</Text>
                    <Text family="GRegular" size="medium" top={"1%"} >
                        {supportData?.contactMobileNo}
                    </Text>
                </View>

                <View style={{ width: "12.5%", justifyContent: "center" }} >
                    <Pressable
                        onPress={() => Linking.openURL(`tel:${supportData?.contactMobileNo}`)}
                    >
                        <Lottie
                            src={lotties.MsgLoading}
                            width={windowwidth * 0.15}
                            height={windowwidth * 0.15}
                        />
                    </Pressable>
                </View>
            </Card>

            <Listcomponent
                src={icons.Faq}
                title="FAQ’s"
                onpress={() => navigation.navigate("Faq")}
            />


            <Listcomponent
                src={icons.Mail}
                title="Gmail"
                onpress={()=>Linking.openURL(`mailto:${supportData?.contactEmailId}`)}
            />

        </Mainview>
    )
}

export default Support;