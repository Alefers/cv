import { checkWebpSupport } from '@cv/helpers';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cvReducers } from '../../libs/common/src/lib/store';
import { Provider } from 'react-redux';
import AppRouter from './router/app-router';


checkWebpSupport();

const store = configureStore({
  reducer: combineReducers(cvReducers),
})

export function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
