import React, { useEffect, useState } from "react";

import Flexcomponent from "./flexcomponent";
import useCustomHooks from "../Actions/Hooks/customhook";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import Images, { icons } from "../Utilities/images";
import { windowheight, windowwidth } from "../Utilities/dimensions";

interface reviewstart {
    value: number,
    onchange: (index: number) => void,
    containerstyle?: StyleProp<ViewStyle>,
    maxcount?: number
}
const Reviewstars: React.FC<reviewstart> = React.memo(({
    containerstyle,
    maxcount = 5,
    value,
    onchange
}) => {
    const { theme, navigation } = useCustomHooks()
    const [star, setStar] = useState<number[]>([])

    useEffect(() => {
        if (maxcount > 1) {
            let stararr = []
            for (let i = 0; i < maxcount; i++) {
                stararr.push(i)
            }
            setStar(stararr)
        }
    }, [maxcount])

    const [emptystart, setEmptystar] = useState(false)
    useEffect(() => {
        if (value == 0 && !emptystart) {
            setEmptystar(true)
        }
    }, [value,emptystart])
    return (
        <Flexcomponent style={containerstyle} >
            {star.map((e, i: number) => (
                <Pressable onPress={() => {
                    if (emptystart) {
                        onchange(-1)
                        setEmptystar(false)
                    }
                    else onchange(i)
                }} >
                    <Images
                        type="image"
                        source={value >= i ? icons?.Activestar : icons.Inactivestar}
                        width={windowwidth * 0.085}
                        height={windowheight * 0.085}
                    />
                </Pressable>
            ))

            }
        </Flexcomponent>
    )

})

export default Reviewstars;