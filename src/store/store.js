import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/Auth/authReducer';
import productsReducer from '../reducers/products/productsReducer';
import singleProductReducer from '../reducers/products/singleProductReducer';
import singleArtistReducer from '../reducers/artists/singleArtistReducer';
import { setupListeners } from '@reduxjs/toolkit/query';
import reduxLogger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    products: productsReducer,
    singleProduct: singleProductReducer,
    singleArtist: singleArtistReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(reduxLogger),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export let persistor = persistStore(store);
