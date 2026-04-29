import { FlashList } from "@shopify/flash-list"
import Mainview from "../../../Components/mainview"
import { View } from "react-native"
import { RFvalue, windowheight, windowwidth } from "../../../Utilities/dimensions"
import Images, { icons } from "../../../Utilities/images"
import Text from "../../../Components/text"
import { useLazyGetServicemanNotificationsQuery } from "../../../Slices/services"
import { usePagination } from "../../../Actions/Hooks/customhook"
import Nodata from "../../../Components/nodata"


const Notification: React.FC = () => {

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

    // const [getServicemanNotifications, { isFetching }] = useLazyGetServicemanNotificationsQuery()

    const notification = usePagination(useLazyGetServicemanNotificationsQuery)

    return (
        <Mainview
            isheader
            headertitle="Notification"
            isscollable={false}
            horizontalpadding={"2.5%"}
            ismainloading={notification?.initialload}

        >
            <View
                style={{
                    flex: 1,
                }}
            >
                <FlashList
                    data={notification.list}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={<Nodata text="No notification found " container={{ height: windowheight * 0.5 }} />}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingVertical: windowwidth * 0.05,
                                    paddingHorizontal: windowwidth * 0.05,
                                    width: "100%",
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
                                        source={icons.Applogo}
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
                                            {/* <Text style={{ fontSize: RFvalue(16) }} family="GMedium" color="#12110D" >{item?.title}</Text>
                                            <Text size="medium" family="GRegular" color="#12110D" top={'1%'} >{`${item?.message}`}</Text> */}
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

export default Notification