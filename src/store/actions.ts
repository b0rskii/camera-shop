import { createAction } from '@reduxjs/toolkit';
import { NameSpace } from '../const';

export const redirectToRoute = createAction<string>(`${NameSpace.App}/redirect`);
