import { BACKEND_URL, SECRET_KEY, GOOGLE_API_KEY } from '@env';
console.log(BACKEND_URL,"BACKEND_URLBACKEND_URLBACKEND_URL");

const config = {
    BACKEND_URL: BACKEND_URL,
    USERBACKEND_URL: `${BACKEND_URL}/v1/user`,
    SECRET_KEY: SECRET_KEY,
    GOOGLE_API_KEY: GOOGLE_API_KEY,
    ORIGINAL_FILE_URL: `${BACKEND_URL}/original`,
    COMPRESSED_FILE_URL: `${BACKEND_URL}/compressed`,
    EMAIL_REGEX: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    VEHICLE_NUMBER_REGEX: /^(?:[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}|BH\d{2}[A-Z]{2}\d{4})$/, 
};

export default config;
