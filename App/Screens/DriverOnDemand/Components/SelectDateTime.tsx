import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
  TextStyle,
} from 'react-native';
import VectorIcons from '../../../Utilities/vectorIcons';
import { Colors, Fontsize } from '../../../Utilities/uiasset';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import CommonStyles from '../../../Utilities/fontStyle';

interface Props {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  selectedHours?: number;
  onSelectHour?: (hr: number) => void;
  selectedDays?: number;
  onSelectDays?: (day: number) => void;
  selectedDate: string;
  onPressDate: () => void;
  enableTimeDurationPicker?: boolean;
  enableDateDurationPicker?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const hoursList = [2, 4, 6, 8, 12];
const daysList = [1, 2, 3, 4, 5];

const SelectDateTime: React.FC<Props> = ({
  label = 'Select date & time',
  labelStyle = {},
  selectedHours,
  onSelectHour,
  selectedDays,
  onSelectDays,
  selectedDate,
  onPressDate,
  enableTimeDurationPicker = true,
  enableDateDurationPicker = false,
  containerStyle,
}) => {
  const { theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);
  return (
    <View style={[containerStyle]}>
      <Text style={[CommonStyle.textGMedium, { fontSize: Fontsize.xxmedium }, labelStyle]}>{label}</Text>

      {/* Date Selector */}
      <View
        style={[
          CommonStyle.flexRow,
          { justifyContent: 'space-between', marginTop: 10 },
        ]}
      >
        <Pressable style={style.dateBox} onPress={onPressDate}>
          <Text
            style={[
              CommonStyle.textHBold,
              {
                fontSize: Fontsize.small,
                color: Colors.primary,
              },
            ]}
          >
            {selectedDate}
          </Text>
          <VectorIcons
            family="MaterialCommunityIcons"
            name="chevron-right"
            size={18}
            iconcolor={Colors.primary}
            style={{ marginLeft: 3 }}
          />
        </Pressable>
        <Pressable onPress={onPressDate}>
          <VectorIcons
            family="MaterialCommunityIcons"
            name="calendar-clock"
            size={24}
            iconcolor={Colors.black}
          />
        </Pressable>
      </View>

      {/* Hours List */}
      {enableTimeDurationPicker && <View style={style.hourRow}>
        {hoursList.map(hr => (
          <TouchableOpacity
            key={hr}
            style={[style.hourTab, selectedHours === hr && style.hourTabActive]}
            onPress={() => onSelectHour(hr)}
          >
            <Text
              style={[
                CommonStyle.textGMedium,
                { fontSize: Fontsize.medium, color: theme.grayText },
                selectedHours === hr && style.hourTextActive,
              ]}
            >
              {hr}
            </Text>
            <Text
              style={[
                CommonStyle.textGRegular,
                { fontSize: Fontsize.semimedium, color: theme.grayText },
                selectedHours === hr && style.hourTextActive,
              ]}
            >
              Hr
            </Text>
          </TouchableOpacity>
        ))}
      </View>}

      {/* Days List */}
      {enableDateDurationPicker && <View style={style.hourRow}>
        {daysList.map(day => (
          <TouchableOpacity
            key={day}
            style={[style.hourTab, selectedDays === day && style.hourTabActive]}
            onPress={() => onSelectDays(day)}
          >
            <Text
              style={[
                CommonStyle.textGMedium,
                { fontSize: Fontsize.medium, color: theme.grayText },
                selectedDays === day && style.hourTextActive,
              ]}
            >
              {day}
            </Text>
            <Text
              style={[
                CommonStyle.textGRegular,
                { fontSize: Fontsize.semimedium, color: theme.grayText },
                selectedDays === day && style.hourTextActive,
              ]}
            >
              {day > 1 ? 'Days' : 'Day'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>}
    </View>
  );
};

export default SelectDateTime;

const styles = (theme: any) =>
  StyleSheet.create({
    sectionTitle: {
      fontSize: Fontsize.small,
      fontWeight: '600',
      marginBottom: 10,
      color: Colors.black,
    },
    dateBox: {
      borderWidth: 1,
      borderColor: theme.lightBorder,
      paddingVertical: 8,
      paddingLeft: 14,
      paddingRight: 8,
      borderRadius: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors.primary10,
    },
    dateText: {
      fontSize: Fontsize.medium,
      color: Colors.black,
    },
    hourRow: {
      flexDirection: 'row',
      marginTop: 20,
      gap: 10,
    },
    hourTab: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.cardborder,
      backgroundColor: theme.cardbg,
      alignItems: 'center',
    },
    hourTabActive: {
      backgroundColor: Colors.primary,
      borderColor: Colors.primary,
    },
    hourText: {
      fontSize: Fontsize.medium,
      color: Colors.black,
      fontWeight: '700',
    },
    hourTextActive: {
      color: Colors.white,
    },
    hrSubText: {
      fontSize: Fontsize.small,
      color: theme.grayText,
    },
  });
