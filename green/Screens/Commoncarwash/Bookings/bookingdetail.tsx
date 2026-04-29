import { useSelector } from "react-redux"
import Card from "../../../Components/Card"
import Line from "../../../Components/line"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text"
import { RFvalue, windowheight, windowwidth } from "../../../Utilities/dimensions"
import Detilsofride from "../../Others/Common/detailsofride"
import Profileinfo from "../Jobdetail/profileinfo"
import { helperSelector, update_dailywashstate, update_onetimewashstate } from "../../../Slices/helper"
import { Button } from "../../../Components/Field"
import Flexcomponent from "../../../Components/flexcomponent"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import { Colors } from "../../../Utilities/uiasset"
import { useMemo } from "react"

const Bookingdetail: React.FC = ({ route }: any) => {
    const { serviceitem } = route?.params;
    console.log(serviceitem, "serviceitem");
    const { subscriptionDetail } = serviceitem

    const { theme, navigation, dispatch } = useCustomHooks();
    const { servicetype } = useSelector(helperSelector);

    const itemtotal = useMemo(() => {
        return (parseFloat(subscriptionDetail?.percentages?.totalSubscriptionAmount) - parseFloat(subscriptionDetail?.percentages?.platFormFeeAmount) - parseFloat(subscriptionDetail?.percentages?.gstAmount)).toFixed(2)
    }, [serviceitem])

    const totalamount = useMemo(() => {
        let addonprice: any = 0
        if (serviceitem?.services?.length) {
            addonprice = serviceitem?.services?.reduce((acc: any, curr: any) => acc + parseFloat(curr.price), 0) ?? 0
        }
        const total = parseFloat(subscriptionDetail?.percentages?.totalSubscriptionAmount) + parseFloat(addonprice)
        return total.toFixed(2)
    }, [serviceitem])



    return (
        <Mainview
            headertitle="Booking Details"
            isboxshadow
        // {...(params?.status === 'upcomming' ? {
        //     custombottomcontent:
        //         <Flexcomponent justifyContent="space-between" paddingHorizontal={windowwidth * 0.05} paddingVertical={windowwidth * 0.05} >
        //             {servicetype === 'onetimewash' && <Button
        //                 title="Reject"
        //                 buttonStyle={{
        //                     width: "45%",
        //                     height: windowheight * 0.05,
        //                     borderWidth: 1,
        //                     borderColor: "#CF1322",
        //                     backgroundColor: "transparent"
        //                 }}
        //                 textStyle={{
        //                     color: "#CF1322"
        //                 }}
        //             />}

        //             <Button
        //                 title="Accept"
        //                 buttonStyle={{
        //                     width: servicetype === 'onetimewash' ? "45%" : "100%",
        //                     height: windowheight * 0.05,
        //                     backgroundColor: Colors.green
        //                 }}
        //                 textStyle={{
        //                     color: theme.white
        //                 }}
        //                 onPress={() => {
        //                     navigation.navigate("Vendorhome")
        //                     dispatch(update_dailywashstate("accept"))
        //                     dispatch(update_onetimewashstate("accept"))
        //                 }}
        //             />
        //         </Flexcomponent>
        // }
        //     : {})}
        >
            <Profileinfo
                name={serviceitem?.userDetail?.name}
                id={serviceitem?.serviceUniqueId}
                address={serviceitem?.subscriptionDetail?.address}
                image={serviceitem?.userDetail?.profile}
            // blockno={serviceitem?.subscriptionDetail?.blockNo}
            // apartmentname={serviceitem?.subscriptionDetail?.apartmentName}
            />
            <Line width={windowwidth} conatainerstyle={{ alignSelf: "center" }} />

            <Text style={{ fontSize: RFvalue(14.5) }} family="GMedium" top={"5%"} >Customer Details</Text>
            <Card containerStyle={{ padding: "5%", marginTop: "3%" }} >
                <Detilsofride
                    leftext="Blocknumber"
                    righttext={serviceitem?.subscriptionDetail?.blockNo}
                />
                <Detilsofride
                    leftext="Flat No"
                    righttext={serviceitem?.subscriptionDetail?.flatNo}
                    top={"5%"}
                    leftwidth={50}
                />


                <Detilsofride
                    leftext="Apartment Name"
                    righttext={serviceitem?.subscriptionDetail?.apartmentName}
                    top={"5%"}
                    leftwidth={50}
                />

                <Detilsofride
                    leftext="Sector"
                    righttext={serviceitem?.subscriptionDetail?.sector}
                    top={"5%"}
                    leftwidth={40}
                />

                <Detilsofride
                    leftext="Landmark"
                    righttext={serviceitem?.subscriptionDetail?.landmark}
                    top={"5%"}
                    leftwidth={40}
                />


                <Detilsofride
                    leftext="Parking Type"
                    righttext={serviceitem?.subscriptionDetail?.parkingType}
                    top={"5%"}
                    leftwidth={40}
                />

                <Detilsofride
                    leftext="Parking detail"
                    righttext={serviceitem?.subscriptionDetail?.parkingDetail}
                    top={"5%"}
                    leftwidth={40}
                />

                <Detilsofride
                    leftext="Instructions"
                    righttext={serviceitem?.subscriptionDetail?.instructions}
                    top={"5%"}
                    leftwidth={40}
                />
            </Card>


            <Text style={{ fontSize: RFvalue(14.5) }} family="GMedium" top={"5%"} >Vehicle Details</Text>
            <Card containerStyle={{ padding: "5%", marginTop: "3%" }} >
                <Detilsofride
                    leftext="Vehicle Type"
                    righttext="Car"
                />

                <Detilsofride
                    leftext="Vehicle Make"
                    righttext={subscriptionDetail?.brandDetails?.brandName}
                    top={"5%"}
                />

                <Detilsofride
                    leftext="Vehicle Model"
                    righttext={subscriptionDetail?.brandVehicleDetails?.brandVehicleName}
                    top={"5%"}
                />

                <Detilsofride
                    leftext="Vehicle Registration Number"
                    righttext={subscriptionDetail?.registrationNo}
                    top={"5%"}
                    leftwidth={40}
                />

                <Detilsofride
                    leftext="Body Type"
                    righttext={subscriptionDetail?.brandVehicleDetails?.vehicleBodyType}
                    top={"5%"}
                    leftwidth={40}
                />
            </Card>

            <Text style={{ fontSize: RFvalue(14.5) }} family="GMedium" top={"5%"} >Service Details</Text>
            <Card containerStyle={{ padding: "5%", marginTop: "3%" }} >
                {subscriptionDetail?.subscriptionPackage?.whatsIncluded?.map((e: any, i) => (
                    <Detilsofride
                        leftext={e?.text}
                        leftwidth={100}
                        top={i != 0 ? "5%" : 0}
                    />))
                }


            </Card>

            <Text style={{ fontSize: RFvalue(14.5) }} family="GMedium" top={"5%"} >Booking Details</Text>
            <Card containerStyle={{ padding: "5%", marginTop: "3%" }} >
                <Detilsofride
                    leftext="Order ID"
                    righttext={"#" + serviceitem?.serviceUniqueId}
                />

                <Detilsofride
                    leftext="Date"
                    righttext={(new Date(serviceitem?.serviceStartTime)).toLocaleDateString()}
                    top={"5%"}
                />


                {servicetype == "dailywash" ?
                    <Detilsofride
                        leftext="Slot Time"
                        righttext={serviceitem?.subscriptionDetail?.serviceStartTime?.display + " - " + serviceitem?.subscriptionDetail?.serviceEndTime?.display}
                        top={"2.5%"}
                    /> :
                    <Detilsofride
                        leftext="Service Time"
                        righttext={(new Date(serviceitem?.serviceStartTime)).toLocaleTimeString() ?? ""}
                        top={"2.5%"}
                    />}

                {/* <Detilsofride
                    leftext="Vehicle Registration Number"
                    righttext="TN-63-8956"
                    top={"5%"}
                    leftwidth={40}
                /> */}

                <Detilsofride
                    leftext="Service Place"
                    righttext="At Home"
                    top={"5%"}
                />

                <Detilsofride
                    leftext="Service Name"
                    righttext={subscriptionDetail?.subscriptionPackage?.subHeading}
                    top={"5%"}
                />

                {serviceitem?.services?.length ?
                    serviceitem?.services?.map((e: any, i: number) => (
                        <Detilsofride
                            leftext={"Add on service " + (i + 1)}
                            righttext={e?.name}
                            top={"5%"}
                            leftwidth={60}
                        />
                    )) : null}
            </Card>

            <Text style={{ fontSize: RFvalue(14.5) }} family="GMedium" top={"5%"} >Payment Summary</Text>
            <Card containerStyle={{ padding: "5%", marginTop: "3%" }} >
                {servicetype === 'onetimewash' && <Detilsofride
                    leftext="Item Total"
                    righttext={"₹" + itemtotal}
                />}

                {/* <Detilsofride
                    leftext="Addon Total"
                    righttext="₹299"
                    top={servicetype === 'onetimewash' ? "5%" : 0}
                /> */}

                <Detilsofride
                    leftext="Platform Fee"
                    righttext={"₹" + subscriptionDetail?.percentages?.platFormFeeAmount}
                    top={"5%"}
                />

                <Detilsofride
                    leftext="GST"
                    righttext={"₹" + subscriptionDetail?.percentages?.gstAmount}
                    top={"5%"}
                />

                {serviceitem?.services?.length ?
                    serviceitem?.services?.map((e: any, i: number) => (
                        <Detilsofride
                            leftext={"Add on price " + (i + 1)}
                            righttext={"₹" + e?.price}
                            top={"5%"}
                            leftwidth={60}
                        />
                    )) : null}
            </Card>
            <Card containerStyle={{ padding: "5%", marginTop: "3%" }} >
                <Detilsofride
                    leftext="Total"
                    righttext={`₹${totalamount}`}
                />
            </Card>
        </Mainview>
    )

}

export default Bookingdetail