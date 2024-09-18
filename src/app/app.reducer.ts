import { ActionReducerMap } from '@ngrx/store';
import * as ui from '../utils/reducer/ui.reducer';
import * as auth from '../utils/reducer/auth.reducer';


export interface AppState {
   ui: ui.State,
   user: auth.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer
}