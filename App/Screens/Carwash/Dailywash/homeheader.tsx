import { View } from "react-native"
import Text from "../../../Components/text"
import { Colors } from "../../../Utilities/uiasset"
import Flexcomponent from "../../../Components/flexcomponent"
import Card from "../../../Components/Card"
import Images, { icons } from "../../../Utilities/images"
import { Button } from "../../../Components/Field"
import Line from "../../../Components/line"
import { windowheight, windowwidth } from "../../../Utilities/dimensions"
import useCustomHooks from "../../../Actions/Hooks/customhook"

interface homeheaderprops {
    todayscount?: number
    totalcount?: number

}

const Homeheader: React.FC<homeheaderprops> = ({
    todayscount = 0,
    totalcount = 0
}) => {

    const { theme, navigation } = useCustomHooks()
    return (
        <View  >
            <Text top={"5%"} size="semilarge" family="GBold" >Today’s Work Allocations</Text>

            <Text color={Colors.green} top={"1%"} size="semimedium" family="GBold" >{todayscount} Work Assigned</Text>

            {/* <Images 
              type="image"
              source={icons.Dailycarwashbanner}
              width={"100%"}
              resizeMode="cover"
              height={windowheight*0.2}
              style={{marginVertical:"2.5%"}}
             /> */}

            <Flexcomponent justifyContent="space-between" top={"5%"}  >
                <Card containerStyle={{ padding: "5%", width: "47.5%" }} >
                    <Images
                        type="image"
                        source={icons.Home}
                    />
                    <Text size="semimedium" top={"7.5%"} >Service at home</Text>
                    <Text size="semimedium" family="GRegular" top={"2.5%"} >{totalcount} Work Assigned</Text>

                </Card>

                <Card ispress onPress={() => navigation?.navigate("Servicerequest")} containerStyle={{ padding: "5%", width: "47.5%" }} >
                    <Images
                        type="image"
                        source={icons.Office}
                    />
                    <Text size="semimedium" top={"7.5%"} >View all Service</Text>
                    <Text size="semimedium" family="GRegular" top={"2.5%"} >all service</Text>

                </Card>
            </Flexcomponent>
            {/* <Button
                title="View Service Request"
                buttonStyle={{
                    width: "100%",
                }}
                top={"7.5%"}
                onPress={() => navigation.navigate("Servicerequest")}
            /> */}

            <Line width={windowwidth} top={"7.5%"} conatainerstyle={{ alignSelf: "center" }} />

            <Text top={"5%"} size="semilarge" family="GBold" >Today Booking Details</Text>

        </View>
    )

}

export default Homeheader