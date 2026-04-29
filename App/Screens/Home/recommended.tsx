import React, { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { borderradius, RFvalue, windowheight, windowwidth } from "../../Utilities/dimensions";
import Images, { icons } from "../../Utilities/images";
import Text from "../../Components/text";
import { Colors } from "../../Utilities/uiasset";


const Recommended: React.FC = () => {
    const service = [
        {
            image: icons.ReService1,
            name: "Exterior & Interior Cleaning",
            price: "1600"
        },
        {
            image: icons.ReService2,
            name: "Exterior & Interior Cleaning",
            price: "1600"
        },
        {
            image: icons.ReService1,
            name: "Exterior & Interior Cleaning",
            price: "1600"
        },
        {
            image: icons.ReService2,
            name: "Exterior & Interior Cleaning",
            price: "1600"
        },
        {
            image: icons.ReService2,
            name: "Exterior & Interior Cleaning",
            price: "1600"
        },
        {
            image: icons.ReService1,
            name: "Exterior & Interior Cleaning",
            price: "1600"
        },

        {
            image: icons.ReService2,
            name: "Exterior & Interior Cleaning",
            price: "1600"
        },
        {
            image: icons.ReService1,
            name: "Exterior & Interior Cleaning",
            price: "1600"
        },
    ]


    return (
        <View style={{ marginTop: "5%" }} >
            <FlashList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={service}
                ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                renderItem={({ item, index }) => (
                    <View style={{ width: windowwidth * 0.47, backgroundColor: "#F8F8F8", borderRadius: borderradius * 0.5, paddingBottom: windowwidth * 0.025 }} >
                        <Images
                            type="image"
                            source={item?.image}
                            style={{ width: "100%", height: windowheight * 0.15 }}
                            resizeMode="cover"
                        />
                        <View style={{ marginLeft: "5%", marginTop: "2.5%" }} >
                            <Text style={{ fontSize: RFvalue(13) }} family="GBold" >Exterior & Interior Cleaning</Text>
                            <Text size="medium" color={Colors.green} family="GBold" >₹ 1600</Text>

                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default Recommended;