import { configureStore, combineReducers  } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userSlice from "./store/slice/authUserSlice";

const rootReducer = combineReducers({
   // Add more slices/reducers here if needed
   user: userSlice,
 });
 

const persistConfig = {
   key: 'root',
   storage,
 };

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const RootState = null;
export default function createStoreAndPersistor(){
   const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
   });
   let persistor = persistStore(store)
   return { store, persistor }
 }