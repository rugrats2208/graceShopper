import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/Auth/authReducer';
import productsReducer from '../reducers/products/productsReducer';
import singleProductReducer from '../reducers/products/singleProductReducer';
import singleArtistReducer from '../reducers/artists/singleArtistReducer';
import ordersReducer from '../reducers/orders/ordersReducer';
import { setupListeners } from '@reduxjs/toolkit/query';
import reduxLogger from 'redux-logger';

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        singleProduct: singleProductReducer,
        singleArtist: singleArtistReducer,
        orders: ordersReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(reduxLogger),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;
