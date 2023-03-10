import {
  createSelector,
  createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { MenuItem } from '@repo/common';
import { defaultSiteMenu } from './common';
import { svgIconsMap } from '@repo/icons';

export const SETTINGS_FEATURE_KEY = 'settings';

export interface SettingsState {
  appLoading: boolean;
  siteMenu: MenuItem[];
}

export const initialSettingsState: SettingsState = {
  appLoading: true,
  siteMenu: defaultSiteMenu,
};

export const settingsSlice = createSlice({
  name: SETTINGS_FEATURE_KEY,
  initialState: initialSettingsState,
  reducers: {
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload;
    },
    addHeaderMenuItem: (state) => {
      if (state.siteMenu.length < 20) {
        const arrayPos = state.siteMenu.length - defaultSiteMenu.length + 1;
        const additionalMenuItem: MenuItem = {
          name: `Additional menu item ${arrayPos}`,
          link: '#',
          icon: svgIconsMap.Buttons,
        };
        state.siteMenu = [...state.siteMenu, additionalMenuItem];
      }
    },
    removeHeaderMenuItem: (state) => {
      if (state.siteMenu.length > defaultSiteMenu.length) {
        state.siteMenu = state.siteMenu.slice(0, -1);
      }
    },
  },
});

export const settingsReducer = settingsSlice.reducer;

export const {
  setAppLoading,
  addHeaderMenuItem,
  removeHeaderMenuItem,
} = settingsSlice.actions;

// @ts-ignore
export const getSettingsState = (rootState: unknown): SettingsState => rootState[SETTINGS_FEATURE_KEY];

export const selectAppLoadingState = createSelector(
  getSettingsState,
  (state) => state.appLoading,
);

export const selectAppMenu = createSelector(
  getSettingsState,
  (state) => state.siteMenu,
);
