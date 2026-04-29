import { RAZORPAY_KEY_ID, BACKEND_URL } from "@env"
import { Alert } from "react-native"
export const RAZORPAYKEYID = RAZORPAY_KEY_ID
export const SOCKET_URL = BACKEND_URL
export const constantData = Object.freeze({
    jwtToken: "jwtToken",
    secretKey: "secretKey",
    userDetail: "userDetail",
    currentAddress: "currentAddress",
    fcmData: "fcmData",
    viewedNotificationId: "viewedNotificationId",
    subscriptionType: {
        subscribe: "subscribe",
        ots: "ots"
    },
    subscriptionFilter: {
        pending: "pending",
        expired: "expired",
        active: "active",
        subscribe: "subscribe",
        cancelled: "cancelled",
        ots: "ots",
        all: "all",
    },
    serviceStatus: {
        pending: "pending",
        completed: "completed",
        started: "started",
        cancelled: "cancelled",
    },
    servicemanReachStatus: {
        reached: "reached",
        onTheWay: "onTheWay",
        pending: "pending"
    },
    model:{
        luxury:"luxury",
        normal:"normal"
    },
    paymentStatus: {
        pending: "pending",
        completed: "completed",
        confirmed: "confirmed",
        failed: "failed",
        cancelled: "cancelled",
        refundInitiated: "refundInitiated",
        refunded: "refunded",
        cancelapproved: "cancelapproved",
        cancelrejected: "cancelrejected",
        created: "created",
        paid: "paid"
    },
    leaveRequestStatus: {
        applied: "applied",
        rejected: "rejected",
        approved: "approved",
        cancelled: "cancelled",
    },
    reviewFrom: {
        vehicleService: "vehicleService",
    },
    socketEvents: {
        userNotification: "userNotification",
        rtoServiceChatNewMessage: "rtoServiceChatNewMessage",
        vehicleServiceChatNewMessage: "vehicleServiceChatNewMessage",
        userGetMyDetail: "userGetMyDetail",
        userDetailFetched: "userDetailFetched",
        rideServiceChatNewMessage: "rideServiceChatNewMessage",
        scrapServiceChatNewMessage: "scrapServiceChatNewMessage",
    },
    planType: {
        standard: "standard",
        premium: "premium",
        elite: "elite"
    },
    packageSubsriptionFrom: {
        renew: "renew",
        upgrade: "upgrade",
    },
    cmsSlug: {
        about: "about",
        serviceQuery: "serviceQuery",
        warranty: "warranty",
    },
    rideType: {
        single: "single",
        twoWay: "twoway",
        outStation: "outstation",
    },
    paymentType: {
        cash: "cash",
        online: "online",
    },
    rideStatus: {
        created: "created",
        accepted: "accepted",
        onTheWay: "onTheWay",
        started: "started",
        onBreak: "onBreak",
        endTripTriggerred: "endTripTriggerred",
        endTripConfirmed: "endTripConfirmed",
        completed: "completed",
        cancelled: "cancelled",
    },
    rideDataFrom: {
        reschedule: "reschedule",
        riderDetail: "riderDetail",
    },
    lastFocused: {
        drop: "drop",
        pickup: "pickup",
    },
})


export const Prettylog = (log: any) => {
    console.log(JSON.stringify(log, null, 2))
}

export const delay = (ms: number): Promise<void> =>
    new Promise<void>(resolve => {
        setTimeout(() => resolve(), ms);
    });