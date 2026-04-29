import React, { useContext } from 'react';
import { FlatList, StyleSheet, Pressable, View } from 'react-native';

import Text from '../../../Components/text';
import { Colors } from '../../../Utilities/uiasset';
import VectorIcons from '../../../Utilities/vectoricons';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import ThemeContext from '../../../Utilities/themecontext';

type Option = {
    label: string;
    value: string;
    addIcon?: React.ReactNode,
    activetext?:string
};

type Props = {
    title?: string;
    options?: Option[];
    selectedValue?: string;
    onChange?: (value: string) => void;
    activetext?:string
    
};

const SelectList: React.FC<Props> = ({
    options,
    selectedValue,
    onChange,
    activetext
}) => {
    const theme = useContext(ThemeContext)
    const totalItem = options?.length;
    return (
        <>
            <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => {
                    const isSelected = selectedValue === item.value;
                    return (
                        <Pressable
                            style={styles.option}
                            onPress={() => onChange?.(item.value)}
                            hitSlop={5}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: isSelected ? (activetext ?? theme.darktext ): Colors.warmgrey }}>{item.label}  </Text>
                                {item.addIcon && (item.addIcon)}
                            </View>
                            {
                                totalItem === 2 ?
                                    isSelected && (
                                        <VectorIcons
                                            family="Feather"
                                            name="check"
                                            iconcolor={Colors.green}
                                            size={18}
                                        />
                                    )
                                    : <VectorIcons
                                        family="Feather"
                                        name="check"
                                        iconcolor={isSelected ? Colors.green : Colors.warmgrey}
                                        size={18}
                                    />
                            }
                        </Pressable>
                    )
                }
                }
            />

        </>
    );
};

export default SelectList;

const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: "8%"
    },
});