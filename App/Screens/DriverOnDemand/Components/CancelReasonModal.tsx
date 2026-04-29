import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import CommonStyles from '../../../Utilities/fontStyle';
import UseModal from '../../../Components/useModal';
import { windowheight, windowwidth } from '../../../Utilities/dimensions';
import RadioButton from '../../../Components/Field/RadioButton/RadioButton';
import { Button, Input } from '../../../Components/Field';
import { Colors, Fontsize } from '../../../Utilities/uiasset';

export interface CancelReasonModalProps {
  visible: boolean;
  setCancelVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selected: any;
  setSelected: (id: any) => void;
}

const paymentOptions = [
  { id: 1, label: 'Driver took too long to arrive' },
  { id: 2, label: 'Driver’s location was incorrect' },
  { id: 3, label: 'Change of plans' },
  { id: 4, label: 'Booked by mistake' },
  { id: 5, label: 'Found another ride option' },
  { id: 6, label: 'Fare too high' },
  { id: 7, label: 'Need to change drop location' },
  { id: 8, label: "Other reason"},
];

const CancelReasonModal: React.FC<CancelReasonModalProps> = ({
  visible,
  setCancelVisible,
  setConfirmVisible,
  selected,
  setSelected,
}) => {


  const { theme, navigation } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);


  const [ otherReason, setOtherReason ] = useState("");


  const onCancel = () => {
    setCancelVisible(false);
    setConfirmVisible(true);
    if(selected == paymentOptions[paymentOptions.length - 1].id){
      paymentOptions[paymentOptions.length - 1].label = otherReason;
      setSelected(paymentOptions[paymentOptions.length - 1]);
    }
    else{
      paymentOptions[paymentOptions.length - 1].label = "Other reason";
      setOtherReason("");
    }
  }

  return (
    <UseModal
      visible={visible}
      setVisible={setCancelVisible}
      containerStyle={{ height: windowheight * 0.55, paddingBottom: 15 }}
    >
      <View style={style.container}>
        <Text style={[CommonStyle.textGMedium, { marginBottom: 10 }]}>
          Cancel Reason
        </Text>

        <FlatList
          data={paymentOptions}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <RadioButton
              id={item.id}
              label={item.label}
              selected={selected}
              onPress={()=>setSelected(item)}
              containerStyle={{ paddingVertical: 8 }}
              textStyle={CommonStyle.textGRegular}
            />
          )}
        />

        {
          selected == 8
          ?
          <>
            <Input
              label='Enter cancel reason'
              value={otherReason}
              onChange={(text) => setOtherReason(text)}
            />
          </>
          :
          <></>
        }

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 20,
          }}
        >
          <Button
            title="Cancel"
            onPress={() => onCancel()}
            buttonStyle={{
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: Colors.primary,
              width: '48%',
            }}
            textStyle={{
              fontSize: Fontsize.semilarge,
              color: Colors.primary,
            }}
          />
          <Button
            title="Don’t Cancel"
            onPress={() => setCancelVisible(false)}
            buttonStyle={{ width: '48%' }}
            textStyle={{ fontSize: Fontsize.semilarge }}
          />
        </View>
      </View>
    </UseModal>
  );
};

export default CancelReasonModal;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 5,
      paddingHorizontal: 5,
    },
  });
