import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import Confirm from "./Helpers/Confirm";
import EditCard from "./Helpers/EditCard";
import Description from "../Description";
import Text from "../../../Components/text";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { formatToReadableDate } from "../../../Utilities/helerfunction";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Email'>;

const Email: React.FC<Props> = () => {
    const { theme, bottomsheetref, openbottomsheet, closebottomsheet, navigation } = useCustomHooks();
    const style = styles(theme);

    const { email, updatedAt } = useSelector((state: any) => state.auth.userData);

    return (
        <Mainview
            isheader={true}
            headertitle={"Email"}
            isscollable={false}
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>
                <EditCard
                    value={email}
                    text={`Added : ${formatToReadableDate(updatedAt)}`}
                    onPress={() => openbottomsheet(bottomsheetref)}
                />
                <Text style={style.note}>Note :</Text>
                <Description
                    content="withdrawal will be temporarily disabled for 24 hours after any change in your password, mobile number, or email."
                />
            </View>
            <Confirm
                ref={bottomsheetref}
                title={"Are You Sure You Want to Change Your Email Address?"}
                description={"withdrawal will be temporarily disabled for 24 hours after any change in your password, mobile number, or email."}
                cancel={() => closebottomsheet(bottomsheetref)}
                confirm={() => { navigation.navigate("UpdateEmail"), closebottomsheet(bottomsheetref) }}
            />
        </Mainview>
    )

}

export default Email;