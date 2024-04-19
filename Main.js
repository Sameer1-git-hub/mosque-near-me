import React from 'react'
import { Provider } from 'react-redux';
import App from './App'
import { PersistGate } from 'redux-persist/integration/react';
import createStoreAndPersistor from './src/redux/Store';

export default function Main() {

  const { store, persistor } = createStoreAndPersistor()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}