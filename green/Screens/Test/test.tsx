import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";


export default function Test() {
    return (
        <View style={{ flex: 1, }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                region={{
                    latitude: 9.9252,
                    longitude: 78.1198,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >

            </MapView>

        </View>
    )
}