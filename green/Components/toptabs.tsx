import React from "react"
import { Pressable, StyleSheet, View } from "react-native"
import useCustomHooks from "../Actions/Hooks/customhook"
import Flexcomponent from "./flexcomponent"
import Text from "./text"
import { windowheight, windowwidth } from "../Utilities/dimensions"

interface Toptabsprops {
    width?: any,
    top?: any,
    tabs: any,
    activeindex: number,
    onchangeindex: (index: number) => void
}

const Toptabs: React.FC<Toptabsprops> = ({
    width = windowwidth,
    top,
    tabs=[],
    activeindex = 0,
    onchangeindex

}) => {
    const { theme } = useCustomHooks()
    const styles = style(theme, tabs)
    return (
        <Flexcomponent justifyContent="space-around" width={width} style={{ alignSelf: "center", borderBottomWidth: 1, borderBottomColor: theme.boderColor, height: windowheight * 0.065, marginTop:top }} >
            {tabs?.map((e:any, i:number) => (
                <Pressable onPress={() => onchangeindex(i)} style={activeindex == i ? styles.activetab : styles.inactivetab} >
                    <Text color={activeindex == i ? theme.tabactive : "#797979"} >{e}</Text>
                </Pressable>
            ))}
        </Flexcomponent>
    )

}

export default Toptabs


const style = (theme: any, tabs: any) => StyleSheet.create({
    activetab: {
        width: (windowwidth / tabs?.length) * 0.9,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: theme.tabactive,
        height: "100%"
    },
    inactivetab: {
        width: (windowwidth / tabs?.length) * 0.9,
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    }
})