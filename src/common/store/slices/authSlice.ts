import { User } from '@/common/types/User';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '../store';

export interface AuthState {
  authState: boolean;
  userFirstName: string | null;
  userLastName: string | null;
  userEmail: string | null;
  userIsAdmin: boolean;
}

const initialState: AuthState = {
  authState: false,
  userFirstName: null,
  userLastName: null,
  userEmail: null,
  userIsAdmin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setUserFirstName(state, action) {
      state.userFirstName = action.payload;
    },
    setUserLastName(state, action) {
      state.userLastName = action.payload;
    },
    setUserEmail(state, action) {
      state.userEmail = action.payload;
    },
    setUserIsAdmin(state, action) {
      state.userIsAdmin = action.payload;
    },
    reset(state, action?) {
      state.authState = false;
      state.userFirstName = null;
      state.userLastName = null;
      state.userEmail = null;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const {
  setAuthState,
  setUserFirstName,
  setUserLastName,
  setUserEmail,
  setUserIsAdmin,
  reset,
} = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;

export const selectUser = (state: AppState) => {
  return {
    firstName: state.auth.userFirstName,
    lastName: state.auth.userLastName,
    email: state.auth.userEmail,
    isAdmin: state.auth.userIsAdmin,
  } as User;
};

export const selectFirstName = (state: AppState) => state.auth.userFirstName;

export const selectLastName = (state: AppState) => state.auth.userLastName;

export const selectEmail = (state: AppState) => state.auth.userEmail;

export const selectIsAdmin = (state: AppState) => state.auth.userIsAdmin;

export default authSlice.reducer;
