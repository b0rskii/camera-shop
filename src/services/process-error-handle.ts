import { store } from '../store/store';
import { errorUpdate } from '../store/error-slice/error-slice';

const ERROR_MESSAGE_TIMEOUT = 5000;

export const processErrorHandle = (message: string) => {
  store.dispatch(errorUpdate(message));
  setTimeout(() => store.dispatch(errorUpdate(null)), ERROR_MESSAGE_TIMEOUT);
};
