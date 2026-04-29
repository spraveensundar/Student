import { View } from "react-native"
import Mainview from "../../../Components/mainview"
import { windowwidth } from "../../../Utilities/dimensions";
import Text from "../../../Components/text";
import VectorIcons from "../../../Utilities/vectorIcons";
import { Button } from "../../../Components/Field";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { scrapSelector, useLazyViewPickupDetailsQuery, useStartPickupMutation } from "../../../Slices/scrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDateTime } from "../../../Utilities/helper";

const PickupDetails: React.FC = ({ route }: any) => {
    const { vehicleScrapId } = route?.params;

    const { navigation, successtoast, failuretoast } = useCustomHooks();

    const [viewPickup, { isFetching }] = useLazyViewPickupDetailsQuery();
    const [startPickup, { isLoading }] = useStartPickupMutation()
    const [location, setLocaiton] = useState<any>([])


    const handleViewPickup = async () => {
        const reponse = await viewPickup(vehicleScrapId);
        setLocaiton(reponse?.data?.data);
    }

    const handleStartPickup = async () => {
        try {
            const formData = new FormData();
            formData.append("vehicleScrapId", vehicleScrapId);
            const reponse = await startPickup(formData).unwrap();
            if (reponse?.status) {
                successtoast(reponse?.message);
                navigation?.navigate('ScrapDealerConfirmation', {
                    origin: 'PickupDetails',
                    content: 'Your Pickup details submitted successfully !',
                    button: {
                        title: 'Done',
                        onButtonPress: () => navigation.navigate('Vendorhome'),
                    }
                })
            }
            failuretoast(reponse?.message ?? 'Something went wrong!');
        } catch (error: any) {
            failuretoast(error?.data?.message ?? 'Something went wrong!');
        }
    }

    useEffect(() => {
        handleViewPickup();
    }, [])

    return (
        <Mainview
            headertitle='Pickup detail'
            bottomContent
            ismainloading={isFetching}
            isbottomload={false}
            custombottomcontent={
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: windowwidth * 0.05,
                        marginBottom: windowwidth * 0.03
                    }}
                >
                    <Button
                        title="Start Pickup"
                        buttonStyle={{ flex: 1 }}
                        loading={isLoading}
                        onPress={handleStartPickup}
                    />
                    <Button
                        title="Req-Reschedule"
                        buttonStyle={{
                            flex: 1,
                            backgroundColor: '#EFF0F1',
                            marginLeft: windowwidth * 0.05,
                        }}
                        textStyle={{
                            color: '#12110D'
                        }}
                        onPress={() => navigation.navigate('PickupReschedule', { vehicleScrapId: location?.vehicleScrapId })}
                    />
                </View>
            }
        >
            <View style={{ flex: 1, marginBottom: windowwidth * 0.05 }} >
                <View
                    style={{
                        marginVertical: windowwidth * 0.05
                    }}
                >
                    <Text family="GMedium" size="large" style={{ flex: 1, color: '#000000' }}>{`Your Bid Amount`}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: windowwidth * 0.03
                        }}
                    >
                        <Text family="GMedium" size="medium" style={{ color: '#000000' }}>{'Status : '}</Text>
                        <Text family="GMedium" size="medium" style={{ color: '#389E0D' }}>{'Accepted'}</Text>
                    </View>
                </View>
                <View
                    style={{
                        marginVertical: windowwidth * 0.05
                    }}
                >
                    <Text family="GMedium" size="large" style={{ flex: 1, color: '#000000' }}>{`Pickup date & time`}</Text>
                    <View
                        style={{
                            marginTop: windowwidth * 0.03
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: windowwidth * 0.05
                            }}
                        >
                            <View>
                                <VectorIcons
                                    family={"MaterialIcons"}
                                    name={"location-on"}
                                    iconcolor={'#000C51'}
                                    size={windowwidth * 0.08}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingHorizontal: windowwidth * 0.02,
                                }}
                            >
                                <Text
                                    family={'GMedium'}
                                    size={'medium'}
                                    style={{
                                        flexShrink: 1
                                    }}
                                >
                                    {location?.pickupLocation}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: windowwidth * 0.05
                            }}
                        >
                            <View>
                                <VectorIcons
                                    family={"Lucide"}
                                    name={"timer"}
                                    iconcolor={'#000C51'}
                                    size={windowwidth * 0.08}
                                />
                            </View>
                            <View style={{ flex: 1, paddingHorizontal: windowwidth * 0.02 }}>
                                <Text
                                    family={'GMedium'}
                                    size={'medium'}
                                    style={{
                                        flexShrink: 1
                                    }}
                                >
                                    {formatDateTime(location?.pickupTime)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Mainview>
    )
}

export default PickupDetails;