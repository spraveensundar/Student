import moment from 'moment';

export function cleanInput(value: any, removeEmoji = true): string {
    if (value === null || value === undefined) return '';
    let str = value.toString();
    // optionally remove emoji here
    if (removeEmoji) {
        // removeEmoji logic if needed
    }
    return str;
}

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

export const timeAgo = (dateString: any) => {
    const now: any = new Date();
    const past: any = new Date(dateString);

    const diffInSeconds = Math.floor((now - past) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (diffInSeconds < 60) return `${diffInSeconds == 0 ? "few" : diffInSeconds} secs ago`;
    if (minutes < 60) return `${minutes} mins ago`;
    if (hours < 24) return `${hours} hrs ago`;
    return `${days} days ago`;
};

export const formatDateTime = (isoString: any) => {
    const date = new Date(isoString);

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};