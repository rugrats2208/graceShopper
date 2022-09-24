import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProducts } from "../reducers/products/productsReducer";
import { ToastContainer } from "react-toastify";

import PrivateRoutes from "./admin/PrivateRoutes";

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
} from "./index";

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
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/orderHistory/:id"} element={<OrderHistory />} />
        <Route path={"/allProducts"} element={<AllProducts />} />
        <Route path={"/singleProduct/:id"} element={<SingleProduct />} />
        <Route path={"/singleArtist/:id"} element={<SingleArtist />} />
        <Route path={"/featuredProducts"} element={<FeaturedProducts />} />
        <Route path={"/newProductReleases"} element={<NewProductReleases />} />
        <Route element={<PrivateRoutes />}>
          <Route path={"/admin"} element={<AdminDashboard />} />
        </Route>
        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
