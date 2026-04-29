export const validator = (data: any) => {
    try {
        const fields = Object.keys(data) ?? [];
        let invalidCount = 0;
        if (fields.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const validationResult = fields.map((field) => {
                let validatedField = getValidate(data[field], data);
                data[field] = validatedField;
                !validatedField.isValid && invalidCount++;
                return data[field];
            });
            return { data: data, isValid: invalidCount === 0 };
        } else {
            return { data: {}, isValid: true };
        }
    } catch (error: any) {
        console.log('VALIDATOR-ERROR', error);
    }
};

export const getValidate = (data: any, bigData?: any) => {
    try {
        let rules = Object.keys(data?.rules ?? {});
        if (rules.length > 0) {
            let isValid = true;
            let index = 0;
            do {
                switch (rules[index]) {
                    case 'required':
                        data.isValid = !isEmpty(data.value);
                        break;
                    case 'email':
                        data.isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.value) || isEmpty(data.value);
                        break;
                    case 'password':
                        data.isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(data.value) || isEmpty(data.value);
                        break;
                    case 'number':
                        data.isValid =
                            typeof data.value === 'number' || (!isNaN(Number(data.value)) && /^\d+$/.test(data.value)) || isEmpty(data.value);
                        break;
                    case 'alpha':
                        data.isValid =
                            (typeof data.value === 'string' && /^[A-Za-z\s]*$/.test(data.value)) || isEmpty(data.value);
                        break;
                    case 'url':
                        data.isValid = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(data.value) || isEmpty(data.value);
                        break;
                    case 'time':
                    case 'date':
                        data.isValid = (data.value instanceof Date && !isNaN(data.value)) || isEmpty(data.value);
                        break;
                    case 'equalTo':
                        data.isValid =
                            bigData[data.rules[rules[index]]] &&
                            bigData[data.rules[rules[index]]].value === data.value;
                        break;
                    case 'minLength':
                        data.isValid = data.value.length >= data.rules[rules[index]];
                        break;
                    case 'maxLength':
                        data.isValid = data.value.length <= data.rules[rules[index]];
                        break;
                    case 'fileSize':
                        data.isValid = Number(data.value.size) <= data.rules[rules[index]];
                        break;
                    case 'fileType':
                        data.isValid = (data?.rules[rules[index]] ?? []).length > 0 ? data?.rules[rules[index]].includes((data?.value?.type ?? data?.value?.mime ?? '').split('/')[1]) : true;
                        break;
                    default:
                        break;
                }
                isValid = data.isValid;
                data.errorMessage = isValid ? '' : data.messages[rules[index]];
                index++;
            } while (isValid && rules.length > index);
            return data;
        } else {
            return { ...data, isValid: true };
        }
    } catch (error: any) {
        console.log('GET-VALIDATOR-ERROR', error);
    }
};

export const isEmpty = (value: any) =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) && !(value instanceof Date) ||
    (typeof value === 'string' && value === '0') ||
    (typeof value === 'number' && value === 0) ||
    (typeof value === 'string' && value.trim().length === 0);

export const ObjectIsempty = (Obj: object) => {
    try {
        let objectArr = Object.values(Obj);
        for (let i = 0; i < objectArr.length; i++) {
            let emptyKey = [];
            if (!isEmpty(objectArr[i])) {
                return false;
            } else {
                emptyKey.push(i);
                if (emptyKey.length - 1 === objectArr.length - 1) {
                    return true;
                }
            }
        }
        return true;
    } catch (err) {
        console.log(err, 'ObjectIsempty_err');
    }
};