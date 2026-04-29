import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { BottomSheetFlashList } from "@gorhom/bottom-sheet";

import Text from "../../Components/text";
import Images from "../../Utilities/images";
import { Colors } from "../../Utilities/uiasset";
import Sheet from "../../Components/bottomsheet";
import VectorIcons from "../../Utilities/vectoricons";
import { windowheight, windowwidth } from "../../Utilities/dimensions";

interface OptionListProps {
    ref?: any;
    data?: any[];
    title?: any;
    onSelect?: (item: any) => void;
    onClose?: () => void;
    selectedId?: any
}

const OptionList: React.FC<OptionListProps> = ({
    ref,
    data = [],
    title,
    onSelect,
    onClose,
    selectedId

}) => {
    const { theme } = useCustomHooks();
    const style = styles(theme);


    const renderOption = ({ item }: {
        item?: any;
        onDelete?: (newValue: any) => void;
    }) => {
        const { id, name, value, change, date, expiresIn } = item;
        const isSelected = selectedId === id;
        return (

            <Pressable style={[style.bewteen, style.content]}
                onPress={() => {
                    onSelect?.(item);
                    onClose?.();
                }}>
                <View>
                    <Text style={{ color: theme.darktext }} >{name || date}</Text>
                    <Text style={{ color: Colors.graytext, marginTop: '2%' }}>{value} {expiresIn && <Text style={{ color: Colors.graytext }}>Expire in {expiresIn}</Text>}{change && <Text style={{ color: Colors.lightgreen }}>({change})</Text>}</Text>
                </View>
                <View style={[style.select, { backgroundColor: theme.theme === "dark" ? Colors.dune : isSelected ? Colors.green : theme.card, }]}>
                    {
                        isSelected && (
                            <VectorIcons
                                family="Octicons"
                                name="dot-fill"
                                iconcolor={theme.theme === "dark" ? Colors.green : Colors.white}
                                size={windowwidth*0.055}
                            />
                        )
                    }
                </View>
            </Pressable>

        )
    }

    return (
        <Sheet
            sheetref={ref}
            custominterface={true}
            snappoint={["45%"]}
        >
            <View style={{ flex: 1 }}>
                <View style={style.container}>
                    <View style={style.bewteen}>
                        <Text family="semiBold" size="medium" style={{ color: theme.darktext }}>{title}</Text>
                        <Pressable onPress={onClose}>
                            <Images
                                type="svg"
                                name={theme.theme === "dark" ? "Bottomclose" : "Bottomclosedark"}
                                width={windowwidth * 0.060}
                                height={windowheight * 0.040}
                            />
                        </Pressable>
                    </View>
                </View>
                <BottomSheetFlashList
                    data={data}
                    renderItem={renderOption}
                    keyExtractor={(item: any) => item.id}
                    estimatedItemSize={50}
                />
            </View>

        </Sheet>
    )

}

export default OptionList;


const styles = (theme: any) => StyleSheet.create({
    container: {
        padding: "4%",
        backgroundColor: theme.bottomheader,
        paddingHorizontal: "6%"
    },
    bewteen: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    content: {
        paddingVertical: "3%",
        paddingHorizontal: "6%"
    },
    select: {
        width: windowwidth*0.065,
        height: windowwidth*0.065,
        borderRadius: 100,
        borderColor: theme.theme === "dark" ? "" : theme.boderColor,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    }
})
