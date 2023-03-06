import { SETTINGS_FEATURE_KEY, settingsReducer } from '@repo/settings';
import { PROMOTIONS_FEATURE_KEY, promotionsReducer } from '@repo/promotions';

export const cvReducers = {
  [SETTINGS_FEATURE_KEY]: settingsReducer,
  [PROMOTIONS_FEATURE_KEY]: promotionsReducer,
};
