import React, { useContext } from 'react';
import { Pressable } from 'react-native';

import Text from '../../../text';
import { Colors } from '../../../../Utilities/uiasset';
import VectorIcons from '../../../../Utilities/vectoricons';
import ThemeContext from '../../../../Utilities/themecontext';
import { windowwidth } from '../../../../Utilities/dimensions';

type ItemType = {
  name?: string;
  family?: any;
  label: 'camera' | 'gallery' | 'document' | string;
  text?: any


};

type ItemProps = {
  item: ItemType;
  pickableSource?: (source: 'camera' | 'gallery' | 'document' | string) => void;
  theme?: any
};

const Item: React.FC<ItemProps> = ({ item, pickableSource = () => { }, theme }) => {

  return (
    <Pressable onPress={() => pickableSource(item.label)} style={{ alignItems: "center", marginRight: "10%" }} >
      <VectorIcons
        family={item.family}
        name={item.name}
        iconcolor={theme.darktext}
        size={windowwidth * 0.065}
      />
      <Text style={{ color: Colors.grey, textAlign: "center", marginTop: "5%" }}>{item.text}</Text>
    </Pressable>
  );
};

export default Item;
