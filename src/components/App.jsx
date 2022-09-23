import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProducts } from "../reducers/products/productsReducer";

//COMPONENTS
import {
  AllProducts,
  SingleProduct,
  // FeaturedProducts,
  // NewProductReleases,
  GuestMain,
  SignedInMain,
  Navigation,
  Admin,
  SingleArtist,
  Signup,
  Cart,
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
      <Routes>
        <Route index element={<GuestMain />} />
        <Route path={"/signedInMain"} element={<SignedInMain />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/signedInMain"} element={<SignedInMain />} />
        <Route path={"/allProducts"} element={<AllProducts />} />
        <Route path={"/singleProduct/:id"} element={<SingleProduct />} />
        <Route path={"/singleArtist/:id"} element={<SingleArtist />} />
        {/* <Route path={"/featuredProducts"} element={<FeaturedProducts />} /> */}
        {/* <Route path={"/newProductReleases"} element={<NewProductReleases />} /> */}
        <Route path={"/admin"} element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
