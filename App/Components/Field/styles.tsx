import { StyleSheet } from 'react-native';
import { Colors } from '../../Utilities/uiasset';
import { windowheight } from '../../Utilities/dimensions';

export const styles = (theme: any) =>
  StyleSheet.create({
    lightInput: {
      backgroundColor: '#F5F5F5',
      borderRadius: 10,
      paddingHorizontal: '5%',
      width: '100%',
      justifyContent: 'center',
      position: 'relative',
      shadowColor: 'rgba(0,0,0,0.25)',
      shadowOffset: { width: 0, height: 0.5 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 3,
    },
    right: {
      position: 'absolute',
      right: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: '100%',
      backgroundColor: theme.green1,
      paddingHorizontal: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      height: windowheight * 0.05,
    },
    disabledButton: {
      backgroundColor: '#ccc',
    },
    check: {
      backgroundColor: theme.card,
      width: 20,
      height: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
  });
