import { store } from '../store/store';
import { setError } from '../store/data-process/data-process';

const ERROR_MESSAGE_TIMEOUT = 5000;

export const processErrorHandle = (message: string) => {
  store.dispatch(setError(message));
  setTimeout(() => store.dispatch(setError(null)), ERROR_MESSAGE_TIMEOUT);
};
