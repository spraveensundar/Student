import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import { windowwidth } from '../../Utilities/dimensions';
import Images, { icons } from '../../Utilities/images';
import CommonStyles from '../../Utilities/fontStyle';
import useCustomHooks from '../../Actions/Hooks/customhook';
import { Colors, Fontfamily, Fontsize } from '../../Utilities/uiasset';
import Mainview from '../../Components/mainview';
import VectorIcons from '../../Utilities/vectorIcons';
import Card from '../../Components/Card';
import Text from '../../Components/text';
import Line from '../../Components/Line';
import RowInfo from '../../Components/RowInfo';
import LocationInputs from './Components/LocationInput';
import DriverCard from './Components/DriverCard';
import { fonts } from 'react-native-elements/dist/config';

const Notifications: React.FC = ({}) => {
  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);

  const rideData = [
    {
      title: 'Ride Reschedule Requested',
      subtitle:
        'We’ve received your request to reschedule your outstation trip.',
    },
    {
      title: 'Upcoming Outstation Trip',
      subtitle: 'Reminder! Your outstation ride is scheduled',
    },
    {
      title: 'Ride Reschedule Requested',
      subtitle:
        'We’ve received your request to reschedule your outstation trip.',
    },
    {
      title: 'Upcoming Outstation Trip',
      subtitle: 'Reminder! Your outstation ride is scheduled',
    },
    {
      title: 'Ride Reschedule Requested',
      subtitle:
        'We’ve received your request to reschedule your outstation trip.',
    },
    {
      title: 'Upcoming Outstation Trip',
      subtitle: 'Reminder! Your outstation ride is scheduled',
    },
    {
      title: 'Ride Reschedule Requested',
      subtitle:
        'We’ve received your request to reschedule your outstation trip.',
    },
    {
      title: 'Upcoming Outstation Trip',
      subtitle: 'Reminder! Your outstation ride is scheduled',
    },
    {
      title: 'Ride Reschedule Requested',
      subtitle:
        'We’ve received your request to reschedule your outstation trip.',
    },
    {
      title: 'Upcoming Outstation Trip',
      subtitle: 'Reminder! Your outstation ride is scheduled',
    },
  ];

  return (
    <Mainview
      isheader={true}
      isscollable={false}
      headertitle="Notifications"
      horizontalpadding={0}
    >
      <FlatList
        data={rideData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View
            style={[
              CommonStyle.flexRow,
              {
                paddingHorizontal: windowwidth * 0.05,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: theme.lightBorder,
              },
            ]}
          >
            <View>
              <Images
                type="image"
                source={icons.logo}
                width={windowwidth * 0.14}
                height={windowwidth * 0.14}
                style={{
                  borderRadius: 10,
                  marginRight: 12,
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  CommonStyle.textGMedium,
                  { fontSize: Fontsize.xxmedium },
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  CommonStyle.textGRegular,
                  {
                    fontSize: Fontsize.xmedium,
                    lineHeight: Fontsize.large,
                  },
                ]}
              >
                {item.subtitle}
              </Text>
            </View>
          </View>
        )}
      />
    </Mainview>
  );
};

export default Notifications;

const styles = (theme: any) =>
  StyleSheet.create({
    contentPadding: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginVertical: 8,
    },
  });
