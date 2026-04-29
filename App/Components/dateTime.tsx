import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import Text from "./text";
import VectorIcons from "../Utilities/vectorIcons";
import theme from "../Utilities/theme";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../Utilities/uiasset";

type DateTimeProps = {
    value?: any;
    onChange?: (value?: any)=>void;
    disabled?: boolean;
    dateAlone?: boolean;
    calendarIconDisplay?: boolean
};

const DateTime: React.FC<DateTimeProps> = ({ value, onChange,  disabled= false, dateAlone= false, calendarIconDisplay= true }) => {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState<"date" | "time">("date");

    const handlePicker = (event: any, selectedDate?: Date) => {
        // console.log('')
        if (event.type === "dismissed") {
            setShow(false);
            return;
        }
        if (mode === "date") {
            const pickedDate = selectedDate || date;
            setDate(pickedDate);
            if(dateAlone){
                setShow(false);
            }
            else{
                setMode("time");
                setShow(true);
            }
            onChangeCheck(pickedDate);
        }
        else {
            const pickedTime = selectedDate || date;
            setDate(pickedTime);

            setShow(false);

            setMode("date");
            onChangeCheck(pickedTime);
        }
    };

    const formatDateTime = (d: Date) => {
        return d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }) + " | " + d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDateAlone = (d: Date) => {
        return d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const onChangeCheck = (value: any) => {
        if(onChange){
            onChange(value);
        }
    }

    useEffect(()=>{
        if(value){
            console.log('vallllheyyyy',value,new Date(value).getTime())
            setDate(value);
        }
    },[value])


    return (
        <View style={{ gap: 20 }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Pressable
                    onPress={() => {
                        setMode("date");
                        setShow(true);
                    }}
                    disabled={disabled}
                >
                    <View style={{ borderRadius: 20, backgroundColor: '#d8dbf0ff', flexDirection: 'row', gap: 10, paddingVertical: 8, paddingHorizontal: 15 }}>
                        <Text family="GMedium" size="semimedium" color={Colors.primary} style={{ textAlign: 'center' }}>
                            {
                                dateAlone
                                    ?
                                    formatDateAlone(date)
                                    :
                                    formatDateTime(date)
                            }
                        </Text>
                        <VectorIcons family="AntDesign"
                            name="right"
                            size={15} />
                    </View>
                </Pressable>

                {
                    calendarIconDisplay
                        ?
                        <>
                            <Pressable
                                onPress={() => {
                                    setMode("date");
                                    setShow(true);
                                }}
                                disabled={disabled}
                            >
                                <VectorIcons
                                    family="AntDesign"
                                    name="calendar"
                                    size={22}
                                />
                            </Pressable>
                        </>
                        :
                        <></>
                }

                
            </View>

            {show && (
                <RNDateTimePicker
                    value={date}
                    mode={mode}
                    display="spinner"
                    onChange={handlePicker}
                />
            )}
        </View>
    )
}

export default DateTime;
