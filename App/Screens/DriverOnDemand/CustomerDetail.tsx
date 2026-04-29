import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Mainview from '../../Components/mainview';
import { Colors, Fontsize } from '../../Utilities/uiasset';
import useCustomHooks from '../../Actions/Hooks/customhook';
import CommonStyles from '../../Utilities/fontStyle';
import { Button, Input } from '../../Components/Field';
import { RFvalue, windowwidth } from '../../Utilities/dimensions';
import VectorIcons from '../../Utilities/vectorIcons';
import { useAppDispatch, useAppSelector } from '../../Store/reduxHooks';
import LocationInputs from './Components/LocationInput';
import SelectDateTime from './Components/SelectDateTime';
import WheelPickerModal from '../../Components/WheelPickerModal';
import SelectOptionRow from './Components/SelectOption';
import Card from '../../Components/Card';
import CarTypeModal from './Components/CarTypeModal';
import PaymentModal from './Components/PaymentModal';
import RowInfo from '../../Components/RowInfo';
import { getHeaderTitle } from './Components/ServiceHeaderTitle';
import Checkbox from '../../Components/Field/Input/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { setNewRideService } from '../../Common/redux/serviceReducer';
import { useGetMyDetailQuery } from '../../Common/redux/userHook';
import { isEmpty, toastFn, validateVehicleNo } from '../../Common/commonFunction';

const CustomerDetail: React.FC = () => {


  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useGetMyDetailQuery(undefined);
  const newRideService = useSelector(
    (state: any) => state?.serviceData?.newRideService,
  );


  const { navigation, theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);


  const [validateErrors, setValidateErrors] = useState<any>({})
  const [disableStatus, setDisableStatus] = useState(false);

  const userDetail = data?.data;

  useEffect(() => {
    if (!newRideService?.customerName) {
      dispatch(
        setNewRideService({
          ...{ customerName: (userDetail?.name ?? "") }
        })
      )
    }
  }, [userDetail])


  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [])
  )

  const onChange = (value: string | boolean, id: string) => {
    let setData = {
      [id]: value,
    };
    dispatch(
      setNewRideService({
        ...setData
      })
    )
  }

  const validate = () => {
    let errors: any = {};
    if (isEmpty(newRideService?.customerName)) {
      errors.customerName = "Enter customer name"
    }
    if (isEmpty(newRideService?.registrationNo)) {
      errors.registrationNo = "Enter registration number"
    }
    else if (!validateVehicleNo(newRideService?.registrationNo)) {
      errors.registrationNo = "Enter valid registration number"
    }
    return errors;
  }

  const onSubmit = () => {
    setDisableStatus(true);
    let validateCheck = validate();
    if (isEmpty(validateCheck)) {
      setValidateErrors({});
      if (!newRideService?.acceptTermsConditions) {
        toastFn("Please accept terms & conditions")
      }
      else {
        navigation.navigate('RequestDriver');
      }
    }
    else {
      toastFn("Fix all validations")
      setValidateErrors(validateCheck);
    }
    setDisableStatus(false);
  }

  console.log('dsjkfgdshfs', newRideService, userDetail)

  return (
    <Mainview
      isheader={true}
      headertitle={'Customer Details'}
      bottomContent={
        <View
          style={{
            paddingHorizontal: '6%',
            paddingTop: '5%',
            marginBottom: '5%',
            gap: 20,
            alignItems: 'center',
            borderTopWidth: 1,
            borderTopColor: theme.cardborder,
          }}
        >
          <Checkbox
            label="Accept Terms & Conditions"
            initial={newRideService?.acceptTermsConditions ? true : false}
            onChange={() => onChange(!newRideService?.acceptTermsConditions, "acceptTermsConditions")}
            disabled={disableStatus}
          />
          <Button
            title="Continue"
            onPress={() => {
              onSubmit()
            }}
            textStyle={{ fontSize: Fontsize.medium }}
            disabled={disableStatus}
          />
        </View>
      }
    >
      <View style={[{ flex: 1, marginTop: 20 }]}>
        {/* ---- CUSTOMER DETAILS TITLE ---- */}
        <Text
          style={[
            CommonStyle.textGMedium,
            { fontSize: Fontsize.xxmedium, marginBottom: 25 },
          ]}
        >
          Customer Details
        </Text>



        <Input
          label={'Customer Name'}
          placeholder="Enter Name"
          placeholderTextColor={theme.placeholderColor}
          bottom={20}
          onChange={(e) => onChange(e, "customerName")}
          value={newRideService?.customerName}
          disabled={disableStatus}
          isValid={!validateErrors?.customerName}
          errorMessage={validateErrors?.customerName}
        />

        <Input
          label={'Vehicle Registration No'}
          placeholder="Choose Vehicle model"
          placeholderTextColor={theme.placeholderColor}
          //   style={style.inputField}
          onChange={(e) => onChange((e ? e : "").toUpperCase(), "registrationNo")}
          value={newRideService?.registrationNo}
          disabled={disableStatus}
          isValid={!validateErrors?.registrationNo}
          errorMessage={validateErrors?.registrationNo}
        />
      </View>
    </Mainview>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      marginBottom: 20,
    },
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
    dotContainer: { width: 20, alignItems: 'center', paddingVertical: 3 },
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
      height: 42,
      lineHeight: RFvalue(15),
      borderBottomWidth: 1,
      borderBottomColor: theme.lightBorder,
    },
    dotRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    row: {
      flexDirection: 'row',
      gap: 15,
      marginTop: 25,
    },
    sectionText: {
      fontSize: Fontsize.small,
      fontWeight: '600',
      marginBottom: 10,
    },
    dropdownBtn: {
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.lightBorder,
    },
    dropdownText: {
      fontSize: Fontsize.medium,
    },
    summaryBox: {
      backgroundColor: theme.lightBG,
      padding: 15,
      borderRadius: 12,
      marginTop: 10,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 4,
    },
    requestBtn: {
      backgroundColor: Colors.navyBlue,
      paddingVertical: 15,
      borderRadius: 25,
      marginTop: 25,
      alignItems: 'center',
    },
    requestBtnText: {
      color: Colors.white,
      fontSize: Fontsize.medium,
      fontWeight: '600',
    },
    inputField: {
      width: '100%',
      height: 45,
      backgroundColor: theme.secondaryBackground,
      borderRadius: 10,
      paddingHorizontal: 12,
      fontSize: Fontsize.medium,
      color: theme.primarytext,
    },

    dropdownInput: {
      width: '100%',
      height: 45,
      backgroundColor: theme.secondaryBackground,
      borderRadius: 10,
      paddingHorizontal: 12,
      justifyContent: 'center',
    },
  });

export default CustomerDetail;
