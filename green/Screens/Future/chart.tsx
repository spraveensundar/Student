import React from "react"
import { View } from "react-native"
import Images, { image } from "../../Utilities/images"
import { windowheight } from "../../Utilities/dimensions"
import useCustomHooks from "../../Actions/Hooks/customhook"

interface Chartprops {
}

const Chart: React.FC<Chartprops> = ({

}) => {
    const { theme } = useCustomHooks()
    return (
        <View style={{ flex: 1 }} >
            <Images
                type="image"
                source={theme.theme == "dark" ? image.Chart : image.Chartlight}
                width={"100%"}
                height={"100%"}
                resizeMode="stretch"
            />
        </View>
    )
}

export default Chart