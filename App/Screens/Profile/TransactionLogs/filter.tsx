

import React, { useContext, useState } from "react"
import { Pressable, View } from "react-native"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import Sheet from "../../../Components/bottomsheet"
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Text from "../../../Components/text";
import VectorIcons from "../../../Utilities/vectoricons";
import { borderradius, RFvalue, windowheight, windowwidth } from "../../../Utilities/dimensions";
import Flexcomponent from "../../../Components/flexcomponent";
import { Button, Dropdown, InputDateTime } from "../../../Components/Field";
import ThemeContext from "../../../Utilities/themecontext";
import { Colors } from "../../../Utilities/uiasset";
import { useDispatch } from "react-redux";
import { update_transactionlogdata } from "../../../Slices/helper";


interface Logfilterprops {
    sheetref: React.RefObject<BottomSheetModal | null>;
    snappoint?: any;
    onselect?: (paylaod: any) => void
    assetHistory?: boolean

}

const Logfilter: React.FC<Logfilterprops> = ({
    sheetref,
    snappoint,
    onselect,
    assetHistory = false
}) => {
    const [startdate, setStartdate] = useState<any>("")
    const [enddate, setEnddate] = useState<any>("")

    const theme = useContext(ThemeContext)
    const dispatch = useDispatch()

    const filter1: any = [
        { label: "All", value: "all" },
        { label: "Deposit", value: "deposit" },
        { label: "Withdraw", value: "withdraw" },
        { label: "Internal transfer", value: "internaltransfer" }]

    const filter2: any = [
        { label: "All", value: "all" },
        { label: "Credit", value: "credit" },
        { label: "Debit", value: "debit" }]

    const [fill1, setFill1] = useState("all")
    const [fill2, setFill2] = useState("all")

    return (
        <Sheet
            sheetref={sheetref}
            snappoint={snappoint}
            headertitle="Filter"
        >
            {/* {filterdata?.map((e: string) => (
                <Pressable onPress={() => onselect?.(e)} style={{ paddingVertical: "4%", width: "50%" }} >
                    <Text size="medium" color={theme.primarytext} >{e}</Text>
                </Pressable>
            ))} */}
            <Flexcomponent top={"5%"} justifyContent="space-between" >

                <Dropdown
                    list={filter1}
                    value={fill1}
                    onChange={(value) => setFill1(value?.value)}
                    themes={theme}
                    conatinerstyle={{ width: assetHistory ? "45%" : "100%", height: windowheight * 0.05 }}

                />



                <Dropdown
                    list={filter2}
                    value={fill2}
                    onChange={(value) => setFill2(value?.value)}
                    themes={theme}
                    conatinerstyle={{ width: "45%", height: windowheight * 0.05 }}

                />

            </Flexcomponent>


            <Flexcomponent justifyContent="space-between" >
                <View style={{ width: "45%", alignItems: "center" }} >
                    {/* <Text family="regular" fontSize={RFvalue(13)} color={theme.tabactive} >Start Date</Text> */}
                    <Flexcomponent height={windowheight * 0.06} style={{ borderRadius: borderradius * 0.5 }} width={"100%"} bakgroundcolor={theme.card} top={"5%"}  >
                        <InputDateTime
                            placeHolder="start date"
                            inputType="date"
                            value={startdate}
                            onConfirm={(text: any) => {
                                console.log(text, "hellllooooooooooooo");
                                setStartdate(text)
                            }}
                            containerstyle={{
                                height: "100%",
                                top: 3
                            }}
                            datePickerProps={{
                                maximumDate: new Date()
                            }}
                            themes={theme}
                        />
                        <VectorIcons
                            name={"calendar"}
                            family="Feather"
                            iconcolor={theme.secondarytext}
                            size={windowwidth * 0.045}
                        />
                    </Flexcomponent>
                </View>

                <View style={{ width: "45%", marginLeft: "5%", alignItems: "center" }} >
                    {/* <Text family="regular" fontSize={RFvalue(13)} color={theme.tabactive} >End Date</Text> */}
                    <Flexcomponent height={windowheight * 0.06} style={{ borderRadius: borderradius * 0.5 }} width={"100%"} bakgroundcolor={theme.card} top={"5%"}  >
                        <InputDateTime
                            placeHolder="end date"
                            inputType="date"
                            value={enddate}
                            onConfirm={(text: any) => {
                                console.log(text, "hellllooooooooooooo");
                                setEnddate(text)
                            }}
                            containerstyle={{
                                height: "100%",
                                top: 3
                            }}
                            datePickerProps={{
                                maximumDate: new Date()
                            }}
                            themes={theme}
                        />
                        <VectorIcons
                            name={"calendar"}
                            family="Feather"
                            iconcolor={theme.secondarytext}
                            size={windowwidth * 0.045}
                        />
                    </Flexcomponent>
                </View>

            </Flexcomponent>

            <Flexcomponent justifyContent="space-around" top={"10%"} >
                <Button
                    title="Reset"
                    style={{ height: windowheight * 0.05, alignSelf: "center", borderRadius: borderradius * 0.5, borderColor: Colors.green, width: "40%", justifyContent: "center", alignItems: "center", borderWidth: 1 }}
                    onPress={() => {
                        setStartdate("")
                        setEnddate("")
                        setFill1("All")
                        setFill2("All")
                    }}
                    textStyle={{
                        color: theme.textinput
                    }}
                />

                <Button
                    title="Apply"
                    style={{ height: windowheight * 0.05, alignSelf: "center", borderRadius: borderradius * 0.5, backgroundColor: Colors.green, width: "40%", justifyContent: "center", alignItems: "center" }}
                    onPress={() => {
                        const payload = {
                            startdate: startdate ? new Date(startdate).getTime() : "",
                            enddate: enddate ? new Date(enddate).getTime() : "",
                            transferType: fill1,
                            selectedType: fill2,
                            newchange: true
                        }
                        dispatch(update_transactionlogdata(payload))
                        sheetref?.current?.dismiss()
                    }}
                />
            </Flexcomponent>



        </Sheet>
    )

}

export default Logfilter