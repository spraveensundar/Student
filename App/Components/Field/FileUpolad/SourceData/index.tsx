import React from 'react';
import { View } from 'react-native';

import Item from './Item';
import { sorceData } from '../Picker/Helper';

type SourceDataProps = {
    pickableSource?: (source: 'camera' | 'gallery' | 'document' | string) => void;
    theme?: any
};

const SourceData: React.FC<SourceDataProps> = ({ pickableSource = () => { }, theme }) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            {sorceData.map((item) => (
                <Item
                    key={`Fileupload_${item.label}`}
                    item={item}
                    pickableSource={pickableSource}
                    theme={theme}
                />
            ))}
        </View>
    );
};

export default SourceData;