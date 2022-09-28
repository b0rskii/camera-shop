import { combineReducers } from '@reduxjs/toolkit';
import { dataProcess } from './data-process/data-process';
import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
});
