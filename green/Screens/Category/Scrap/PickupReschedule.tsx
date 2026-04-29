import { useState } from "react";
import { View } from "react-native";

import Text from "../../../Components/text";
import { Input } from "../../../Components/Field";
import Mainview from "../../../Components/mainview";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { useReschedulePickupMutation } from "../../../Slices/scrap";

const PickupReschedule: React.FC = ({ route }: any) => {
    const { vehicleScrapId } = route?.params;
    const { navigation, failuretoast, successtoast } = useCustomHooks();

    const [reschedule, setReschedule] = useState();
    const [reschedulePickup, { isLoading }] = useReschedulePickupMutation();

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('vehicleScrapId', vehicleScrapId);
            formData.append('rescheduleInformation', reschedule);
            const response = await reschedulePickup(formData).unwrap();
            console.log("resadsf", response)
            if (response?.status) {
                successtoast(response?.message);
                navigation?.navigate('ScrapDealerConfirmation', {
                    origin: 'PickupReschedule',
                    content: 'Your Reschedule Request Submitted successfully !',
                    button: {
                        title: 'Done',
                        onButtonPress: () => navigation.navigate('Vendorhome'),
                    }
                })
            }
            failuretoast(response?.message ?? 'Something went wrong!');
        } catch (error: any) {
            failuretoast(error?.data?.message ?? 'Something went wrong!');
        }
    }

    return (
        <Mainview
            headertitle='Reschedule'
            bottomContent
            isbottomload={isLoading}
            bottomtext={"Submit"}
            onBottompress={handleSubmit}
        >
            <View style={{ flex: 1, marginBottom: windowwidth * 0.05 }} >
                <View style={{ marginVertical: windowwidth * 0.05 }}>
                    <Text family="GMedium" size="large" style={{ flex: 1, color: '#000000' }}>{`Request For Reschedule`}</Text>
                </View>
                <Input
                    key={'Reschedule'}
                    label={'Reschedule'}
                    value={reschedule}
                    onChange={(text) => setReschedule(text)}
                    labelStyle={{ marginTop: '5%' }}
                    placeHolder='Enter Detail'
                    style={{ height: 150, textAlignVertical: 'top' }}
                    inputprops={{ multiline: true, numberOfLines: 5 }}
                />
            </View>
        </Mainview>
    )
}

export default PickupReschedule;