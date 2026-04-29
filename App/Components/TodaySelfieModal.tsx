import React from "react";
import { View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Sheet from "./bottomsheetmodal";
import Text from "./text";
import { Button } from "./Field";
import useCustomHooks from "../Actions/Hooks/customhook";

interface TodaySelfieModalProps {
    sheetref: React.RefObject<BottomSheetModal | null>;
    onPress?: () => void;
}

const TodaySelfieModal: React.FC<TodaySelfieModalProps> = ({
    sheetref,
    onPress
}) => {
    const { theme } = useCustomHooks()

    return (
        <Sheet
            sheetref={sheetref}
            snappoint={["30%"]}
            backdropbehaviour="none"
            bottomSheetProps={{
                enablePanDownToClose: false,
                enableOverDrag: false
            }}

        >
            <View style={{ padding: "5%", flex: 1, justifyContent: "space-between" }} >
                <View>
                    <Text family="GBold" size="semilarge" >Today Selfie</Text>
                    <Text family="GRegular" size="medium" top={"2%"} >
                        service partners are requested to take a selfie for today
                    </Text>
                </View>

                <Button
                    title="Take a selfie"
                    onPress={() => {
                        sheetref.current?.dismiss()
                        onPress && onPress()
                    }}
                    buttonStyle={{ width: "100%", marginBottom: "5%" }}
                />
            </View>
        </Sheet>
    )
}

export default TodaySelfieModal;
