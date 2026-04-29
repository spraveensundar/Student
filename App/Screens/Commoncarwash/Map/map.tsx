import { Image, StyleSheet, View } from "react-native"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import Mainview from "../../../Components/mainview"
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { helperSelector } from "../../../Slices/helper";
import { Colors } from "../../../Utilities/uiasset";
import { style } from "./styles";
import { delay, useFetchcurrentlocation } from "../../../Actions/location/location";
import Images, { icons } from "../../../Utilities/images";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import { cleaningSelector } from "../../../Slices/cleaning";
import Text from "../../../Components/text";
import { Button } from "../../../Components/Field";
import Loader from "../../../Components/loader";

interface Mapprops {
    display?: "flex" | "none"
}

const Mapscreen: React.FC<Mapprops> = React.memo(({
    display = "flex"
}) => {
    const { theme } = useCustomHooks()
    const { servicetype, dailywashstate, onetimewashstate } = useSelector(helperSelector)


    const mapviewref = useRef<MapView | null>(null)

    const styles = style(theme)
    const { currentlocation } = useSelector(helperSelector)
    const location = currentlocation?.coordinates

    console.log(location, "locationlocationlocationlocationlocation");

    const { selectedservice } = useSelector(cleaningSelector)

    const pickup = useMemo(() => {
        console.log(selectedservice, "SELECTEDSERVICEGAL");

        const res = {
            latitude: selectedservice?.subscriptionDetail?.subscriptionLocation?.coordinates[1] ?? 0,
            longitude: selectedservice?.subscriptionDetail?.subscriptionLocation?.coordinates[0] ?? 0
        }
        return res
    }, [selectedservice])

    const currentloc = useMemo(() => {
        const res = {
            latitude: location?.latitude ?? 0,
            longitude: location?.longitude ?? 0
        }
        return res
    }, [location, dailywashstate, onetimewashstate])

    const managefit = async () => {
        if (dailywashstate == "accept" || onetimewashstate == "accept") {
            await delay(1000)
            mapviewref.current?.fitToCoordinates([currentloc, pickup], {
                edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
                animated: true,
            })
        }
    }

    useEffect(() => {
        managefit()
    }, [location, pickup, dailywashstate, onetimewashstate])
    console.log(currentloc, pickup, "sheshe");


    console.log(onetimewashstate, "onetimewashstateonetimewashstateonetimewashstate");
    console.log(pickup, "pickuppickuppickuppickup");
    console.log(pickup, "curremtloc");
    const [mapload, setMapload] = useState(true)

    const { getlocation } = useFetchcurrentlocation()

    useEffect(() => {
        setTimeout(() => {
            getlocation()
        }, 2000)

        setTimeout(() => {
            setMapload(false)
        }, 5000)
    }, [])

    return (
        <View style={{ flex: 1, display: display }} >
            {mapload ?
                <Loader isloading loaderstyle={{ height: windowheight, backgroundColor: "rgba(0,0,0,0.25)", zIndex: 999 }} /> : null}

            {location?.latitude ?
                <MapView
                    ref={mapviewref}
                    provider={PROVIDER_GOOGLE}
                    style={
                        (servicetype == "onetimewash" && (onetimewashstate == "request" || onetimewashstate == "offine")) ? styles.onetimerequest
                            : styles.container
                    }
                    region={{
                        latitude: location?.latitude,
                        longitude: location?.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                    onMapReady={() => setMapload(false)}
                >
                    {(onetimewashstate === "accept" || dailywashstate === "accept") ?
                        <>
                            <Marker key={"pickuplocation"} anchor={{ x: 0.5, y: 1 }} coordinate={pickup} >
                                <View style={{ alignItems: "center" }} >
                                    <View style={{ width: "auto", height: windowheight * 0.035, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 10, }} >
                                        <Text family="GMedium" >service location</Text>
                                    </View>
                                    <Image
                                        source={icons.pickup}
                                        style={{ width: windowwidth * 0.08, height: windowwidth * 0.08, marginTop: 5 }}
                                    />
                                </View>
                            </Marker>
                            <Polyline
                                key={"pickuplocation_line"}
                                coordinates={[pickup, currentloc]}
                                strokeWidth={2}
                                strokeColor={theme.btnColor}
                                geodesic
                            />
                        </> :
                        <>
                        </>
                    }

                    <Marker
                        key={"currentlocation"}
                        anchor={{ x: 0.5, y: 1 }}
                        pinColor={Colors.purple}
                        coordinate={currentloc} title="Currentlocation" >
                        <View style={{ alignItems: "center" }} >
                            <View style={{ width: "auto", height: windowheight * 0.035, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 10, }} >
                                <Text family="GMedium" >current location</Text>
                            </View>
                            <Image
                                source={icons.pickup}
                                style={{ width: windowwidth * 0.08, height: windowwidth * 0.08, marginTop: 5, tintColor: "#38C274" }}
                            />
                        </View>

                    </Marker>



                </MapView> :

                <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }} >
                    <Text family="GRegular" >Referesh the Map</Text>
                    <Button
                        title="Referesh"
                        onPress={() => getlocation()}
                        buttonStyle={{ width: "50%", marginTop: "5%", height: windowheight * 0.05 }}
                    />
                </View>
            }

        </View>
    )

})

export default Mapscreen


