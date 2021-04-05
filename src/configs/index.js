export const GET_METHOD = 'GET';
export const POST_METHOD = 'POST';

export const ERROR_CODE_UNKNOWN = 1514;
export const ERROR_CODE_BAD_CONNECTION = 1515;
export const ERROR_CODE_404_NOT_FOUND = 404;

export const REQUEST_TIMEOUT = 20000;

const PROD_ROOT = '';
const DEV_ROOT = ''; // to add url

export const BASE_URL = __DEV__ ? DEV_ROOT : PROD_ROOT;
