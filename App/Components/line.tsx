import { StyleProp, View, ViewStyle } from 'react-native';

interface Lineprops {
  width?: any;
  height?: any;
  conatainerstyle?: StyleProp<ViewStyle>;
  top?: any;
}
const Line: React.FC<Lineprops> = ({
  width = '100%',
  height = 1.25,
  conatainerstyle,
  top = 0,
}) => {
  return (
    <View
      style={[
        {
          width: width,
          height: height,
          backgroundColor: '#CFCFCF',
          marginTop: top,
        },
        conatainerstyle,
      ]}
    />
  );
};

export default Line;
