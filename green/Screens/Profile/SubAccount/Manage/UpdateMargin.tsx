import React, { useState } from "react";
import { Pressable, View } from "react-native";

import TabHeader from "./Tab";
import Text from "../../../../Components/text";
import Images from "../../../../Utilities/images";
import { Button } from "../../../../Components/Field";
import { Colors } from "../../../../Utilities/uiasset";
import Sheet from "../../../../Components/bottomsheet";
import VectorIcons from "../../../../Utilities/vectoricons";
import useApiError from "../../../../Actions/Hooks/errorhook";
import useCustomHooks, { useApihooks } from "../../../../Actions/Hooks/customhook";
import { RFvalue, windowheight, windowwidth } from "../../../../Utilities/dimensions";
import { useLazySubAccountQuery, useSubAccountMarginMutation } from "../../../../Slices/subAccount";

import { styles } from "../../styles";

interface ConfirmProps {
    ref?: any;
    title?: any;
    value?: string;
    onChange?: any;
    accountId?: any;
    onClose?: () => void;
    confirm?: () => void;
    onContinue?: () => void;
}

const UpdateMargin: React.FC<ConfirmProps> = ({
    ref,
    title,
    value,
    onChange,
    onClose,
    accountId,
    onContinue
}) => {
    const { theme, navigation, successtoast, failuretoast } = useCustomHooks();
    const style = styles(theme);
    const [activeindex, setActiveindex] = useState(value);

    const [changeMargin, { error, isLoading }] = useSubAccountMarginMutation();
    const { Fetchsubaccounts } = useApihooks()
    useApiError(error ?? false);

    const handleSubmit = async (margin: string) => {
        const paylaod: any = {
            "marginMode": margin,
            "accountId": accountId
        }
        console.log(paylaod, "paylaod")
        const response = await changeMargin(paylaod).unwrap()
        if (response.success) {
            successtoast("Success", response.message);
            Fetchsubaccounts()
            onContinue?.()
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    return (
        <Sheet
            sheetref={ref}
            snappoint={["40%"]}
            custominterface={true}
            backgroundStyle={style.sheet}
        >
            <View style={{
                padding: "4%",
                backgroundColor: theme.bottomheader,
                paddingHorizontal: "5%"
            }}>
                <View style={style.between}>
                    <Text family="semiBold" style={{ color: theme.darktext, fontSize: RFvalue(14) }}>{title}</Text>
                    <Pressable onPress={() => { onChange?.("cross"); onClose?.() }}>
                        <Images
                            type="svg"
                            name={theme.theme === "dark" ? "Bottomclose" : "Bottomclosedark"}
                            width={windowwidth * 0.060}
                            height={windowheight * 0.040}
                        />
                    </Pressable>
                </View>
            </View>

            <View style={{ padding: "5%" }}>
                <TabHeader
                    style={style}
                    theme={theme}
                    tabs={["Isolated", "Cross"]}
                    activeindex={activeindex}
                    onchangeindex={setActiveindex}
                />
                {
                    activeindex === "isolated" && (
                        <>
                            <Text style={{ color: Colors.grey }}>You can trade</Text>
                            <View style={{ marginBottom: "4%", flexDirection: "row", alignItems: "center" }}>
                                <VectorIcons
                                    family="Feather"
                                    name="check"
                                    iconcolor={Colors.green}
                                    size={windowwidth * 0.050}
                                />
                                <Text style={{ color: theme.darktext, marginTop: "1%" }}> All instruments / pairs</Text>
                            </View>
                            <Text style={{ color: Colors.grey }}>Salient points</Text>
                            <View style={[{ flexDirection: "row" }]}>
                                <VectorIcons
                                    family="Feather"
                                    name="check"
                                    iconcolor={Colors.green}
                                    style={{ marginTop: 5 }}
                                />
                                <Text style={{ color: theme.darktext, marginTop: "1%" }}> Flexible leverage</Text>
                            </View>
                            {
                                value === "isolated" ? (
                                    <Button
                                        title={"Continue with Isolated Marign"}
                                        buttonStyle={{ marginTop: "5%" }}
                                        onPress={onContinue}
                                    />
                                ) : (
                                    <Button
                                        title={"Switch to Isolated Maring"}
                                        buttonStyle={{ marginTop: "5%" }}
                                        loading={isLoading}
                                        onPress={() => handleSubmit("isolated")}
                                    />
                                )
                            }
                        </>
                    )
                }
                {
                    activeindex === "cross" && (
                        <>
                            <Text style={{ color: Colors.grey }}>You can trade</Text>
                            <View style={{ marginBottom: "4%", flexDirection: "row", alignItems: "center" }}>
                                <VectorIcons
                                    family="Feather"
                                    name="check"
                                    iconcolor={Colors.green}
                                    size={windowwidth * 0.050}
                                />
                                <Text style={{ color: theme.darktext, marginTop: "1%" }}> All instruments / pairs</Text>
                            </View>
                            <Text style={{ color: Colors.grey }}>Salient points</Text>
                            <View style={[{ flexDirection: "row" }]}>
                                <VectorIcons
                                    family="Feather"
                                    name="check"
                                    iconcolor={Colors.green}
                                    style={{ marginTop: 5 }}
                                />
                                <Text style={{ color: theme.darktext, marginTop: "1%" }}> PnL offset - Open positions profits can support losses and new orders</Text>
                            </View>
                            {
                                value === "cross" ? (
                                    <Button
                                        title={"Continue with Cross Marign"}
                                        buttonStyle={{ marginTop: "5%" }}
                                        onPress={onContinue}
                                    />
                                ) : (
                                    <Button
                                        title={"Switch to Cross Margin"}
                                        buttonStyle={{ marginTop: "5%" }}
                                        loading={isLoading}
                                        onPress={() => handleSubmit("cross")}
                                    />
                                )
                            }
                        </>
                    )
                }
            </View>
        </Sheet>
    )

}

export default UpdateMargin;