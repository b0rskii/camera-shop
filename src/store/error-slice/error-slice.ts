import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorState } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: ErrorState = {
  error: null,
};

const errorSlice = createSlice({
  name: NameSpace.Error,
  initialState,
  reducers: {
    errorUpdate: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { errorUpdate } = errorSlice.actions;

export default errorSlice.reducer;
