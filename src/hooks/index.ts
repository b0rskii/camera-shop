import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, State } from '../types/state';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
