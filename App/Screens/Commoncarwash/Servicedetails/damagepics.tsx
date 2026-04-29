import React, { useCallback, useEffect, useState } from "react"
import Text from "../../../Components/text"
import Flexcomponent from "../../../Components/flexcomponent"
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions"
import { Pressable, StyleProp, View, ViewStyle } from "react-native"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import Images, { icons } from "../../../Utilities/images"
import Sheet from "../../../Components/bottomsheetmodal"
import SourceData from "../../../Components/Field/FileUpolad/SourceData"
import Picker from "../../../Components/Field/FileUpolad/Picker"
import FileUpload from "../../../Components/Field/FileUpolad"
import VectorIcons from "../../../Utilities/vectorIcons"
import { photosprops } from "../../../Actions/Types/phototypes"
import ServiceChecklist from "./servicechecklist"
import { checkcamerapermission } from "../../../Utilities/permission"
import { launchCamera, launchImageLibrary, CameraOptions, ImagePickerResponse } from 'react-native-image-picker';
import { mediaConfiguration } from "../../../Components/Field/FileUpolad/Picker/Helper"
import { Input } from "../../../Components/Field"
import { Fontfamily } from "../../../Utilities/uiasset"

interface photos {
    title?: string,
    image?: any,
}
interface uploadphotos {
    conatinerstyle?: StyleProp<ViewStyle>,
    title: string,
    isright?: boolean,
    customarr?: photos[],
    isadd?: boolean,
    addnfn?: (value: any) => void,
    removefn?: (i: number) => void,
    onchangeissues?: (value: string) => void,
    issues?: string


}


const Damagepicture: React.FC<uploadphotos> = React.memo(({
    title,
    customarr = [],
    addnfn,
    removefn,
    onchangeissues,
    issues

}) => {
    const { theme } = useCustomHooks()

    const [isopen, setIsopen] = useState(false)

    const opencamera = async () => {
        await checkcamerapermission()
        const res: any = await launchCamera(mediaConfiguration.uploadSettings as CameraOptions);
        const result = res.assets[0]
        delete result?.base64
        console.log(result, "resultresultresult");
        addnfn?.(result)


    }

    return (
        <>
            <ServiceChecklist
                title={title}
                isright={true}
                open={isopen}
                ischeck
                // ischeck={photos?.every((e) => e?.image?.uri)}
                isopen={() => setIsopen(!isopen)} />

            <View style={[{ paddingHorizontal: "10%", display: isopen ? "flex" : "none" }]} >
                <Text size="small" family="GRegular" >Please upload clear photos of your vehicle before the wash. This helps us ensure service quality and record the car’s current condition.</Text>
                <Flexcomponent top={"5%"} style={{ flexWrap: "wrap", alignItems: "flex-start", }} justifyContent="space-between" >
                    {customarr?.map((e: any, i: number) => (
                        <View style={{ alignItems: "center", marginTop: (i == 3 || i == 2) ? "5%" : 0 }} >
                            <View style={{ paddingHorizontal: "5%", backgroundColor: theme.cardBg, borderRadius: borderradius * 0.5, width: windowwidth * 0.3, height: windowheight * 0.1, justifyContent: "center", alignItems: "center" }} >
                                <Images type="image" source={{ uri: e?.image?.uri }} resizeMode="stretch" style={{ width: "95%", height: "80%", borderRadius: borderradius * 0.5, }} />
                                <Pressable onPress={() => removefn?.(i)} style={{ position: "absolute", width: windowwidth * 0.075, height: windowwidth * 0.075, top: 0, right: 0, }} >
                                    <View style={{ width: "50%", height: "50%", backgroundColor: "#000000", borderRadius: borderradius * 3, alignSelf: "flex-end", justifyContent: "center", alignItems: "center" }} >
                                        <VectorIcons
                                            family="AntDesign"
                                            size={windowwidth * 0.025}
                                            name={"close"}
                                            iconcolor={theme.white}
                                        />
                                    </View>
                                </Pressable>
                            </View>
                            <Text top={"5%"} size="small" family="GRegular" >{e.title}</Text>

                        </View>))}

                    {customarr?.length < 4 ?
                        <Pressable onPress={() => opencamera()} style={{ paddingHorizontal: "5%", backgroundColor: theme.cardBg, borderRadius: borderradius * 0.5, width: windowwidth * 0.3, height: windowheight * 0.1, justifyContent: "center", alignItems: "center", marginTop: 0 }} >
                            <Images
                                type="image"
                                source={icons.Upload}
                                width={windowwidth * 0.1}
                                height={windowwidth * 0.1}
                                borderRadius={0} />

                            <Text top={"10%"} size="small" family="GRegular" >+Add </Text>

                        </Pressable> : null}
                </Flexcomponent>
                {/* <Text top={"5%"} size="semimedium" family="GMedium" >write about issues</Text> */}
                <Input
                    label={"About issues"}
                    labelStyle={{ marginTop: "2.5%", fontFamily: Fontfamily.GMedium }}
                    inputprops={{
                        multiline: true
                    }}
                    style={{ maxHeight: windowheight * 0.125 }}
                    value={issues}
                    onChange={(value: any) => onchangeissues?.(value)}
                />

            </View>
        </>
    )


})

export default Damagepicture