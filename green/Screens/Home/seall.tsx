

import React from "react"
import useCustomHooks from "../../Actions/Hooks/customhook"
import { FlatList, View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import Mainview from "../../Components/mainview";
import { image } from "../../Utilities/images";
import Trade from "./trade";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Seeall'>;


const Seeall: React.FC<Props> = (props) => {
    const { theme } = useCustomHooks()
    const { type } = props?.route?.params

    const normaltrade = [
        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },

        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },


        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },

        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },
        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },

        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },


        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },

        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },

        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },

        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },


        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },

        {
            title: "Hot picks",
            image: image.Normaltrade,
            price: 400,
            change: 21,
            change_percentage: 0.78
        },
    ]


    const populartrade = [
        {
            title: "SEI",
            des: "Sei",
            image: image.Sei,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "gain"
        },

        {
            title: "FUN",
            des: "fun",
            image: image.Fun,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "sold"

        },
        {
            title: "FUN",
            des: "fun",
            image: image.Fun,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "sold"

        },

        {
            title: "SEI",
            des: "Sei",
            image: image.Sei,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "gain"
        },

        {
            title: "SEI",
            des: "Sei",
            image: image.Sei,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "gain"
        },

        {
            title: "FUN",
            des: "fun",
            image: image.Fun,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "sold"

        },
        {
            title: "FUN",
            des: "fun",
            image: image.Fun,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "sold"

        },

        {
            title: "SEI",
            des: "Sei",
            image: image.Sei,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "gain"
        },

        {
            title: "SEI",
            des: "Sei",
            image: image.Sei,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "gain"
        },

        {
            title: "FUN",
            des: "fun",
            image: image.Fun,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "sold"

        },
        {
            title: "FUN",
            des: "fun",
            image: image.Fun,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "sold"

        },

        {
            title: "SEI",
            des: "Sei",
            image: image.Sei,
            price: 248652,
            change: 21,
            change_percentage: 0.78,
            status: "gain"
        },

    ]

    const {navigation} = useCustomHooks()

    return (
        <Mainview
            headertitle={type == "mosttrade" ? "Most Trade" : "Popular Trade"}
            isscollable={false}
            onleftfn={() =>  navigation?.goBack()}
        >
            <View style={{ flex: 1 }} >
                <FlatList
                    data={ type == "mosttrade" ? normaltrade : populartrade}
                    numColumns={2}
                    renderItem={({ item, index }) => (
                        <Trade
                            type="normal"
                            image={item?.image}
                            price={item?.price}
                            change={item?.change}
                            change_percentage={item?.change_percentage}
                            title={item?.title}
                        />
                    )}
                    columnWrapperStyle={{
                        justifyContent: "space-between"
                    }}
                />
            </View>
        </Mainview>
    )

}

export default Seeall