//index for action generators
import { getOrders } from './orders/ordersReducer';
import { me, authenticate, logout } from './Auth/authReducer';
import { getSingleProduct } from './products/singleProductReducer';
import { getSingleArtist } from './artists/singleArtistReducer';
import { getUsers } from './adminReducer';
import {
    getProducts,
    addProduct,
    editProduct,
    delProduct,
} from './products/productsReducer';

export {
    getOrders,
    me,
    authenticate,
    logout,
    getSingleProduct,
    getSingleArtist,
    getUsers,
    getProducts,
    addProduct,
    editProduct,
    delProduct,
};
