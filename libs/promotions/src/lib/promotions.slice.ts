import {
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Promotion } from './common';

export const PROMOTIONS_FEATURE_KEY = 'promotions';

export interface PromotionsState {
  promotions: Promotion[];
}

export const initialSettingsState: PromotionsState = {
  promotions: [
    {
      id: 1,
      title: 'ttt',
    },
    {
      id: 2,
      title: 'ttt',
    },
    {
      id: 3,
      title: 'ttt',
    },
  ],
};

export const promotionsSlice = createSlice({
  name: PROMOTIONS_FEATURE_KEY,
  initialState: initialSettingsState,
  reducers: {
    getPromotions: (state, action: PayloadAction) => {
      state.promotions = [];
    }
  },
});

export const promotionsReducer = promotionsSlice.reducer;

export const {
  getPromotions,
} = promotionsSlice.actions;

// @ts-ignore
export const getPromotionsState = (rootState: unknown): PromotionsState => rootState[PROMOTIONS_FEATURE_KEY];

export const selectPromotions = createSelector(
  getPromotionsState,
  (state) => state.promotions,
);
