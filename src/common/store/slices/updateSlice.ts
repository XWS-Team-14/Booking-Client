import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '../store';

export interface UpdateState {
  reviewUpdate: boolean | null;
  reservationHistoryUpdate: boolean | null;
}

const initialState: UpdateState = {
  reviewUpdate: true,
  reservationHistoryUpdate: true,
};

export const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    setReviewUpdate(state, action) {
      state.reviewUpdate = action.payload;
    },
    setReservationHistoryUpdate(state, action) {
      console.log('dsjfk', action.payload);
      state.reservationHistoryUpdate = action.payload;
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

export const { setReviewUpdate, setReservationHistoryUpdate } =
  updateSlice.actions;

export const selectReviewUpdateState = (state: AppState) =>
  state.update.reviewUpdate;

export const selectReservationHistoryUpdateState = (state: AppState) =>
  state.update.reservationHistoryUpdate;
