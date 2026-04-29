import React from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Stacknavigationtypes } from "../../../../Navigations/navigationtypes";
import Mainview from "../../../../Components/mainview";
import Text from "../../../../Components/text";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { styles } from "../../styles";
import { Button, Dropdown } from "../../../../Components/Field";
import Card from "../../../../Components/Card";
import { Colors } from "../../../../Utilities/uiasset";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'UnderReview'>;

const UnderReview: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    return (
        <Mainview
            isheader={true}
            isscollable={true}
            headertitle={"My Account"}
            onleftfn={() => navigation.goBack()}
        >
            <View style={[style.container]}>
                <Text style={{ color: theme.secondarytext }}>Document Is Under Review:</Text>

                <Card containerStyle={{ paddingVertical: "5%", paddingHorizontal: "5%", marginTop: "5%" }}>
                    <Text style={{ color: theme.darktext }}>Your document is under review by the admin. Once approived, your dashborad will be create automatically</Text>
                    <Pressable style={{ width: "45%", backgroundColor: Colors.darkgray, alignItems: "center", paddingVertical: "3%", borderRadius: 10, marginTop: "8%" }}>
                        <Text style={{ color: Colors.white }}>Status : <Text style={{ color: Colors.red }}>Pending</Text></Text>
                    </Pressable>
                </Card>


            </View>
        </Mainview>
    )

}

export default UnderReview;