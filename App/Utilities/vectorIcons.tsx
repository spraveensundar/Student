import React, { useContext } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ColorValue, ViewStyle } from 'react-native';

import ThemeContext from './themecontext';

type IconFamily =
  | 'AntDesign'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome6'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Entypo'
  | 'Feather'
  | 'Fontisto'
  | 'MaterialDesignIcons'
  | 'Lucide';

export interface VectorIconsProps {
  family: IconFamily;
  name: string | any;
  size?: number;
  iconcolor?: ColorValue;
  style?: ViewStyle;
}

const VectorIcons: React.FC<VectorIconsProps> = ({
  family,
  name,
  size = 24,
  iconcolor,
  style,
}) => {
  const theme = useContext(ThemeContext);
  const color = iconcolor || theme.primarytext;
  switch (family) {
    case 'AntDesign':
      return <AntDesign name={name} size={size} color={color} style={style} />;
    case 'FontAwesome':
      return (
        <FontAwesome name={name} size={size} color={color} style={style} />
      );
    case 'FontAwesome5':
      return (
        <FontAwesome5 name={name} size={size} color={color} style={style} />
      );
    case 'Ionicons':
      return <Ionicons name={name} size={size} color={color} style={style} />;

    case 'MaterialIcons':
      return (
        <MaterialIcons name={name} size={size} color={color} style={style} />
      );
    case 'Octicons':
      return <Octicons name={name} size={size} color={color} style={style} />;
    case 'SimpleLineIcons':
      return (
        <SimpleLineIcons name={name} size={size} color={color} style={style} />
      );
    case 'Entypo':
      return <Entypo name={name} size={size} color={color} style={style} />;
    case 'Feather':
      return <Feather name={name} size={size} color={color} style={style} />;
    case 'FontAwesome6':
      return (
        <FontAwesome6 name={name} size={size} color={color} style={style} />
      );
    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcons
          name={name}
          size={size}
          color={color}
          style={style}
        />
      );
    default:
      return null;
  }
};

export default VectorIcons;
