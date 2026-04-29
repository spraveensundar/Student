import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';

import Card from '../../../Components/Card';
import Text from '../../../Components/text';
import { Colors } from '../../../Utilities/uiasset';
import VectorIcons from '../../../Utilities/vectoricons';
import useCustomHooks from '../../../Actions/Hooks/customhook';

type Option = {
    label: string;
    value: string;
    addIcon?: React.ReactNode;
};

type Props = {
    options?: Option[];
    selectedValues?: string[];
    onChange?: (values: string[]) => void;
};

const Instructions: React.FC<Props> = ({
    options = [],
    selectedValues = [],
    onChange,
}) => {
    const { theme } = useCustomHooks();

    const toggleSelect = (value: string) => {
        let newValues: string[];
        if (selectedValues.includes(value)) {
            newValues = selectedValues.filter(v => v !== value);
        } else {
            newValues = [...selectedValues, value];
        }
        onChange?.(newValues);
    };

    return (
        <View>
            {options.map((item) => {
                const isSelected = selectedValues.includes(item.value);
                return (
                    <Pressable
                        key={item.value}
                        style={styles.option}
                        onPress={() => toggleSelect(item.value)}
                        hitSlop={5}
                    >
                        <View style={{ width: "90%" }}>
                            <Text style={{ color: isSelected ? theme.darktext : Colors.warmgrey }}>
                                {item.label}
                            </Text>
                        </View>

                        <Card containerStyle={{ height: 25, width: "8%", backgroundColor: isSelected ? Colors.orange : theme.card, alignItems: "center", justifyContent: 'center' }}>
                            {
                                isSelected && (
                                    <VectorIcons
                                        family="Feather"
                                        name="check"
                                        iconcolor={Colors.white}
                                        size={15}
                                    />
                                )
                            }
                        </Card>
                    </Pressable>
                );
            })}
        </View>
    );
};

export default Instructions;

const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: "8%",
        alignItems: "center"
    },
});
