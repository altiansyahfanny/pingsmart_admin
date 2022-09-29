import { toast as alert } from 'react-toastify';

export const successToast = (msg) => alert.success(msg);
export const errorToast = (msg) => alert.error(msg);
export const infoToast = (msg) => alert.info(`${msg ?? 'Something went wrong'}`);
export const warningToast = (msg) => alert.warning(msg);
