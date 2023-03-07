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
      title: '',
      settings: {
        stroke: '#9d32ea',
        gradientStart: '#027B48',
        gradientStop: '#007972',
      }
    },
    {
      id: 2,
      title: '',
      settings: {
        stroke: '#96072d',
        gradientStart: '#0330c0',
        gradientStop: '#098c85',
      }
    },
    {
      id: 3,
      title: '',
      settings: {
        stroke: '#2bd409',
        gradientStart: '#9e340e',
        gradientStop: '#8c11dd',
      }
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
