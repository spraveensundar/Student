import Geolocation, { GeolocationError } from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from "react-native";
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import { onLocationCoordsInterface } from './interface';
import Geocoder from "react-native-geocoding";
import { returnAddressFormat } from './commonFunction';
import config from './config';

// Geocoder.init(config.GOOGLE_API_KEY);

// Request location permission
export const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') return true;

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Location Permission",
                message: "This app needs access to your location.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        return granted;
    } catch (err) {
        console.warn(err);
        return false;
    }
};

// Enable GPS on Android
export const enableDeviceLocation = async () => {
  if (Platform.OS === "android") {
    try {
      await promptForEnableLocationIfNeeded({
        interval: 10000,
        // waitForAccurate: false,
      });
      return true;
    } catch (err) {
      console.log("GPS not enabled");
      return false;
    }
  }
  return true;
};



// Watch Live Location Function
export const watchLiveLocation = async (onLocation: (coords: onLocationCoordsInterface) => void, onError?: (error: GeolocationError) => void) => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    console.log("Location permission denied");
    return () => {};
  }

  const gpsEnabled = await enableDeviceLocation();
  if (!gpsEnabled) {
    console.log("GPS must be enabled");
    return () => {};
  }

  const watchId = Geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      if (onLocation) onLocation({ latitude, longitude });
    },
    (error) => {
      if (onError) onError(error);
      console.log("Location error:", error);
    },
    {
      enableHighAccuracy: true,
      distanceFilter: 0,
      interval: 2000,
      fastestInterval: 1000,
    }
  );

  return () => Geolocation.clearWatch(watchId);
};

const currentLocationPromise = () => {
  try{
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 10000,
        }
      );
    });
  }
  catch(error:any){
    console.log('currentLocationPromise_error',error);
    return {error:true,message:error?.message,errorObject:error};
  }
}

export const getCurrentLocation = async() => {
  try{
    let checkPermission = await requestLocationPermission();
    if(checkPermission==PermissionsAndroid.RESULTS.GRANTED){
      try{
        let position = await currentLocationPromise();
        return position
      }
      catch(err:any){
        console.log('positioncurrentLocationPromise_error',err);
        return {error:true,message:err?.message,errorObject:err}
      }
    }
    else{
      return {error:true,message:"Please enable location access"};
    }
  }
  catch(err:any){
    console.log('getCurrentLocation_error',err);
    return {error:true,message:err?.message,errorObject:err};
  }
}

// export const getAddressFromCoordinates = async (latitude: string, longitude: string) => {
//     try {
//       const response = await Geocoder.from(latitude, longitude);
//       const result = response.results[0];
//       if (
//         response.results.length === 0 ||
//         result.types.includes("natural_feature") || // Water body check
//         result.types.includes("water") ||
//         result.types.includes("mountain")
//       ) {
//         return {error:true,message:"No address found for this location"};
//       }
//       return returnAddressFormat(result)
//     }
//     catch (error) {
//       console.error("Error getting address:", error);
//       return {error:true,message:String(error)};
//     }
//   };
