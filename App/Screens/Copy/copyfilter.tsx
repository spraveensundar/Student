


import React from "react"
import { borderradius } from "../../Utilities/dimensions"
import useCustomHooks from "../../Actions/Hooks/customhook"
import Sheet from "../../Components/bottomsheet"
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Flexcomponent from "../../Components/flexcomponent";
import SelectList from "../Profile/Preference/SelectList";
import { View } from "react-native";

interface Copyfiltercomponentprops {
    sheetref: React.RefObject<BottomSheetModal | null>;
    currency: string
    onchange: (val: string) => void

}

const Copyfiltercomponent: React.FC<Copyfiltercomponentprops> = ({
    sheetref,
    currency,
    onchange
}) => {
    const { theme } = useCustomHooks()

    return (
        <Sheet
            sheetref={sheetref}
            snappoint={["20%"]}
            custominterface={true}
            backgroundStyle={{
                backgroundColor: theme.background
            }}
        >
            <View style={{ paddingHorizontal: "5%" ,paddingVertical:"7.5%"}} >
                <SelectList
                    selectedValue={currency}
                    onChange={(val) => {onchange(val)
                        sheetref.current?.dismiss()
                    }}
                    options={[
                        { label: 'Spot Copy', value: 'spot' },
                        { label: 'Future Copy', value: 'future' },
                    ]}
                    activetext={theme.darktext}
                />
            </View>
        </Sheet>
    )

}

export default Copyfiltercomponent