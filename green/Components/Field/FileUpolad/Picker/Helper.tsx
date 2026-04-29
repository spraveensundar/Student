import { pick, types } from "@react-native-documents/picker";

export const acceptFile = ["doc", "docx", "xls", "xlsx", "pps", "ppt", "pptx", "pdf", "rtf", "txt"];

export const acceptImage = ["jpg", "jpeg", "png", "heic"];


type UploadFileType = {
    uri: string;
    fileName?: string;
};


type ImagePickParams = {
    response?: any;
    refRBSheet?: any;
    uploadFile?: (file: UploadFileType) => void;
};



export const mediaConfiguration = {
    uploadSettings: {
        mediaType: 'photo',
        includeBase64: true
    },
    cropSettings: {
        width: 216,
        height: 216,
        cropping: true,
        multiple: false,
        cropperCircleOverlay: true,
        mediaType: 'photo',
        cropperToolbarTitle: 'Move and Scale',
        forceJpg: true,
        includeBase64: true,
        cropRect: {
            width: 216,
            height: 216
        }
    },
    documentType: [
        types.plainText,
        types.pdf,
        types.ppt,
        types.pptx,
        types.xls,
        types.xlsx,
        types.doc,
        types.docx
    ]
}


export const sorceData = [
    // {
    //     "family": "Feather",
    //     "name": "file",
    //     "label": "document",
    //     "text": "File"
    // },
    {
        "family": "Feather",
        "name": "camera",
        "label": "camera",
        "text": "Camera"
    }, {
        "family": "Entypo",
        "name": "images",
        "label": "gallery",
        "text": "Gallery"
    }
];


export const imagePick = ({
    response,
    refRBSheet,
    uploadFile = () => { },
}: ImagePickParams) => {
    if (response.didCancel) {
        console.log('User cancelled image picker');
    } else if (response.errorCode || response.errorMessage) {
        console.log('Error in uploading the picture', response.errorMessage || response.errorCode);
    } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
    } else if (response.assets && response.assets.length > 0) {
        const pickedImage = response.assets[0];
        const fileName = pickedImage.fileName || pickedImage.uri?.split('/').pop() || 'unknown';
        uploadFile({ uri: pickedImage.uri!, fileName });
    }
};


export function shortenFileName(fileName: string, maxLength = 10) {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) return fileName; // no extension

    const name = fileName.substring(0, lastDotIndex); // before extension
    const extension = fileName.substring(lastDotIndex); // .jpg, .png, etc.

    // Shorten the name without adding extra dots
    const shortName = name.length > maxLength
        ? name.substring(0, maxLength) // no extra dot
        : name;

    return shortName + extension;
}
