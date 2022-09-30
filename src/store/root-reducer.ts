import { combineReducers } from '@reduxjs/toolkit';
import { dataProcess } from './data-process/data-process';
import { appProcess } from './app-process/app-process';
import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.App]: appProcess.reducer,
});
