// import Geolocation from '@react-native-community/geolocation';
import Geolocation from "react-native-geolocation-service";
import { GET_ADDRESS, GOOGLEAPIKEY } from '../Constants/constant';
import axios from "axios"
import { Linking, Platform } from "react-native";
import { setCurrentlocation } from "../../Slices/helper";
import useCustomHooks from "../Hooks/customhook";

export const getCurrentLocation = () =>
    new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => resolve(position.coords),
            error => reject(error),
            {
                enableHighAccuracy: false,
                timeout: 15000,
                maximumAge: 5000,
            },
        );
    });

export const Getaddressdetail = async (lat: number, long: number) => {
    try {
        const result = lat + " " + long;

        const response = await axios({
            method: "get",
            url: `${GET_ADDRESS}` + `${result}` + "&key=" + `${GOOGLEAPIKEY}`,
        });

        console.log('response', response);

        //
        var droppindata = {
            coordinates: [lat, long],
            streetname: response.data.results[0]?.address_components[1]?.long_name,
            locality: response.data.results[0]?.address_components[2]?.long_name,
            city: response.data.results[0]?.address_components[3]?.long_name,
            postalcode: response.data.results[0]?.address_components[6]?.long_name,
            formatedaddress: response.data.results[0]?.formatted_address,
        };

        return droppindata;
    } catch (err) {
        console.log("getlabelerr", err);

    }
};

// distanceInKm → number
// bearing → number (0 = North, 90 = East, 180 = South, 270 = West)

export function getOffsetLocation(
    latitude: number,
    longitude: number,
    distanceInKm: number,
    bearing: number
) {
    const R = 6371; // Earth radius in km

    const d = distanceInKm / R;
    const brng = (bearing * Math.PI) / 180;

    const lat1 = (latitude * Math.PI) / 180;
    const lon1 = (longitude * Math.PI) / 180;

    const lat2 = Math.asin(
        Math.sin(lat1) * Math.cos(d) +
        Math.cos(lat1) * Math.sin(d) * Math.cos(brng)
    );

    const lon2 =
        lon1 +
        Math.atan2(
            Math.sin(brng) * Math.sin(d) * Math.cos(lat1),
            Math.cos(d) - Math.sin(lat1) * Math.sin(lat2)
        );

    return {
        latitude: (lat2 * 180) / Math.PI,
        longitude: (lon2 * 180) / Math.PI,
    };
}


export const delay = (ms: number): Promise<void> =>
    new Promise<void>(resolve => {
        setTimeout(() => resolve(), ms);
    });


export type Coord = {
    latitude: number;
    longitude: number;
};

export const openGoogleMap = (from: Coord, to: Coord) => {
    if (Platform.OS === "android") {
        const url = `google.navigation:q=${to.latitude},${to.longitude}&mode=d`;
        Linking.openURL(url).catch((err) => {
            console.log("Navigation error:", err);
        });
    } else {
        const url = `http://maps.apple.com/?saddr=${from.latitude},${from.longitude}&daddr=${to.latitude},${to.longitude}&dirflg=d`;
        Linking.openURL(url).catch((err) => {
            console.log("Navigation error:", err);
        });
    }
};


export const useFetchcurrentlocation = () => {

    const { dispatch } = useCustomHooks();

    const getlocation = async () => {
        const coords: any = await getCurrentLocation();
        const label = await Getaddressdetail(coords.latitude, coords?.longitude)
        console.log(label, "labelvalue");

        const payload = {
            coordinates: coords,
            labeladdress: label?.formatedaddress
        }
        dispatch(setCurrentlocation(payload))
    }
    return {
        getlocation
    }
}


const getDistanceInMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
) => {
    const R = 6371e3; // Earth radius in meters
    const toRad = (value: number) => (value * Math.PI) / 180;

    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) *
        Math.cos(φ2) *
        Math.sin(Δλ / 2) *
        Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in meters
};


export const isWithinRadius = async (
    service: any
) => {
    const serviceLat = service?.subscriptionLocation?.coordinates[1]
    const serviceLng = service?.subscriptionLocation?.coordinates[0]
    console.log(serviceLat, serviceLng, "SERVICELOCATION");
    const coords: any = await getCurrentLocation();
    console.log(coords.latitude, coords.longitude, "CURRENRLOCATION");

    const distance = getDistanceInMeters(
        coords.latitude,
        coords.longitude,
        serviceLat,
        serviceLng
    );
    console.log(distance, "distance");

    return distance <= 500;
};