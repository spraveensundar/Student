import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginVertical: 20,
      backgroundColor: theme.card,
      gap: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
    },
    ordrDtls: {
      gap: 20,
      paddingVertical: 20,
      borderRadius: 20,
    },
    watchBtn: {
      backgroundColor: '#252525',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
    },
    viewBtn: {
      borderWidth: 1,
      borderColor: '#323232',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
    },
    card: {
      borderWidth: 1,
      borderColor: '#CFCFCF',
      borderRadius: 10,
      flexDirection: 'column',
      padding: 20,
      backgroundColor: theme.card,
      gap: 5,
    },
    log: {
      width: '20%',
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    arrowDown: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: '2.5%',
    },
    detail: {
      borderWidth: 1,
      borderColor: '#CFCFCF',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      gap: 10,
    },
    stsBtn: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
    },
    reseduleBtn: {
      backgroundColor: '#1551351A',
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 5,
      borderWidth: 0.2,
      borderColor: theme.green1,
    },
    review: {
      paddingVertical: 20,
    },
    circle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#2ecc71',
      justifyContent: 'center',
      alignItems: 'center',
    },
    line: {
      width: 2,
      height: 43,
      backgroundColor: '#ccc',
      marginVertical: 2,
    },
  });

export default styles;
