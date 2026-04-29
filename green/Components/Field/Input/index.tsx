import React from 'react';

import Input from './Input';
import Search from './Search';
import { FieldInputProps } from '../inputType';
import Checkbox from './Checkbox';
import NumberInput from './NumberInput';

const FieldInput: React.FC<FieldInputProps> = (props) => {
    const { type, ...otherProps } = props;

    if (type === 'search') {
        return <Search type={type}  {...otherProps} />;
    }

    if (type == "checkbox") {
        return <Checkbox type={type}  {...otherProps} />;
    }
    if (type == "calculator") {
        return <NumberInput type={type}  {...otherProps} />;
    }

    return <Input type={type}  {...otherProps} />;
};

export default FieldInput;