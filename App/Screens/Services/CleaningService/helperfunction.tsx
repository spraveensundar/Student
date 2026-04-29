export function cleanInput(value: any, removeEmoji = true): string {
    if (value === null || value === undefined) return '';
    let str = value.toString();
    // optionally remove emoji here
    if (removeEmoji) {
        // removeEmoji logic if needed
    }
    return str;
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