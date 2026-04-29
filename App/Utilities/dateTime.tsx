import { isEmpty } from 'lodash';
import moment from 'moment';

export const getDateTimeFormat = (dateObject: any, type?: string, format?: string) => {
    const date = dateObject ?? new Date();
    if (!format) {
        switch (type) {
            case 'date':
                format = 'DD-MM-YYYY';
                break;
            case 'datetime':
                format = 'DD-MM-YYYY hh:mm a';
                break;
            case 'time':
                format = 'hh:mm a';
                break;
            default:
                break;
        }
    }
    const formattedDate = format ? moment(date).format(format) : '';
    return formattedDate;
};


export const momentFormat = (dateTime: any, format = 'DD-MM-YYYY HH:mm:ss') => {
    try {
        if (!isEmpty(dateTime)) {
            let newDateTime = new Date(dateTime);
            return moment(newDateTime).format(format)
        }
        return ''
    } catch (err) {
        console.log(err, 'momentFormat__err')
        return ''
    }
}