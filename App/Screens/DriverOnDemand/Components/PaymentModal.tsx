import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import CommonStyles from '../../../Utilities/fontStyle';
import UseModal from '../../../Components/useModal';
import { windowheight } from '../../../Utilities/dimensions';
import RadioButton from '../../../Components/Field/RadioButton/RadioButton';
import { constantData } from '../../../Common/constant';

export interface PaymentModalProps {
  visible: boolean;
  setPaymentVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selected: number;
  setSelected: (id: string) => void;
}

const paymentOptions = [
  { id: 1, label: 'Online', icon: 'Googlepay' as const, value: constantData.paymentType.online },
  { id: 2, label: 'Cash', icon: 'Cash' as const, value: constantData.paymentType.cash },
  // { id: 3, label: 'PayPal', icon: 'Paypal' as const },
  // { id: 4, label: 'Google Pay', icon: 'Googlepay' as const },
];

const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  setPaymentVisible,
  selected,
  setSelected,
}) => {
  const { theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);

  return (
    <UseModal
      visible={visible}
      setVisible={setPaymentVisible}
      containerStyle={{ height: windowheight * 0.36 }}
    >
      <View style={style.container}>
        <Text style={[CommonStyle.textGMedium, { marginBottom: 10 }]}>
          Payments
        </Text>

        <FlatList
          data={paymentOptions}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <RadioButton
              id={item.value}
              label={item.label}
              icon={item.icon}
              selected={selected}
              onPress={()=>setSelected(item.value)}
              textStyle={{}}
            />
          )}
        />
      </View>
    </UseModal>
  );
};

export default PaymentModal;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      paddingVertical: 5,
      paddingHorizontal: 5,
    },
  });
