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

interface photos {
    title?: string,
    image?: any,
}
interface uploadphotos {
    onchangephotos: (value: photos[]) => void,
    conatinerstyle?: StyleProp<ViewStyle>,
    title: string,
    isright?: boolean,
    customarr?: photos[],
    isadd?: boolean,
    addnfn?: () => void


}


const Uploadphotos: React.FC<uploadphotos> = React.memo(({
    onchangephotos,
    conatinerstyle,
    title,
    isright,
    customarr,
    isadd,
    addnfn
}) => {
    const { theme } = useCustomHooks()

    const intiialstate = [
        {
            title: "",
            image: ""
        },
    ]


    const [photos, setPhotos] = useState<photos[]>(customarr ?? intiialstate)
    const [selindex, setSelindex] = useState<number>(0)
    const cancelpress = useCallback((i: number) => {
        setPhotos(prev => {
            const updated = [...prev];
            updated[i] = {
                ...prev[i],
                image: "",
            };
            return updated;
        });
    }, [])



    const updatearray = useCallback(() => {
        onchangephotos?.(photos)
    }, [photos]);
    useEffect(() => {
        onchangephotos?.(photos)
    }, [updatearray])


    const [isopen, setIsopen] = useState(false)

    console.log("inspection", photos, selindex);
    const opencamera = async (i: number) => {
        await checkcamerapermission()
        const res: any = await launchCamera(mediaConfiguration.uploadSettings as CameraOptions);
        const result = res.assets[0]
        delete result?.base64
        console.log(result, "resultresultresult");
        setPhotos(prev => {
            const updated = [...prev];
            updated[i] = {
                ...prev[i],
                image: result,
            };
            return updated;
        });

    }

    return (
        <>
            <ServiceChecklist
                title={title}
                isright={true}
                open={isopen}
                ischeck={photos?.every((e) => e?.image?.uri)}
                isopen={() => setIsopen(!isopen)} />

            <View style={[{ paddingHorizontal: "10%", display: isopen ? "flex" : "none" }]} >
                <Text size="small" family="GRegular" >Please upload clear photos of your vehicle before the wash. This helps us ensure service quality and record the car’s current condition.</Text>
                <Flexcomponent top={"5%"} style={{ flexWrap: "wrap", alignItems: "flex-start", }} justifyContent="space-between" >
                    {photos.map((e: any, i: number) => (
                        <View style={{ alignItems: "center", width: "47.5%", marginTop: 10 }} >
                            {!e?.image?.uri ?
                                <Pressable onPress={() => opencamera(i)} style={{ paddingHorizontal: "5%", backgroundColor: theme.cardBg, borderRadius: borderradius * 0.5, width: windowwidth * 0.3, height: windowheight * 0.1, justifyContent: "center", alignItems: "center" }} >
                                    <Images
                                        type="image"
                                        source={icons.Upload}
                                        width={windowwidth * 0.1}
                                        height={windowwidth * 0.1}
                                        borderRadius={0}

                                    />
                                </Pressable>
                                :
                                <View style={{ paddingHorizontal: "5%", backgroundColor: theme.cardBg, borderRadius: borderradius * 0.5, width: windowwidth * 0.3, height: windowheight * 0.1, justifyContent: "center", alignItems: "center" }} >
                                    <Images type="image" source={{ uri: e?.image?.uri }} resizeMode="stretch" style={{ width: "95%", height: "80%", borderRadius: borderradius * 0.5, }} />
                                    <Pressable onPress={() => cancelpress(i)} style={{ position: "absolute", width: windowwidth * 0.075, height: windowwidth * 0.075, top: 0, right: 0, }} >
                                        <View style={{ width: "50%", height: "50%", backgroundColor: "#000000", borderRadius: borderradius * 3, alignSelf: "flex-end", justifyContent: "center", alignItems: "center" }} >
                                            <VectorIcons
                                                family="AntDesign"
                                                size={windowwidth * 0.025}
                                                name={"close"}
                                                iconcolor={theme.white}
                                            />
                                        </View>
                                    </Pressable>
                                </View>}
                            <Text style={{ textAlign: "center" }} top={"5%"} size="small" family="GRegular" >{e.title}</Text>

                        </View>))}


                    
                </Flexcomponent>


            </View>
        </>
    )


})

export default Uploadphotos