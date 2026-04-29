import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Text from "../../../Components/text";
import Card from "../../../Components/Card";
import Images from "../../../Utilities/images";
import Mainview from "../../../Components/mainview";
import { windowwidth } from "../../../Utilities/dimensions";
import Flexcomponent from "../../../Components/flexcomponent";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";

import styles from "./styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'CarScrapping'>;

const CarScrapping: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    return (
        <Mainview
            isheader={true}
            isscollable={false}
            headertitle="Car Scrapping Service"
        >
            <View style={style.container}>
                <Text size="xxmedium" family="GMedium">Choose service types</Text>
                <Flexcomponent justifyContent="flex-start" alignItems="flex-start" style={[style.subContainer]}>
                    {[{ icon: "Picture", label: "My Post", route: "ScrappingDetails" },
                    { icon: "Post", label: "Sell Post", route: "ScrappingDetails" },
                    ].map((item, index) => (
                        <View key={index} style={[style.card, { marginRight: "3%" }]}>
                            <Card containerStyle={{ padding: 20 }} ispress={true} onPress={() => navigation.navigate(item.route)}>
                                <Images
                                    type="svg"
                                    name={item.icon as any}
                                    width={windowwidth * 0.15}
                                    height={windowwidth * 0.15}
                                />
                            </Card>
                            <Text family="GRegular" style={style.label}>{item.label}</Text>
                        </View>
                    ))}
                </Flexcomponent>
            </View>
        </Mainview>
    )
}

export default CarScrapping;