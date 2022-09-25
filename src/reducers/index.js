//index for action generators
import { getOrders, deleteOrderItem } from './orders/ordersReducer';
import { me, authenticate, logout } from './Auth/authReducer';
import { getSingleProduct } from './products/singleProductReducer';
import { getSingleArtist } from './artists/singleArtistReducer';
import { setSelection, setOption, getUsers } from './adminReducer';
import {
    getProducts,
    addProduct,
    editProduct,
    delProduct,
} from './products/productsReducer';

export {
    getOrders,
    deleteOrderItem,
    me,
    authenticate,
    logout,
    getSingleProduct,
    getSingleArtist,
    setSelection,
    setOption,
    getUsers,
    getProducts,
    addProduct,
    editProduct,
    delProduct,
};
