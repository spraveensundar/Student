import React, { useEffect, useRef, useState } from "react";
import { ImageBackground, Pressable, View } from "react-native";
import CustomBottomSheet from "../../Components/CustomBottomSheet";
import useCustomHooks from "../../Actions/Hooks/customhook";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Text from "../../Components/text";
import Images, { icons } from "../../Utilities/images";
import { windowheight, windowwidth } from "../../Utilities/dimensions";
import UseModal from "../../Components/useModal";
import { capitalizeFirstLetter, isEmpty, returnOriginalFile } from "../../Common/commonFunction";
import Checkbox from "../../Components/Field/Input/Checkbox";
import { constantData } from "../../Common/constant";
import { Button } from "../../Components/Field";

interface ChoosePremiumProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onSelect: (tabName: Array<string>) => void;
    selectedFilter?: Array<string>;
}

const OrderModal: React.FC<ChoosePremiumProps> = ({
    visible,
    setVisible,
    onSelect = (tabName) => { },
    selectedFilter,
}) => {


    const { theme, navigation } = useCustomHooks();


    const [filter, setFilter] = useState<Array<string>>([]);
    const bottomsheetref = useRef<BottomSheet>(null);


    const onSelectFilter = (selected: string) => {
        let getIndex = filter?.findIndex((check) => check == selected);
        let setData = [...filter];
        if (getIndex >= 0) {
            setData = [
                ...filter.slice(0, getIndex),
                ...filter.slice(getIndex + 1, filter?.length),
            ]
        }
        else {
            setData.push(selected);
        }
        setFilter([...setData]);
    }

    const onApply = () => {
        onSelect(filter);
        setVisible(false);
    }

    useEffect(() => {
        if (selectedFilter) {
            setFilter(selectedFilter)
        }
    }, [selectedFilter])

    console.log('filterfilter', filter)

    return (
        <UseModal
            visible={visible}
            setVisible={setVisible}
            containerStyle={{
                height: windowheight * 0.25,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                gap: 20
            }}
        >
            <Text family="bold" size="medium">Status</Text>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 20, marginBottom: 20 }}>
                <Checkbox
                    label="Active"
                    initial={selectedFilter?.some((check) => check == constantData.subscriptionFilter.active)}
                    onChange={() => onSelectFilter(constantData.subscriptionFilter.active)}
                />

                <Checkbox
                    label="Cancelled"
                    initial={selectedFilter?.some((check) => check == constantData.subscriptionFilter.cancelled)}
                    onChange={() => onSelectFilter(constantData.subscriptionFilter.cancelled)}
                />

                <Checkbox
                    label="Expired"
                    initial={selectedFilter?.some((check) => check == constantData.subscriptionFilter.expired)}
                    onChange={() => onSelectFilter(constantData.subscriptionFilter.expired)}
                />

                <Checkbox
                    label="Upcoming"
                    initial={selectedFilter?.some((check) => check == constantData.subscriptionFilter.pending)}
                    onChange={() => onSelectFilter(constantData.subscriptionFilter.pending)}
                />

            </View>


            <View >
                <Button title="Apply" onPress={() => onApply()}
                />
            </View>

        </UseModal>

    )
}

export default OrderModal;