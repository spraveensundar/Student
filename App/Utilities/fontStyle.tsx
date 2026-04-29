import { StyleSheet } from 'react-native';
import { RFvalue } from './dimensions';
import { Fontfamily, Fontsize } from './uiasset';
import { fonts } from 'react-native-elements/dist/config';

// Define your theme type (customize based on your theme object)

const CommonStyles = (theme: any) =>
  StyleSheet.create({
    textHBold: {
      fontSize: Fontsize.semilarge,
      fontFamily: Fontfamily.bold,
      color: theme.themeInverse,
    },
    textHLight: {
      fontSize: Fontsize.semilarge,
      fontFamily: Fontfamily.light,
      color: theme.themeInverse,
    },
    textHMedium: {
      fontSize: Fontsize.semilarge,
      fontFamily: Fontfamily.medium,
      color: theme.themeInverse,
    },
    textGLight: {
      color: theme.primarytext,
      fontSize: Fontsize.semilarge,
      fontFamily: Fontfamily.GLight,
    },
    textGMedium: {
      color: theme.primarytext,
      fontSize: Fontsize.semilarge,
      fontFamily: Fontfamily.GMedium,
    },
    textGRegular: {
      color: theme.primarytext,
      fontSize: Fontsize.semilarge,
      fontFamily: Fontfamily.GRegular,
    },
    textGBold: {
      color: theme.primarytext,
      fontSize: Fontsize.semilarge,
      fontFamily: Fontfamily.GBold,
    },
    textBlack: {
      color: theme.primarytext,
      fontSize: Fontsize.semilarge,
      fontFamily: Fontfamily.GBlack,
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default CommonStyles;
