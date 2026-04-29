import React from "react";
import { Pressable, View } from "react-native";
import { RouteProp } from "@react-navigation/native";



import useCustomHooks from "../Actions/Hooks/customhook";
import Mainview from "./mainview";
import { Stacknavigationtypes } from "../Navigations/stacknavigationtypes";
import Images, { icons } from "../Utilities/images";
import ImageView from "react-native-image-viewing";
import { borderradius, windowwidth } from "../Utilities/dimensions";
import VectorIcons from "../Utilities/vectorIcons";




interface Props {
    imageUrls: any,
    visible:boolean,
    onclose:() => void,
    imageIndex?: number,
}

const FileView: React.FC<Props> = ({ visible,onclose, imageUrls, imageIndex= 0}) => {
    
    const { theme, navigation } = useCustomHooks();
    const images: any = imageUrls?.length > 0 ? imageUrls : []

    console.log('imagesimages', images, JSON.stringify(images, null, 2))
    return (
        <ImageView
            images={images}
            imageIndex={imageIndex}
            visible={visible}
            onRequestClose={() => onclose?.()}
        />

    );
};

export default FileView;
