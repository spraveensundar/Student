import React from "react"
import Card from "../../Components/Card"
import { borderradius } from "../../Utilities/dimensions"
import useCustomHooks from "../../Actions/Hooks/customhook"
import Flexcomponent from "../../Components/flexcomponent"
import { FlatList } from "react-native"
import Tradecomponent from "./tradecomponent"

interface Publicportfolioprops {

}

const Publicportfolio: React.FC<Publicportfolioprops> = () => {
    const { theme } = useCustomHooks()
    const list = [1, 2, 3, 4, 5, 6, 7,]
    return (
        <>
            <FlatList
                data={list}
                renderItem={() => (
                    <Tradecomponent
                        iswishlist={false}
                    />
                )}
            />
        </>
    )

}

export default Publicportfolio