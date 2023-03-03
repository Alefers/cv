import { checkWebpSupport } from '@repo/helpers';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import AppRouter from './router/app-router';
import { cvReducers } from '@repo/common';


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
