import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../Navigations/navigationtypes";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import Mainview from "../Components/mainview";
import { windowheight, windowwidth } from "../Utilities/dimensions";
import useCustomHooks from "../Actions/Hooks/customhook";
import Sheet from "../Components/bottomsheet";
import Images, { icons } from "../Utilities/images";
import { Button } from "../Components/Field";


type Props = NativeStackScreenProps<Stacknavigationtypes, 'Test'>;


const Test: React.FC<Props> = () => {


  
    return (
        <Mainview
            headertitle="Test"
            isscollable={true}
            ismainloading={false}
            isnodata={false}
        >
      
        </Mainview>
    )

}

export default Test

