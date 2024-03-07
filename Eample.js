import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';
import store from './src/redux/Store';
import App from './App'
import { PersistGate } from 'redux-persist/integration/react';
import createStoreAndPersistor from './src/redux/Store';

export default function Eample() {

  // store.subscribe(() => {
  //   console.log(store.getState());
  // })
const { store, persistor } = createStoreAndPersistor()

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  )
}