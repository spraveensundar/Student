import React, { useState } from "react";
import { View } from "react-native";
import Mainview from "../../Components/mainview";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Text from "../../Components/text";
import Flexcomponent from "../../Components/flexcomponent";
import Images, { icons } from "../../Utilities/images";
import Card from "../../Components/Card";
import { windowwidth } from "../../Utilities/dimensions";
import { Button } from "../../Components/Field";
import ChallanNumber from "./challanNumber";
import VehicleNumber from "./vehicleNumber";
import DriverLicenseNumber from "./driverLicenseNumber";

const ChallanCqPayment: React.FC = () => {
    const [isSelect, setIsSelect] = useState(false)
    const [selected, setSelected] = useState(0);
    const items = [
        { icon: icons.Receipt, label: "Challan Number", component: <ChallanNumber /> },
        { icon: icons.LicensePlate, label: "Vehicle number", component: <VehicleNumber /> },
        { icon: icons.License, label: "Driver's License Number", component: <DriverLicenseNumber /> },
    ];
    const { theme, navigation } = useCustomHooks();
    return (
        <Mainview
            isheader={true}
            headertitle="Challan Check & Payment"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                isSelect && (
                    <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                        <Button
                            title="Get details"
                            onPress={() => navigation.navigate("PaymentSummery")}
                        />
                    </View>
                )
            }

        >
            <View style={{ marginTop: '5%', gap: 20 }}>
                <Text family="GMedium" size="semilarge">Challan Check & Payment</Text>
                <Flexcomponent
                    justifyContent="space-around"
                    alignItems="flex-start"
                    style={{
                        width: "100%",
                        marginTop: "5%",
                        flexWrap: "wrap",
                        gap: 10,
                    }}
                >
                    {items.map((item, index) => (
                        <View key={index} style={{
                            width: "30%",
                            alignItems: "center",
                            gap: 10,
                        }}>
                            <Card borderColor={isSelect && selected === index ? theme.btnColor : "#CFCFCF"} containerStyle={{ padding: 20 }} ispress={true} onPress={() => {
                                setIsSelect(true);
                                setSelected(index);
                            }}>
                                <Images
                                    type="image"
                                    source={item.icon}
                                    width={windowwidth * 0.15}
                                    height={windowwidth * 0.15}
                                />
                            </Card>
                            <Text family={isSelect && selected === index ? "GMedium" : "GRegular"} size="semimedium" color={isSelect && selected === index ? "#000C51" : theme.primarytext}>{item.label}</Text>
                        </View>
                    ))}
                </Flexcomponent>

                {isSelect && (
                    <>
                        <Text family="GMedium" size="semilarge">Details</Text>

                        {selected !== null && items[selected]?.component}
                    </>
                )}

            </View>
        </Mainview >
    )
}

export default ChallanCqPayment;