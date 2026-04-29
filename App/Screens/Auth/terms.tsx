import React, { useState } from "react";
import Mainview from "../../Components/mainview";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { View } from "react-native";
import { windowheight } from "../../Utilities/dimensions";
import styles from "./styles";
import Text from "../../Components/text";
import Checkbox from "../../Components/Field/Input/Checkbox";
import { Fontfamily } from "../../Utilities/uiasset";
import { Button } from "../../Components/Field";
import { Toastfn } from "../../Utilities/helerfunction";
import { setItem } from "../../Actions/Storage/localStorage";



const Termsandcondtions: React.FC = () => {
    const { theme, navigation, } = useCustomHooks()
    const style = styles(theme)
    const [isChecked, setIsChecked] = useState(false);

    const callNext = async () => {
        setItem("accTeam", "true")
        //dispatch(update_Team(true))
        navigation?.navigate("FetchLocation")
    }

    return (
        <Mainview
            headertitle="Terms & Conditions"
            custombottomcontent={
                <View style={{
                    height: windowheight * 0.15, justifyContent: "space-evenly", alignItems: "center",
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }} >
                    <Checkbox
                        label={"Privacy & policy"}
                        onChange={(checked) => { setIsChecked(checked) }}

                        labelStyle={{
                            fontFamily: Fontfamily.GRegular
                        }}
                    />
                    <Button onPress={() => {
                        !isChecked ?
                            Toastfn("Please accept Terms & Conditions")
                            :
                            callNext()
                    }

                    } title="Continue" />
                </View>
            }
            isscollable={true}
        >
            <Text top={"5%"} size="semilarge" family="GMedium" >Liability for Damages & Theft</Text>
            <Text size="medium" family="GRegular" >The cleaner will not be held responsible for any loss, theft, or damage to personal belongings left inside the car.</Text>
            <Text size="medium" top={"1%"} family="GRegular" >The customer is responsible for removing valuables before handing over the car for cleaning.</Text>
            <Text size="medium" top={"1%"} family="GRegular" >Any disputes arising from misunderstandings unrelated to the cleaner’s direct actions will not be the cleaner’s liability.</Text>

            <Text top={"5%"} size="semilarge" family="GMedium" >Liability for Damages & Theft</Text>
            <Text size="medium" family="GRegular" >The cleaner will not be held responsible for any loss, theft, or damage to personal belongings left inside the car.</Text>
            <Text size="medium" top={"1%"} family="GRegular" >The customer is responsible for removing valuables before handing over the car for cleaning.</Text>
            <Text size="medium" top={"1%"} family="GRegular" >Any disputes arising from misunderstandings unrelated to the cleaner’s direct actions will not be the cleaner’s liability.</Text>

            <Text top={"5%"} size="semilarge" family="GMedium" >Liability for Damages & Theft</Text>
            <Text size="medium" family="GRegular" >The cleaner will not be held responsible for any loss, theft, or damage to personal belongings left inside the car.</Text>
            <Text size="medium" top={"1%"} family="GRegular" >The customer is responsible for removing valuables before handing over the car for cleaning.</Text>
            <Text size="medium" top={"1%"} family="GRegular" >Any disputes arising from misunderstandings unrelated to the cleaner’s direct actions will not be the cleaner’s liability.</Text>

            <Text top={"5%"} size="semilarge" family="GMedium" >Liability for Damages & Theft</Text>
            <Text size="medium" family="GRegular" >The cleaner will not be held responsible for any loss, theft, or damage to personal belongings left inside the car.</Text>
            <Text size="medium" top={"1%"} family="GRegular" >The customer is responsible for removing valuables before handing over the car for cleaning.</Text>
            <Text size="medium" top={"1%"} family="GRegular" >Any disputes arising from misunderstandings unrelated to the cleaner’s direct actions will not be the cleaner’s liability.</Text>

        </Mainview>
    )

}

export default Termsandcondtions;