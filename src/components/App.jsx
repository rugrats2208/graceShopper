import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProducts } from '../reducers/products/productsReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './admin/PrivateRoutes';

//COMPONENTS
import {
  AllProducts,
  SingleProduct,
  FeaturedProducts,
  NewProductReleases,
  Main,
  PageNotFound,
  Navigation,
  AdminDashboard,
  SingleArtist,
  Signup,
  Cart,
  OrderHistory,
  Checkout,
  LoggedInInfo,
  UserInfoPage,
  LoggedInEdit,
  PaymentSuccess,
  PaymentCancel,
} from './index';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="app">
      <Navigation />
      <Cart />
      <ToastContainer />
      <Routes>
        <Route index element={<Main />} />
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/orderHistory/:id'} element={<OrderHistory />} />
        <Route path={'/allProducts'} element={<AllProducts />} />
        <Route path={'/singleProduct/:id'} element={<SingleProduct />} />
        <Route path={'/singleArtist/:id'} element={<SingleArtist />} />
        <Route path={'/featuredProducts'} element={<FeaturedProducts />} />
        <Route path={'/newProductReleases'} element={<NewProductReleases />} />
        <Route path={'/loggedInInfo'} element={<LoggedInInfo />} />
        <Route path={'/userInfoPage'} element={<UserInfoPage />} />
        <Route path={'/loggedInEdit'} element={<LoggedInEdit />} />
        <Route path={'/checkout'} element={<Checkout />} />
        <Route path={'/paymentSuccess'} element={<PaymentSuccess />} />
        <Route path={'/paymentCancel'} element={<PaymentCancel />} />

        <Route element={<PrivateRoutes />}>
          <Route path={'/admin'} element={<AdminDashboard />} />
        </Route>
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
      <footer className="my-5 pt-5 text-muted text-center text-small">
        <p className="mb-1">&copy; 2017–2022 Grace Shopper Records Ltd.</p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="#">Privacy</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Terms</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Support</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
