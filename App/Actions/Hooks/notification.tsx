import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging"
import PushNotification from 'react-native-push-notification';


export function useNotification() {

    useEffect(() => {
        const unsubscribeForeground = messaging().onMessage(
            async remoteMessage => {
                const payload = {
                    title: remoteMessage?.notification?.title,
                    message: remoteMessage?.notification?.body
                }
                localnotification(payload)
            }
        );
        messaging().setBackgroundMessageHandler(
            async remoteMessage => {
                const payload = {
                    title: remoteMessage?.notification?.title,
                    message: remoteMessage?.notification?.body
                }
                localnotification(payload)
            }
        )
        return () => {
            unsubscribeForeground();
        };
    }, []);
}

interface notification {
    title: string | undefined
    message: string | undefined
}
export const localnotification = ({
    title = "",
    message = ""
}: notification) => {
    PushNotification.createChannel(
        {
            channelId: "specialid",
            channelName: "Special messasge",
            channelDescription: "Notification for special message",
            importance: 4,
            vibrate: true,
        },
        (created?: any) => console.log(`createChannel returned '${created}'`)
    );

    PushNotification.localNotification({
        importance: 'high',
        channelId: 'specialid',
        title: title,
        message: message,
    })

    return
}
