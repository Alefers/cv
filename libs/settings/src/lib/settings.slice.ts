import {
  createSelector,
  createSlice, PayloadAction,
} from '@reduxjs/toolkit';

export const SETTINGS_FEATURE_KEY = 'settings';

export interface SettingsState {
  appLoading: boolean;
}

export const initialSettingsState: SettingsState = {
  appLoading: true,
};

export const settingsSlice = createSlice({
  name: SETTINGS_FEATURE_KEY,
  initialState: initialSettingsState,
  reducers: {
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload;
    }
  },
});

export const settingsReducer = settingsSlice.reducer;

export const {
  setAppLoading,
} = settingsSlice.actions;

export const getSettingsState = (rootState: unknown): SettingsState => rootState[SETTINGS_FEATURE_KEY];

export const selectAppLoadingState = createSelector(
  getSettingsState,
  (state) => state.appLoading,
);
