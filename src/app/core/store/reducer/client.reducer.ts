import { StatusClientRegister, StatusRegister } from '@models';
import { createReducer, on } from '@ngrx/store';
import { DataWelcome } from '@store';

const initialState: StatusClientRegister = {
  welcome: undefined,
};

export const clientReducer = createReducer(
  initialState,
  on(DataWelcome, (state, { data }) => ({ ...state, welcome: data }))
);
