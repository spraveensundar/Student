import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import Main from "./Main";
import Card from "../../../Components/Card";
import Text from "../../../Components/text";
import { Colors } from "../../../Utilities/uiasset";
import Mainview from "../../../Components/mainview";
import VectorIcons from "../../../Utilities/vectoricons";
import useApiError from "../../../Actions/Hooks/errorhook";
import { windowwidth } from "../../../Utilities/dimensions";
import Flexcomponent from "../../../Components/flexcomponent";
import { useLazyUserDetailsQuery } from "../../../Slices/auth";
import useCustomHooks, { Commonalert, Switchaccounts, useApihooks } from "../../../Actions/Hooks/customhook";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";
import { subAccountSelector, useLazySubAccountQuery, useSubAccountSwitchMutation } from "../../../Slices/subAccount";

import { styles } from "../styles";
import { futureSelector } from "../../../Slices/future";
import { Button } from "../../../Components/Field";
import { setSubAccountparams } from "../../../Slices/helper";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'SubAccount'>;

const SubAccount: React.FC<Props> = () => {
    const { theme, navigation, successtoast, failuretoast, convert, dispatch } = useCustomHooks();
    const style = styles(theme);

    const { accountId } = useSelector((state: any) => state.auth.userData);

    const { Fetchsubaccounts, triggerswitchaccount } = useApihooks()

    const { subaccounts } = useSelector(subAccountSelector)
    const [switchAcc, { error }] = useSubAccountSwitchMutation();

    const [selectedAccountId, setSelectedAccountId] = useState(accountId);
    const { triggeruserdetails, triggerAvailableMargin } = useApihooks()

    const activeAccountValue = subaccounts?.find(
        (item: any) => item.accountId === selectedAccountId
    );

    useApiError(error ?? false);

    const switchAccount = async (accountId: any) => {
        const paylaod: any = {
            "accountId": accountId
        }
        console.log(paylaod, "paylaod")
        const response = await switchAcc(paylaod).unwrap()
        console.log(response, "responseeeeeeeeeeeeeee");
        if (response.success) {
            setSelectedAccountId(accountId);
            triggeruserdetails();
            Fetchsubaccounts();
            triggerswitchaccount();
            triggerAvailableMargin();
            successtoast("Success", response.message);
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    useEffect(() => {
        setSelectedAccountId(accountId);
    }, [accountId]);

    const renderAccount = ({ item }: { item: any }) => (
        <Card containerStyle={[style.account, { marginBottom: 15 }]}>
            <View style={style.checkIcon}>
                <Pressable onPress={() => {
                    if (selectedAccountId !== item.accountId) {
                        Commonalert({
                            title: "Switch Account",
                            des: "Are you sure you want to switch to this account?",
                            yes: () => switchAccount(item.accountId),
                        });
                    }
                }} style={[{ backgroundColor: selectedAccountId === item.accountId ? Colors.lightgreen : "transparent" }, style.subAccount]}>
                    {
                        accountId && (
                            <VectorIcons
                                family="Feather"
                                name="check"
                                iconcolor={selectedAccountId === item.accountId ? Colors.darkgray : theme.card}
                                size={windowwidth * 0.04}
                            />
                        )
                    }
                </Pressable>
            </View>
            <Flexcomponent justifyContent="space-between" alignItems="center" paddingVertical={8}>
                <View style={{ flex: 1 }}>
                    <Text family="regular" size="semimedium" style={{ color: Colors.grey }}>
                        Account Name
                    </Text>
                    <Text style={{ marginTop: 8 }}>{item.accountName}</Text>
                </View>
            </Flexcomponent>
            <Flexcomponent justifyContent="space-between" alignItems="center" paddingVertical={8}>
                <View style={{ flex: 1 }}>
                    <Text family="regular" size="semimedium" style={{ color: Colors.grey }}>
                        Account ID
                    </Text>
                    <Text style={{ marginTop: 8 }}>{item.accountId}</Text>
                </View>
            </Flexcomponent>
            <Flexcomponent justifyContent="space-between" alignItems="center" paddingVertical={8}>
                <View style={{ flex: 1 }}>
                    <Text family="regular" size="semimedium" style={{ color: Colors.grey }}>
                        Margin Mode
                    </Text>
                    <Text style={{ marginTop: 8 }}>{item.marginMode}</Text>
                </View>
            </Flexcomponent>
            <Flexcomponent justifyContent="space-between" alignItems="center" paddingVertical={8}>
                <View style={{ flex: 1 }}>
                    <Text family="regular" style={{ color: Colors.grey }}>
                        Balance
                    </Text>
                    <Text style={{ marginTop: 8 }}>{convert(item.balance)}</Text>
                </View>
            </Flexcomponent>
            <Flexcomponent justifyContent="space-between" alignItems="center" paddingVertical={8}>
                <View style={{ flex: 1 }}>
                    <Text family="regular" style={{ color: Colors.grey }}>
                        Action
                    </Text>
                    <Pressable
                        onPress={() => {
                            if (!item.isPrimary) {
                                navigation.navigate("SubAccountManage", { account: item });
                            }
                        }}>
                        <Text style={{ marginTop: 8, color: item.isPrimary ? Colors.green : Colors.lightgreen }}>Manage</Text>
                    </Pressable>
                </View>
            </Flexcomponent>
        </Card>
    );

    const payload: any = {
        type: "transfer",
        value: subaccounts
    }
    return (
        <Mainview
            isheader={true}
            headertitle={"Sub Account"}
            isscollable={false}
            onleftfn={() => navigation.goBack()}
            onrightfn={() => navigation.navigate("SubAccountCreate")}
            righticon={
                <VectorIcons
                    family="Entypo"
                    name={"plus"}
                    size={windowwidth * 0.055}
                />
            }
        >
            <View style={style.container}>

                <Main
                    theme={theme}
                    subAccounts={subaccounts}
                    name={activeAccountValue?.accountName || ""}
                    accountId={activeAccountValue?.accountId || 0}
                    balance={convert(activeAccountValue?.balance) ?? 0}
                />

                <Button
                    title="Transfer Funds"
                    buttonStyle={{ width: "40%", marginTop: "2.5%", }}
                    onPress={() => { dispatch(setSubAccountparams(payload)), navigation.navigate("TransferFunds") }}
                />

                <View style={{ marginVertical: "2.5%" }}>
                    <Text size="medium">Accounts</Text>
                </View>

                <FlatList
                    data={subaccounts}
                    keyExtractor={(item, index) =>
                        String(item._id || item.accountId || index)
                    }
                    renderItem={renderAccount}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
                />
            </View>


        </Mainview>
    )

}

export default SubAccount;