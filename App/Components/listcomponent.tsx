import { StyleProp, View } from "react-native"
import Card from "./Card"
import Images from "../Utilities/images"
import { windowwidth } from "../Utilities/dimensions"
import { ImageStyle } from "@d11/react-native-fast-image"
import Text from "./text"
import React from "react"
import VectorIcons from "../Utilities/vectorIcons"

interface Listcomponentprops {
    src?: any,
    imagetype?: "image" | "svg";
    lefticonstyle?: StyleProp<ImageStyle>,
    lefticon?: React.ReactNode,
    title: string,
    righticon?: React.ReactNode,
    onpress?: () => void,
    top?: any

}

const Listcomponent: React.FC<Listcomponentprops> = ({
    src,
    imagetype = "image",
    lefticonstyle,
    lefticon,
    title,
    righticon,
    onpress,
    top = "5%"
}) => {
    console.log('imagetype', imagetype);
    return (
        <Card onPress={onpress} ispress={true} containerStyle={{ flexDirection: "row", alignItems: "center", width: "100%", padding: "2.5%", marginTop: top ? top : 0 }} >
            <View style={{ width: "15%", justifyContent: "center", alignItems: "center" }} >
                {lefticon ?
                    lefticon :
                    <Images
                        type={imagetype}
                        {...(imagetype === "image" ? { source: src } : { name: src })}
                        width={windowwidth * 0.075}
                        height={windowwidth * 0.075}
                        style={lefticonstyle}
                    />}
            </View>

            <View style={{ width: "70%", justifyContent: "center" }} >
                <Text size="medium" family="GMedium" >{title}</Text>
            </View>

            <View style={{ width: "15%", justifyContent: "center", alignItems: "flex-end" }} >
                {righticon ?
                    righticon :
                    <VectorIcons
                        family="Feather"
                        name={"chevron-right"}
                        size={windowwidth * 0.07}
                    />
                }
            </View>

        </Card>
    )

}

export default Listcomponent