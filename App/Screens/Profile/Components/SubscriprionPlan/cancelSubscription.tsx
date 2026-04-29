import React, { useEffect, useState } from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import styles from "./styles";
import { BackHandler, View } from "react-native";
import { Button, Input } from "../../../../Components/Field";
import Text from "../../../../Components/text";
import Lottie from "../../../../Components/lottieview";
import { lotties } from "../../../../Utilities/images";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../../../Navigations/stacknavigationtypes";
import { isEmpty, toastFn } from "../../../../Common/commonFunction";
import { cancelSubscriptionFunc } from "../../../../Common/axiosHooks/vehicleServiceHooks";


type Props = NativeStackScreenProps<Stacknavigationtypes, 'CancelSubscription'>;

const CancelSubscription: React.FC<Props> = ({ route }) => {



    const subscriptionId = route?.params?.subscriptionId;


    const { theme, navigation } = useCustomHooks()
    const style = styles(theme);
    const [isCancelled, setIsCancelled] = useState(false);
    const [ formData, setFormData ] = useState<any>({});

    const onChange = ( value: any, id: string) => {
        let setData = {
            ...formData,
            [id]: value
        }
        setFormData(setData);
    }


    const onCancelSubscription = async() => {
        if(isEmpty(formData?.reason)){
            toastFn("Please provide reason for cancellation");
            return;
        }
        let sendData = {
            subscriptionId: subscriptionId,
            cancelPaymentReason: formData?.reason,
        };
        let resp = await cancelSubscriptionFunc(sendData);
        if (resp?.status) {
            setIsCancelled(true);
        }
        else {
            toastFn(resp?.message ?? "Try-Again");
        }
    }

    const goBackCheck = () => {
        if (isCancelled) {
            navigation.goBack();
            navigation.goBack();
        }
        else {
            navigation.goBack();
        }
        return true;
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            goBackCheck
        );

        return () => backHandler.remove();
    }, [isCancelled]);

    

    return (
        <Mainview isheader={true}
            headertitle="Cancel Subscription"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={{ paddingHorizontal: "6%", marginBottom: "5%", gap: 20 }}>
                    {!isCancelled ? (
                        <View style={{ gap: 20 }}>
                            <Button
                                title="No"
                                onPress={() => navigation.goBack()}
                            />

                            <Button
                                title="Yes, Cancel"
                                buttonStyle={{
                                    backgroundColor: "transparent",
                                    borderWidth: 1,
                                    borderColor: theme.btnColor,
                                }}
                                textStyle={{ color: theme.btnColor }}
                                onPress={() => onCancelSubscription()}
                            />
                        </View>
                    ) : (
                        <Button title="Go to home" onPress={() => navigation.navigate('Bottomtab')} />
                    )}
                </View>
            }
        >

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Lottie
                    src={lotties.SadEmoji}
                    style={{ width: "50%", height: "30%" }}
                    speed={0.5}
                />
                {!isCancelled ? (<Text family="bold" size="medium">Are you sure cancel the subscription</Text>)
                    : (<Text family="bold" size="medium">You subscription was cancelled </Text>)}
            </View>

            {
                isCancelled
                ?
                <></>
                :
                <>
                <Input
                    label={"Reason for subscription"}
                    placeHolder="Reason"
                    onChange={(e)=>onChange(e, "reason")}
                />
                </>
            }

        </Mainview >
    )
}

export default CancelSubscription;