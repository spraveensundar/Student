import React from "react"
import { Pressable, StyleProp, View, ViewProps, ViewStyle } from "react-native"
import { borderradius, windowwidth } from "../../Utilities/dimensions"
import Text from "../../Components/text"
import Flexcomponent from "../../Components/flexcomponent"
import Images, { icons } from "../../Utilities/images"
import useCustomHooks from "../../Actions/Hooks/customhook"
import { SetFutureparams } from "../../Slices/helper"


interface Exploreprops {

}


const Explore: React.FC<Exploreprops> = ({


}) => {
    const { navigation, dispatch } = useCustomHooks()
    const explore = [
        {
            title: "Option Trading",
            image: <Images
                type="svg"
                name={"Optionhome"}
                width={windowwidth * 0.075}
                height={windowwidth * 0.075}
            />
        },
        {
            title: "Future Trading",
            image: <Images
                type="svg"
                name="Futurehome"
                width={windowwidth * 0.075}
                height={windowwidth * 0.075}
            />
        },
        {
            title: "Market",
            image: <Images
                width={windowwidth * 0.075}
                height={windowwidth * 0.075}
                type="svg"
                name="Markethome"
            />
        },
        {
            title: "Copy Trade",
            image: <Images
                type="svg"
                name="Copyhome"
                width={windowwidth * 0.075}
                height={windowwidth * 0.075}
            />
        },

        {
            title: "Demo Trade",
            image: <Images
                type="image"
                source={icons.Demo}
                width={windowwidth * 0.075}
                height={windowwidth * 0.075}
            />
        },
    ]

    const onselect = (e: any, i: number) => {
        console.log(i);

        switch (i) {
            case 0:
                navigation.navigate("Option")
                break;

            case 1:
                navigation.navigate("Future")
                break;
            case 2:
                navigation.navigate("Market")
                break;
            case 3:
                navigation.navigate("Copytrade")
                break;
            case 4:
                dispatch(SetFutureparams("trade"))
                navigation.navigate('Dashboard', { screen: 'Future' })
                break;

            default:
                break;
        }
    }
    const { theme } = useCustomHooks()
    return (

        <Flexcomponent alignItems="flex-start" justifyContent="space-between" style={{ paddingRight: "2.5%" }} top={"5%"}  >
            {explore?.map((e: any, i: number) => (
                <Pressable onPress={() => onselect(e, i)} style={{ width: windowwidth * 0.15 }} >
                    <View style={{ width: windowwidth * 0.16, height: windowwidth * 0.15, backgroundColor: theme.card, borderRadius: borderradius * 0.5, justifyContent: "center", alignItems: "center" }} >
                        {e?.image}
                    </View>
                    <Text style={{ textAlign: "center", marginTop: "5%" }} >{e.title}</Text>
                </Pressable>))}

        </Flexcomponent>

    )
}

export default Explore