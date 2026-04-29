import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  Text,
  StyleProp,
  TextStyle,
  Pressable,
  ViewStyle,
} from 'react-native';
import CommonStyles from '../../../Utilities/fontStyle';
import VectorIcons from '../../../Utilities/vectorIcons';
import { RFvalue, windowwidth } from '../../../Utilities/dimensions';
import { Colors, Fontsize } from '../../../Utilities/uiasset';
import { useAppSelector } from '../../../Store/reduxHooks';
import { fonts } from 'react-native-elements/dist/config';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import { useSelector } from 'react-redux';
interface Props {
  pickupValue?: string;
  dropValue?: string;
  pickupFocus: boolean;
  dropFocus: boolean;
  setPickupFocus: (v: boolean) => void;
  setDropFocus: (v: boolean) => void;
  goToSearch: (type: 'pickup' | 'drop') => void;
  headTitle?: string;
  inputLabel?: boolean;
  noCard?: boolean;
  inpuStyle?: StyleProp<TextStyle>;
  cardStyle?: StyleProp<ViewStyle>;
  datePicker?: boolean;
  readOnly?: boolean;
  showDrop?: boolean;
  setLastFocused?: (type: 'pickup' | 'drop') => void;
}

const LocationInputs: React.FC<Props> = ({
  pickupValue,
  dropValue,
  pickupFocus,
  dropFocus,
  setPickupFocus,
  setDropFocus,
  goToSearch,
  headTitle,
  inputLabel,
  noCard,
  inpuStyle,
  cardStyle,
  datePicker,
  readOnly,
  showDrop = true,
  setLastFocused = () => {},
}) => {


  const newRideService = useSelector((state: any) => state?.serviceData?.newRideService)


  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);


  const pickup = pickupValue ?? newRideService?.fromLocation?.address;
  const drop = dropValue ?? newRideService?.toLocation?.address;


  const assignLastFocused = (type: 'pickup' | 'drop') => {
    if(setLastFocused){
      setLastFocused(type);
    }
  }

  return (
    <View style={[noCard ? style.noCard : style.locationCard, cardStyle]}>
      {
        headTitle
          ?
          (
            <Text
              style={[
                CommonStyle.textGMedium,
                {
                  fontSize: Fontsize.xxmedium,
                  color: theme.primarytext,
                  marginBottom: 10,
                },
              ]}
            >
              {headTitle}
            </Text>
          )
          :
          null
      }
      <View style={CommonStyle.flexRow}>
        {/* DOTS */}
        <View style={style.dotContainer}>
          <View style={style.dotRow}>
            <View style={style.pickupDot} />
            {pickupFocus && (
              <VectorIcons
                family="Ionicons"
                name={'caret-forward'}
                size={windowwidth * 0.04}
                iconcolor={Colors.lightGreen}
                style={{ position: 'absolute', right: -15 }}
              />
            )}
          </View>
          {showDrop && (
            <>
              <Text>{' '}</Text>
              <View style={style.line} />
              <View style={style.dotRow}>
                <View style={style.dropDot} />
                {dropFocus && (
                  <VectorIcons
                    family="Ionicons"
                    name={'caret-forward'}
                    size={windowwidth * 0.04}
                    iconcolor={Colors.red}
                    style={{ position: 'absolute', right: -15 }}
                  />
                )}
              </View>
            </>
          )}
        </View>

        {/* INPUT BOXES */}
        <View style={style.inputContainer}>
          {inputLabel && (
            <Text
              style={[
                CommonStyle.textGRegular,
                {
                  fontSize: Fontsize.semimedium,
                  color: theme.placeholderColor,
                },
              ]}
            >
              Pick-up
            </Text>
          )}

          <TextInput
            style={[
              CommonStyle.textGMedium,
              style.input,
              { fontSize: Fontsize.medium },
              inpuStyle,
            ]}
            value={pickup}
            onFocus={() => {
              if(!readOnly ){
                setPickupFocus(true);
                assignLastFocused('pickup');
              }
            }}
            onBlur={() => !readOnly && setPickupFocus(false)}
            placeholder="Enter Pickup Location"
            placeholderTextColor={theme.placeholderColor}
            onPressIn={() => !readOnly && goToSearch('pickup')}
            selection={{ start: 0 }}
            editable={!readOnly}
          />
          {showDrop && (
            <>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: theme.lightBorder,
                  marginVertical: 5,
                }}
              />
              {inputLabel && (
                <Text
                  style={[
                    CommonStyle.textGRegular,
                    {
                      fontSize: Fontsize.semimedium,
                      color: theme.placeholderColor,
                      marginTop: 8,
                    },
                  ]}
                >
                  Drop off (optional)
                </Text>
              )}

              <TextInput
                style={[
                  CommonStyle.textGMedium,
                  style.input,
                  {
                    fontSize: Fontsize.medium,
                  },
                  inpuStyle,
                ]}
                value={drop||""}
                onFocus={() => {
                  if (!pickup) {
                    !readOnly && setDropFocus(false);
                    Keyboard.dismiss();
                    return;
                  }
                  setDropFocus(true);
                  assignLastFocused('drop');
                }}
                onBlur={() => !readOnly && setDropFocus(false)}
                placeholder="Enter Drop Location"
                placeholderTextColor={theme.placeholderColor}
                onPressIn={() => {
                  console.log('drpooowow',readOnly)  
                  !readOnly && goToSearch('drop')
                }}
                selection={{ start: 0 }}
                editable={!readOnly}
              />
            </>
          )}
        </View>
        {datePicker && (
          <Pressable
            style={[
              CommonStyle.flexRow,
              {
                justifyContent: 'space-between',
                backgroundColor: Colors.primary,
                paddingVertical: 6,
                paddingHorizontal: 8,
                borderRadius: 8,
              },
            ]}
          >
            <View>
              <Text
                style={[
                  CommonStyle.textGMedium,
                  {
                    fontSize: Fontsize.semimedium,
                    color: Colors.white,
                    marginRight: 6,
                  },
                ]}
              >
                22 Oct
              </Text>
              <Text
                style={[
                  CommonStyle.textGMedium,
                  { fontSize: Fontsize.tinylarge, color: Colors.yellow },
                ]}
              >
                04:15 PM
              </Text>
            </View>
            <VectorIcons
              family="Feather"
              name="chevron-down"
              size={14}
              iconcolor={Colors.white}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default LocationInputs;

const styles = (theme: any) =>
  StyleSheet.create({
    locationCard: {
      backgroundColor: theme.background,
      borderRadius: 10,
      padding: 15,
      paddingRight: 0,
      shadowColor: theme.darktext,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    noCard: {},
    dotContainer: { width: 20, alignItems: 'center', paddingVertical: 7 },
    pickupDot: {
      width: 20,
      height: 20,
      borderRadius: 50,
      borderWidth: 6,
      borderColor: Colors.lightGreen,
    },
    line: { width: 2, flex: 1, backgroundColor: theme.grayText },
    dropDot: {
      width: 16,
      height: 16,
      borderRadius: 50,
      backgroundColor: Colors.red,
      borderWidth: 3,
      borderColor: 'white',
      marginBottom: 5,
      outlineWidth: 2,
      outlineColor: Colors.red,
    },
    inputContainer: { flex: 1, paddingLeft: 15 },
    input: {
      height: 38,
      lineHeight: RFvalue(15),
    },
    dotRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
  });
