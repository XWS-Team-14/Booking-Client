import { User } from '@/common/types/User';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '../store';

export interface AuthState {
  authState: boolean | null;
  userFirstName: string | null;
  userLastName: string | null;
  userId: string | null;
  userEmail: string | null;
  userRole: 'host' | 'guest' | null;
  userGender: 'male' | 'female' | null;
  userHomeAddress: string | null;
}

const initialState: AuthState = {
  authState: null,
  userId: null,
  userFirstName: null,
  userLastName: null,
  userEmail: null,
  userRole: null,
  userGender: null,
  userHomeAddress: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
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
    setUserRole(state, action) {
      state.userRole = action.payload;
    },
    setUserGender(state, action) {
      state.userGender = action.payload;
    },
    setUserHomeAddress(state, action) {
      state.userHomeAddress = action.payload;
    },
    reset(state, action?) {
      state.authState = null;
      state.userId = null;
      state.userFirstName = null;
      state.userLastName = null;
      state.userEmail = null;
      state.userRole = null;
      state.userGender = null;
      state.userHomeAddress = null;
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
  setUserId,
  setUserFirstName,
  setUserLastName,
  setUserEmail,
  setUserRole,
  setUserGender,
  setUserHomeAddress,
  reset,
} = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;

export const selectId = (state: AppState) => state.auth.userId;

export const selectUser = (state: AppState) => {
  return {
    id: state.auth.userId,
    firstName: state.auth.userFirstName,
    lastName: state.auth.userLastName,
    email: state.auth.userEmail,
    gender: state.auth.userGender,
    role: state.auth.userRole,
    address: state.auth.userHomeAddress,
  } as User;
};

export const selectFirstName = (state: AppState) => state.auth.userFirstName;

export const selectLastName = (state: AppState) => state.auth.userLastName;

export const selectEmail = (state: AppState) => state.auth.userEmail;

export const selectRole = (state: AppState) => state.auth.userRole;

export const selectGender = (state: AppState) => state.auth.userGender;

export const selectHomeAddress = (state: AppState) =>
  state.auth.userHomeAddress;

export default authSlice.reducer;
