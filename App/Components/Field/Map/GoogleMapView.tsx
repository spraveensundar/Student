// import React, { useEffect, useRef, useState } from "react";
// import { ImageSourcePropType, ImageStyle, Pressable, StyleProp, View, ViewStyle } from "react-native";
// import MapView from "react-native-maps"
// import useCustomHooks from "../../../Actions/Hooks/customhook";
// import { styles } from "../styles";
// import Images, { icons } from "../../../Utilities/images";
// import { getMyLocationCommonFunction, isEmpty, numberChange } from "../../../Common/commonFunction";
// import VectorIcons from "../../../Utilities/vectorIcons";
// import { borderradius, windowwidth } from "../../../Utilities/dimensions";


// interface GoogleMapViewProps {
//     onRegionChangeComplete?: (lat: number, lng: number) => void;
//     latitude?: number;
//     longitude?: number;
//     viewStyle?: StyleProp<ViewStyle>;
//     mapViewStyle?: StyleProp<ViewStyle>;
//     customMapStyle?: any;
//     innerComponent?: any;
//     imagepinstyle?: any,
//     scopebottom?: any,
//     changeMarker?: boolean,
//     disableMapChange?: boolean,
// }

// export const GoogleMapView: React.FC<GoogleMapViewProps> = ({
//     onRegionChangeComplete,
//     latitude,
//     longitude,
//     viewStyle,
//     mapViewStyle,
//     customMapStyle = {},
//     innerComponent,
//     imagepinstyle,
//     scopebottom,
//     changeMarker = false,
//     disableMapChange = false,
// }) => {



//     const mapRef = useRef<MapView>(null);


//     const [marker, setMarker] = useState({
//         latitude: 0,
//         longitude: 0,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//     });


//     const { theme } = useCustomHooks();
//     const style = styles(theme);

//     const onRegionChangeCompleteCheck = (lat: number, lng: number) => {
//         if (onRegionChangeComplete) {
//             onRegionChangeComplete(lat, lng);
//         }
//     }


//     const onRegionChange = (lat: number, lng: number, latitudeDelta: number, longitudeDelta: number) => {
//         onRegionChangeCompleteCheck(lat, lng);
//     }

//     useEffect(() => {
//         console.log('changeMarkerchangeMarkerlatttttt',changeMarker,latitude,longitude)
//         if ((latitude || longitude) && changeMarker) {
//             let currLatitude = numberChange(latitude), currLongitude = numberChange(longitude);
//             setMarker({
//                 ...marker,
//                 latitude: currLatitude,
//                 longitude: currLongitude,
//             })
//             if (mapRef?.current) {
//                 mapRef.current.animateToRegion(
//                     {
//                         latitude: currLatitude,
//                         longitude: currLongitude,
//                         latitudeDelta: marker.latitudeDelta,
//                         longitudeDelta: marker.longitudeDelta,
//                     },
//                     500 // duration in ms
//                 );
//             }
//         }
//     }, [changeMarker])

//     const getLiveLocation = async() => {
//         let data = await getMyLocationCommonFunction();
//         let position = data?.position;
//         if (position?.error || isEmpty(position)) {
//             return;
//         }
//         console.log('positionposition',position);
//         let latitude= position.coords.latitude, longitude= position.coords.longitude;
//         onRegionChangeCompleteCheck(numberChange(latitude), numberChange(longitude));
//         setMarker({
//             ...marker,
//             latitude: latitude,
//             longitude: longitude,
//         })
//         if (mapRef?.current) {
//             mapRef.current.animateToRegion(
//                 {
//                     latitude: latitude,
//                     longitude: longitude,
//                     latitudeDelta: marker.latitudeDelta,
//                     longitudeDelta: marker.longitudeDelta,
//                 },
//                 500
//             );
//         }
//     }

//     console.log('latitudelatitude', latitude, longitude, marker,changeMarker,disableMapChange)

//     return (
//         <View style={viewStyle}>
//             <MapView
//                 ref={mapRef}
//                 style={mapViewStyle}
//                 customMapStyle={customMapStyle}
//                 initialRegion={{
//                     latitude: marker.latitude,
//                     longitude: marker.longitude,
//                     latitudeDelta: marker.latitudeDelta,
//                     longitudeDelta: marker.longitudeDelta,
//                 }}
//                 scrollEnabled={disableMapChange?false:true}
//                 zoomEnabled={disableMapChange?false:true}
//                 rotateEnabled={disableMapChange?false:true}
//                 pitchEnabled={disableMapChange?false:true}
//                 pointerEvents={disableMapChange?"none":"auto"}
//                 // onPress={(e) => {
//                 //     const latitude = e?.nativeEvent?.coordinate?.latitude, longitude = e?.nativeEvent?.coordinate?.longitude;
//                 //     updateLocationInMap(latitude, longitude, true);
//                 // }}
//                 // onPoiClick={(e) => {
//                 //     const latitude = e?.nativeEvent?.coordinate?.latitude, longitude = e?.nativeEvent?.coordinate?.longitude;
//                 //     updateLocationInMap(latitude, longitude, true);
//                 // }}
//                 onRegionChangeComplete={(region: { latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number }) => onRegionChange(region.latitude, region.longitude, region.latitudeDelta, region.longitudeDelta)}
//                 // onRegionChangeComplete={(region: { latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number }) => {console.log('lattttttt',latitude,longitude)}}
//             >
//                 {/* <Marker
//                     coordinate={marker}
//                     draggable
//                     onDragEnd={(e) => {
//                         const { latitude, longitude } = e.nativeEvent.coordinate;
//                         setMarker({ latitude, longitude });
//                     }}
//                 /> */}



//             </MapView>
//             <Pressable
//                 style={{ width: windowwidth * 0.1, height: windowwidth * 0.1, backgroundColor: "#fff", position: "absolute", top: scopebottom ?? "5%", right: "5%", justifyContent: "center", alignItems: "center", zIndex: 999, borderRadius: borderradius }}
//                 onPress={()=>getLiveLocation()}
//             >
//                 <VectorIcons
//                     family="MaterialIcons"
//                     name={"my-location"}
//                     size={windowwidth * 0.05}

//                     iconcolor={"#000"}
//                 />
//             </Pressable>
//             <Images
//                 type="image"
//                 source={icons.Mappin}
//                 width={"7.5%"}
//                 height={"7.5%"}
//                 style={[{ position: 'absolute', alignSelf: 'center' }, imagepinstyle]}
//             />
//             {/* {innerComponent ? innerComponent() : <></>} */}
//         </View>
//     )
// }


import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Image,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

import MapView, {
  Polyline,
  Marker,
  LatLng,
} from "react-native-maps";

import useCustomHooks from "../../../Actions/Hooks/customhook";
import { styles } from "../styles";
import Images, { icons } from "../../../Utilities/images";
import {
  getMyLocationCommonFunction,
  isEmpty,
  numberChange,
} from "../../../Common/commonFunction";
import VectorIcons from "../../../Utilities/vectorIcons";
import {
  borderradius,
  windowwidth,
} from "../../../Utilities/dimensions";

/* -------------------------------------------------------------------------- */
/*                               Bezier Curve                                 */
/* -------------------------------------------------------------------------- */

interface curveprops {
  start: LatLng;
  end: LatLng;
}

const getBezierCurvePoints = ({ start, end }: curveprops) => {

  const lat1 = start.latitude;
  const lon1 = start.longitude;
  const lat2 = end.latitude;
  const lon2 = end.longitude;

  const dx = lon2 - lon1;
  const dy = lat2 - lat1;

  const dist = Math.sqrt(dx * dx + dy * dy);

  const midLat = (lat1 + lat2) / 2;
  const midLon = (lon1 + lon2) / 2;

  const norm = dist === 0 ? 1 : dist;
  const curveFactor = 0.2;

  const control = {
    latitude: midLat + (-dx / norm) * dist * curveFactor,
    longitude: midLon + (dy / norm) * dist * curveFactor,
  };

  let curvePoints: LatLng[] = [];

  for (let t = 0; t <= 1; t += 0.02) {

    const oneMinusT = 1 - t;

    const latitude =
      oneMinusT * oneMinusT * lat1 +
      2 * oneMinusT * t * control.latitude +
      t * t * lat2;

    const longitude =
      oneMinusT * oneMinusT * lon1 +
      2 * oneMinusT * t * control.longitude +
      t * t * lon2;

    curvePoints.push({ latitude, longitude });
  }

  curvePoints[0] = start;
  curvePoints[curvePoints.length - 1] = end;
  return curvePoints;
};

/* -------------------------------------------------------------------------- */
/*                              Component Props                               */
/* -------------------------------------------------------------------------- */

interface GoogleMapViewProps {
  onRegionChangeComplete?: (lat: number, lng: number) => void;
  latitude?: number;
  longitude?: number;
  viewStyle?: StyleProp<ViewStyle>;
  mapViewStyle?: StyleProp<ViewStyle>;
  customMapStyle?: any;
  imagepinstyle?: any;
  scopebottom?: any;
  changeMarker?: boolean;
  disableMapChange?: boolean;

  curveStart?: LatLng;
  curveEnd?: LatLng;
  showRouteAlone?: boolean;

  /** ✅ OPTIONAL MARKER IMAGES */
  startPointImage?: any;
  endPointImage?: any;
}

/* -------------------------------------------------------------------------- */

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  onRegionChangeComplete,
  latitude,
  longitude,
  viewStyle,
  mapViewStyle,
  customMapStyle = {},
  imagepinstyle,
  scopebottom,
  changeMarker = false,
  disableMapChange = false,
  curveStart,
  curveEnd,
  showRouteAlone = false,
  startPointImage,
  endPointImage,
}) => {

  const mapRef = useRef<MapView>(null);

  const [marker, setMarker] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const { theme } = useCustomHooks();
  styles(theme);

  /* ---------------- Curve ---------------- */

  const curveCoordinates = useMemo(()=>{
    return (curveStart && curveEnd) ? getBezierCurvePoints({ start: curveStart, end: curveEnd }) : [];
  },[curveStart, curveEnd])
    

  const onRegionChange = (lat: number, lng: number) => {
    if (!showRouteAlone) {
      onRegionChangeComplete?.(lat, lng);
    }
  };

  /* ---------------- Marker Update ---------------- */

  useEffect(() => {

    if ((latitude || longitude) && changeMarker) {

      let currLatitude = numberChange(latitude);
      let currLongitude = numberChange(longitude);

      setMarker(prev => ({
        ...prev,
        latitude: currLatitude,
        longitude: currLongitude,
      }));

      mapRef.current?.animateToRegion(
        {
          latitude: currLatitude,
          longitude: currLongitude,
          latitudeDelta: marker.latitudeDelta,
          longitudeDelta: marker.longitudeDelta,
        },
        500
      );
    }

  }, [changeMarker]);

  /* ---------------- Live Location ---------------- */

  const getLiveLocation = async () => {

    let data = await getMyLocationCommonFunction();
    let position = data?.position;

    if (position?.error || isEmpty(position)) return;

    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    if (!showRouteAlone) {
      onRegionChangeComplete?.(
        numberChange(latitude),
        numberChange(longitude)
      );
    }

    setMarker(prev => ({
      ...prev,
      latitude,
      longitude,
    }));

    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: marker.latitudeDelta,
        longitudeDelta: marker.longitudeDelta,
      },
      500
    );
  };

  console.log('oirfudsfsd',curveStart, curveEnd, curveCoordinates)

  /* -------------------------------------------------------------------------- */

  return (
    <View style={viewStyle}>
          <MapView
              ref={mapRef}
              style={mapViewStyle}
              customMapStyle={customMapStyle}
              initialRegion={marker}
              scrollEnabled={!disableMapChange}
              zoomEnabled={!disableMapChange}
              rotateEnabled={!disableMapChange}
              pitchEnabled={!disableMapChange}
              pointerEvents={disableMapChange ? "none" : "auto"}
              onRegionChangeComplete={(region) =>
                  onRegionChange(region.latitude, region.longitude)
              }
          >

              {/* ✅ Curved Route */}
              {curveCoordinates.length > 0 && (
                  <Polyline
                      coordinates={curveCoordinates}
                      strokeWidth={3}
                      strokeColor={theme.btnColor}
                  />
              )}

              {/* ✅ START POINT IMAGE */}
              {curveStart
                  ?
                  (
                      <>
                          <Marker
                              coordinate={curveStart}
                          >
                              <Image source={startPointImage ?? icons.Mappin} style={{ width: 35, height: 35, tintColor: "blue" }} />
                          </Marker>
                      </>
                  )
                  :
                  <></>
              }

              {/* ✅ END POINT IMAGE */}
              {curveEnd
                  ?
                  (
                      <>
                          <Marker
                              coordinate={curveEnd}

                          >
                              <Image source={endPointImage ?? icons.Mappin} style={{ width: 35, height: 35, tintColor: "red" }} />
                          </Marker>
                      </>
                  )
                  :
                  <></>
              }

          </MapView>

      {/* Live Location Button */}
      <Pressable
        style={{
          width: windowwidth * 0.1,
          height: windowwidth * 0.1,
          backgroundColor: "#fff",
          position: "absolute",
          top: scopebottom ?? "5%",
          right: "5%",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
          borderRadius: borderradius,
        }}
        onPress={getLiveLocation}
      >
        <VectorIcons
          family="MaterialIcons"
          name="my-location"
          size={windowwidth * 0.05}
          iconcolor="#000"
        />
      </Pressable>

      {/* Center Pin */}
      {!showRouteAlone && (
        <Images
          type="image"
          source={icons.Mappin}
          width={"7.5%"}
          height={"7.5%"}
          style={[
            { position: "absolute", alignSelf: "center" },
            imagepinstyle,
          ]}
        />
      )}
    </View>
  );
};
