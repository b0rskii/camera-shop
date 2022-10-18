import { State } from '../../types/state';

export const getError = (state: State): string | null => state.Error.error;
