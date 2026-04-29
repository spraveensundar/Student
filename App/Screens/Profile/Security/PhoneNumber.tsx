import React, { useEffect } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import Confirm from "./Helpers/Confirm";
import Description from "../Description";
import EditCard from "./Helpers/EditCard";
import Text from "../../../Components/text";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { formatToReadableDate } from "../../../Utilities/helerfunction";
import { useLazyChangeOldMobileNumberQuery } from "../../../Slices/auth";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'PhoneNumber'>;

const PhoneNumber: React.FC<Props> = () => {
    const { theme, bottomsheetref, openbottomsheet, closebottomsheet, navigation, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);

    const { mobileNumber, updatedAt } = useSelector((state: any) => state.auth.userData);

    const [changePhone, { data }] = useLazyChangeOldMobileNumberQuery();
    useEffect(() => {
        if (!data) return;
        console.log("API Response:", data);
        if (data?.result?.data?.success) {
            successtoast("Success", data.result.data.message);
            navigation.navigate("ChangeNumber");
        } else {
            failuretoast("Error", data?.result?.data?.message || "Something went wrong!");
        } 
    }, [data]);

    const handleChangePhone = async () => {
        try {
            await changePhone(true);
            console.log("API called successfully");
        } catch (error) {
            console.error("Error calling API:", error);
            failuretoast("Error", "Request failed!");
        }
    };


    return (
        <Mainview
            isheader={true}
            headertitle={"Phone Number"}
            isscollable={false}
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>
                <EditCard
                    value={mobileNumber}
                    text={`Added : ${formatToReadableDate(updatedAt)}`}
                    onPress={() => openbottomsheet(bottomsheetref)}
                />
                <Text style={[style.note]}>Note :</Text>
                <Description
                    content="withdrawal will be temporarily disabled for 24 hours after any change in your password, mobile number, or email."
                />
            </View>
            <Confirm
                ref={bottomsheetref}
                title={"Are You Sure You Want to Change Your Phone Number?asdf"}
                description={"withdrawal will be temporarily disabled for 24 hours after any change in your password, mobile number, or email."}
                cancel={() => closebottomsheet(bottomsheetref)}
                confirm={() => { handleChangePhone(), navigation.navigate("ChangeNumber"), closebottomsheet(bottomsheetref) }}
            />
        </Mainview>
    )

}

export default PhoneNumber;