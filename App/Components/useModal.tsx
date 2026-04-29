import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { windowheight, windowwidth } from '../Utilities/dimensions';

interface UseModalProps {
  visible: boolean;
  setVisible: ((v: boolean) => void);
  containerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const UseModal: React.FC<UseModalProps> = ({
  visible,
  setVisible,
  children,
  containerStyle,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.overlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setVisible(false)}
        />
        <View style={[styles.modalBox, containerStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

export default UseModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    height: windowheight * 0.58,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: windowwidth * 0.05,
  },
});
