import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Mainview from "../../../Components/mainview";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes";
import styles from "./styles";
import { Button, Input } from "../../../Components/Field";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'VehicleForm'>;

const VehicleForm: React.FC<Props> = ({ route }: any) => {
    const { provider } = route?.params;
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    return (
        <Mainview
            isscollable={false}
            headertitle="FasTag recharge"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={style.buttonContainer}>
                    <Button
                        title="Confirm"
                        onPress={() => navigation.navigate("Recharge", { provider: provider })}
                    />
                </View>
            }
        >
            <View style={style.container}>
                <View style={{ marginBottom: windowwidth * 0.03 }}>
                    <Input
                        label={"Vehicle number"}
                        placeHolder="Choose Vehicle model"
                    />
                </View>
            </View>
        </Mainview>
    )
}

export default VehicleForm;