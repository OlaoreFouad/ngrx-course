import { User } from "./../model/user.model";
import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "../action-types";

export const authFeatureKey = "auth";

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: undefined,
};

export const authReducers = createReducer(
  initialState,
  on(AuthActions.login, (state, action) => {
    return { ...state, user: action.user };
  })
);
