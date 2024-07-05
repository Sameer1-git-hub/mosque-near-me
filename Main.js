import React from 'react'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App'
import createStoreAndPersistor from './src/redux/Store';

export default function Main() {

  const { store, persistor } = createStoreAndPersistor()
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}