import { FlatList, View } from "react-native";
import Mainview from "../../../Components/mainview";
import { windowwidth } from "../../../Utilities/dimensions";
import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import { NavigationProp, stackNavProp } from "../../../Actions/types";

type Props = {
    navigation: NavigationProp;
    route: stackNavProp<'ScrapNotifications'>['route'];
};

const ScrapNotifications: React.FC<Props> = () => {

    const notifications = [
        {
            id: 1,
            title: 'Ride Reschedule Requested',
            content: 'We’ve received your request to reschedule your outstation trip.',
            date: '21/11/2025 - 05:40 PM',
        },
        {
            id: 2,
            title: 'Upcoming Outstation Trip',
            content: 'Reminder! Your outstation ride is scheduled',
            date: '21/11/2025 - 05:35 PM',
        },
        {
            id: 3,
            title: 'John Doe',
            content: 'A-42, 3rd Floor, Green Park Extension, New Delhi – 110016',
            date: '21/11/2025 - 05:30 PM',
        }
    ]

    return (
        <Mainview
            isheader={true}
            headertitle='Notifications'
            isscollable={false}
            horizontalpadding={0}
        >
            <View
                style={{
                    flex: 1,
                }}
            >
                <FlatList
                    data={notifications ?? []}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingVertical: windowwidth * 0.05,
                                    paddingHorizontal: windowwidth * 0.05,
                                    borderRadius: 10,
                                    overflow: 'hidden'
                                }}
                            >
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: windowwidth * 0.15,
                                        height: windowwidth * 0.15,
                                        borderRadius: windowwidth * 0.15,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Images
                                        source={require('../../../Assets/images/scrap-car.png')}
                                        type="image"
                                        width={'100%'}
                                        height={'100%'}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View
                                    style={{ flex: 1 }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                marginLeft: windowwidth * 0.03
                                            }}
                                        >
                                            <Text size="semilarge" family="GBold" color="#12110D" >{item?.title}</Text>
                                            <Text size="medium" family="GRegular" color="#12110D" top={'2.5%'} >{`${item?.content}`}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                    ItemSeparatorComponent={() => (<View style={{ height: 1, backgroundColor: '#E2E8F0' }} />)}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Mainview>
    )
}

export default ScrapNotifications;