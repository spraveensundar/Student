

import React from "react"
import { Pressable, View } from "react-native"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import Sheet from "../../../Components/bottomsheet"
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Text from "../../../Components/text";


interface Creditdebitprops {
    sheetref: React.RefObject<BottomSheetModal | null>;
    snappoint?: any;
    filterdata?: any,
    onselect?: (value: any) => void

}

const Creditdebit: React.FC<Creditdebitprops> = ({
    sheetref,
    snappoint,
    filterdata = [],
    onselect
}) => {
    const { theme } = useCustomHooks()
    return (
        <Sheet
            sheetref={sheetref}
            snappoint={snappoint}
            headertitle="Select Filter"
        >
            {filterdata?.map((e: string) => (
                <Pressable onPress={() => onselect?.(e)} style={{ paddingVertical: "4%", width: "50%" }} >
                    <Text size="medium" color={theme.primarytext} >{e}</Text>
                </Pressable>
            ))}
        </Sheet>
    )

}

export default Creditdebit