import React, { useState, useMemo } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import Description from "../Description";
import Text from "../../../Components/text";
import { Colors } from "../../../Utilities/uiasset";
import Mainview from "../../../Components/mainview";
import { athuDataProps } from "../../../Actions/type";
import { helperSelector } from "../../../Slices/helper";
import VectorIcons from "../../../Utilities/vectoricons";
import useApiError from "../../../Actions/Hooks/errorhook";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks, { useApihooks } from "../../../Actions/Hooks/customhook";
import { useWalletTansferMutation } from "../../../Slices/wallet";
import { useLazySubAccountQuery } from "../../../Slices/subAccount";
import { Button, Dropdown, Input } from "../../../Components/Field";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'TransferFunds'>;

const TransferFunds: React.FC<Props> = ({ navigation }) => {
    const { theme, successtoast, failuretoast, convert } = useCustomHooks();
    const style = styles(theme);

    const { subaccountparams } = useSelector(helperSelector);
    const accounts = subaccountparams.value;

    const initialUserData: athuDataProps = useMemo(() => ({
        amount: {
            value: "",
            rules: { required: true },
            messages: { required: 'First name is required!' },
            isValid: true,
        },
    }), []);

    const [transferFrom, setTransferFromId] = useState(accounts?.[0]?.accountId || "");
    const [transferTo, setTransferToId] = useState("");

    const [swapped, setSwapped] = useState(false);
    const handleSwap = () => {
        const temp = transferFrom;
        setTransferFromId(transferTo);
        setTransferToId(temp);
        setSwapped(!swapped);
    };

    const sourceAccount = accounts.find((acc: any) => acc.accountId === transferFrom);
    const destinationList = accounts.filter((acc: any) => acc.accountId !== transferFrom);

    const dropdownOptions = accounts.map((acc: any) => ({
        label: acc.accountName,
        value: acc.accountId
    }));

    const destinationDropdownOptions = destinationList.map((acc: any) => ({
        label: acc.accountName,
        value: acc.accountId
    }));

    const [userData, setUserData] = useState<athuDataProps>(initialUserData);
    const [transfer, { error, isLoading }] = useWalletTansferMutation();

    const { Fetchsubaccounts } = useApihooks()

    useApiError(error ?? false);

    const handleSubmit = async () => {
        const paylaod: any = {
            "amount": userData.amount?.value,
            "transferTo": transferTo,
            "transferFrom": transferFrom,
            "symbol": "INR",
        }
        console.log(paylaod)
        const response = await transfer(paylaod).unwrap()
        if (response.success) {
            successtoast("Success", response.message);
            Fetchsubaccounts()
            navigation.goBack();
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    return (
        <Mainview
            isheader
            headertitle="Transfer Funds"
            isscollable={false}
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={{ paddingHorizontal: "6%", marginBottom: "2%" }}>
                    <Button
                        loading={isLoading}
                        title="Transfer Now"
                        onPress={() => handleSubmit()}
                    />
                </View>
            }
        >
            <View style={style.container}>
                <Description title="Transfer Funds between subaccounts" />

                <View style={{ marginTop: "5%" }}>
                    <Dropdown
                        list={dropdownOptions}
                        placeholder="Select..."
                        label="Source Account"
                        value={transferFrom}
                        onChange={(item) => setTransferFromId(item.value)}
                    />

                    <Pressable
                        style={{ alignSelf: "center", marginVertical: 10 }}
                        onPress={handleSwap}
                    >
                        <VectorIcons
                            family="MaterialCommunityIcons"
                            name={swapped ? "compare-vertical" : "swap-vertical"}
                            size={windowwidth * 0.080}
                            iconcolor={Colors.grey}
                        />
                    </Pressable>

                    <Dropdown
                        list={destinationDropdownOptions}
                        placeholder="Select..."
                        label="Destination Account"
                        value={transferTo}
                        onChange={(item) => setTransferToId(item.value)}
                    />

                    <View
                        style={{
                            width: "100%",
                            borderBottomWidth: 1.5,
                            borderColor: theme.theme === "dark" ? Colors.dune : theme.boderColor,
                            marginVertical: "8%",
                        }}
                    />

                    <View style={[style.between, { paddingBottom: "5%" }]}>
                        <Text style={{ color: Colors.grey }}>Amount</Text>
                        <Text style={{ color: Colors.grey }}>
                            Avail. Balance ₹ {convert(sourceAccount?.balance)}
                        </Text>
                    </View>

                    <Input
                        value={userData.amount?.value}
                        onChange={(text: any) => {
                            console.log(Number(convert(sourceAccount?.balance)));

                            if (Number(convert(sourceAccount?.balance)) >= Number(text)) {
                                setUserData(prev => ({ ...prev, amount: { ...prev.amount, value: text } }))
                            }
                        }
                        }
                        rightContent={<Text>INR</Text>}
                        keyboardType="number-pad"
                        placeholder="Enter amount"
                    />
                </View>
            </View>
        </Mainview>
    );
};

export default TransferFunds;