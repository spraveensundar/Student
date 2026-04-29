import React from "react"
import Card from "../../Components/Card"
import { borderradius } from "../../Utilities/dimensions"
import useCustomHooks from "../../Actions/Hooks/customhook"
import { FlatList } from "react-native"
import Tradecomponent from "./tradecomponent"

interface Wishlistcomponentprops {

}

const Wishlistcomponent: React.FC<Wishlistcomponentprops> = () => {
    const { theme } = useCustomHooks()
    const list = [1, 2, 3, 4, 5, 6, 7,]

    return (
         <>
            <FlatList
                data={list}
                renderItem={() => (
                    <Tradecomponent
                        iswishlist={true}
                    />
                )}
            />
        </>
    )

}

export default Wishlistcomponent