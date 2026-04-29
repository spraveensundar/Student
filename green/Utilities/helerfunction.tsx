
import { Alert, Linking } from 'react-native';
import Toast from 'react-native-simple-toast'
import { image } from './images';
import { isEmpty } from 'lodash';

// export const CustomToast = (props: ToastConfigParams<any>): JSX.Element => {
//   const appTheme = (getItem('appTheme') ?? 'light') as ThemeKeyType;
//   const theme = themes[appTheme];

//   const { text1, props: custom } = props;

//   return (
//     <View
//       style={[
//         {
//           width: '100%',
//           backgroundColor: theme.basicthemecolor,
//         },
//         custom?.toastContainerStyle,
//       ]}
//     >
//       <Text
//         style={[
//           {
//             position: 'relative',
//             width: '100%',
//             fontFamily: Fontfamily.ArchivoNarrow.medium,
//             fontSize: Fontsize.semimedium,
//             color: theme.primarytext,
//             textAlign: 'center',
//             lineHeight: 25,
//             zIndex: 5000,
//           },
//           custom?.toastMessageStyle,
//         ]}
//       >
//         {text1}
//       </Text>
//     </View>
//   );
// };


export const Toastfn = (value: any) => {
    Toast.show(value, Toast.SHORT)
}

export const getQueryParamString = (params: any) => {
    const keys = Object.keys(params);
    return keys.length > 0 ? '?' + keys.map((_) => _ + '=' + params[_]).join('&') : '';
};

export const obfuscateEmailShort = (email: string): string => {
    if (!email) return '';

    const parts = email.split('@');
    if (parts.length !== 2) return '';

    const [name, domain] = parts;
    const tld = domain.split('.').pop() ?? '';
    const namePart = name.slice(0, 3);

    return `${namePart}xxxxx${tld}`;
};



export function shortenText(id: any) {
    if (id.length <= 10) return id;
    return `${id.slice(0, 5)}...${id.slice(-6)}`;
}


export const getMimeType = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'gif':
            return 'image/gif';
        case 'heic':
            return 'image/heic';
        default:
            return 'application/octet-stream'; // fallback
    }
};


export const formatToReadableDate = (isoString: string): string => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toDateString(); // e.g. "Mon Jul 28 2025"
};

export const maskPhoneNumber = (phoneNumber: any) => {
    if (!phoneNumber) return '';
    const last2 = phoneNumber.slice(-2);
    const masked = 'x'.repeat(phoneNumber.length - 2) + last2;
    return masked;
};


export const openLink = async (url?: string) => {
    if (!url) {
        Alert.alert("No link available");
        return;
    }

    // Ensure it has a scheme
    let fullUrl = url.trim();
    if (!/^https?:\/\//i.test(fullUrl)) {
        fullUrl = `https://${fullUrl}`;
    }

    try {
        const supported = await Linking.canOpenURL(fullUrl);
        if (supported) {
            await Linking.openURL(fullUrl);
        } else {
            Alert.alert("Cannot open this link", fullUrl);
        }
    } catch (err) {
        Alert.alert("Failed to open link", fullUrl);
    }
};



export const getItemColor = (type: any) => {
    if (type === 'Total Users') {
        return "#4A6FCD";
    }
    if (type === 'Total Clicked users') {
        return "#36A04D";
    }
    if (type === 'Active Users') {
        return "#8450E7";
    }
    if (type === 'Volume') {
        return "#BE6321";
    }
    if (type === 'Total Commission') {
        return "#6265FF";
    }
    if (type === 'KYC Completed Users') {
        return "#318186";
    }
    return "#224C82";
}


export function getTimeLeft(targetTime: any) {
    const now = Date.now();
    const difference = targetTime - now;

    if (difference <= 0) {
        return {
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00',
        };
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
    };
}


export const formatDateTime = (dateString: any) => {
    if (!dateString) return "Unknown time";
    try {
        const date = new Date(dateString);
        return date.toLocaleString("en-IN", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    } catch (e) {
        return "Invalid date";
    }
};


export const getTokenImage = (type: any) => {
    if (type === 'BNBUSDT') {
        return image.Btcicon;
    }
    if (type === 'ETHUSDT') {
        return image.ETHICon;
    }
    return image.Btcicon;
}

export function formatToTimeOnly(isoString: any) {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour12: false });
}


export const truncateString = (str: string, startChars = 5, endChars = 6) => {
    if (str?.length <= startChars + endChars) return str;
    return `${str?.slice(0, startChars)}...${str?.slice(-endChars)}`;
}

export const getOrderTypeLabel = (type: any) => {
    switch (type) {
        case 'makerOnly':
            return 'Maker Only';
        case 'stop_limit':
            return 'Stop Limit';
        case 'stop_market':
            return 'Stop Market';
        case 'trailingStop':
            return 'Trailing Stop';
        case 'take_profit_limit':
            return 'Take Profit Limit';
        case 'take_profit':
            return 'Take Profit Market';
        case 'makeronly':
            return 'Maker Only';
        default:
            return 'Stop Limit';
    }
};


export const toCutOff = (value: any = 0, decimal: any = 6) => {
    try {
        if (!isEmpty(value)) {
            value = value.toString()
            if (value.split('.')[1]?.length <= decimal) {
                return value
            } else {
                value = parseFloat(value)
                decimal = parseFloat(decimal)
                const factor = Math.pow(10, decimal);
                const result = Math.floor(value * factor) / factor;
                if (result == 0) {
                    return Number(result).toPrecision(decimal + 1)
                }
                return result
            }
        }
        return 0
    } catch (err) {
        console.log(err, 'CutOf__err')
        return value
    }
}

export function cleanInput(value: any, removeEmoji = true): string {
    if (value === null || value === undefined) return '';
    let str = value.toString();
    // optionally remove emoji here
    if (removeEmoji) {
        // removeEmoji logic if needed
    }
    return str;
}


export const formatValue = (value: any, decimals = 2) => {
    const num = parseFloat(value);
    if (isNaN(num)) return 0;
    const threshold = 1 / Math.pow(10, decimals);

    if (num > 0 && num < threshold) {
        return `<${threshold.toFixed(decimals)}`;
    }

    return num.toFixed(decimals);
};
