import React from "react"
import { View } from "react-native"
import useCustomHooks from "../Actions/Hooks/customhook"
import Mainview from "./mainview"

interface Tradecomponentprops {

}

const Tradecomponent: React.FC<Tradecomponentprops> = () => {
    const {theme} = useCustomHooks()
    return (
     <Mainview
      headertitle=""
     />
    )

}

export default Tradecomponent