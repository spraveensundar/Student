import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import CommonStyles from '../../../Utilities/fontStyle';
import UseModal from '../../../Components/useModal';
import { windowheight } from '../../../Utilities/dimensions';
import { Button } from '../../../Components/Field';
import { Fontsize } from '../../../Utilities/uiasset';

export interface ConfirmCancelModalProps {
  confirmVisible: boolean;
  setConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>;
  confirmCancel: () => void;
  cancelReason: string;
}

const ConfirmCancelModal: React.FC<ConfirmCancelModalProps> = ({
  confirmVisible,
  setConfirmVisible,
  confirmCancel,
  cancelReason,
}) => {
  const { theme, navigation } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);
  const style = styles(theme);

  return (
    <UseModal
      visible={confirmVisible}
      setVisible={setConfirmVisible}
      containerStyle={{ height: windowheight * 0.25, paddingBottom: 15 }}
    >
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <Text style={[CommonStyle.textGMedium, { marginBottom: 10 }]}>
            Cancel Reason
          </Text>
          <Text
            style={[
              CommonStyle.textGRegular,
              {
                marginBottom: 10,
                fontSize: Fontsize.xxmedium,
                lineHeight: Fontsize.large,
              },
            ]}
          >
            {
              cancelReason
                ?
                cancelReason
                :
                "It seems you want to change your drop location."
            }
          </Text>
        </View>

        <Button
          title="Done"
          onPress={confirmCancel}
          //   buttonStyle={{ width: '48%' }}
          textStyle={{ fontSize: Fontsize.semilarge }}
        />
      </View>
    </UseModal>
  );
};

export default ConfirmCancelModal;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 5,
      paddingHorizontal: 5,
    },
  });
