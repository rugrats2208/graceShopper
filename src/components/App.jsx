import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProducts } from '../reducers/products/productsReducer';
import { ToastContainer } from 'react-toastify';

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
} from './index';

//STRIPE CHECKOUT COMPONENTS
import PaymentScreen from './stripeCheckout/PaymentScreen';
import AddPayMethod from './stripeCheckout/AddPayMethod';
import Register from './stripeCheckout/Register';
import StripeWrapper from './stripeCheckout/StripeWrapper';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="app">
      <StripeWrapper>
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
          <Route
            path={'/newProductReleases'}
            element={<NewProductReleases />}
          />
          {/* Stripe Routes */}
          <Route path="/register" component={Register} />
          <Route path="/add-payment-method" component={AddPayMethod} />
          <Route path="/make-payment" component={PaymentScreen} />
          <Route element={<PrivateRoutes />}>
            <Route path={'/admin'} element={<AdminDashboard />} />
          </Route>
          <Route path={'*'} element={<PageNotFound />} />
        </Routes>
      </StripeWrapper>
    </div>
  );
}

export default App;
