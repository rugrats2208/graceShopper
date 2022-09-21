import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/allAlbums"}>Products</Link>
      <Link to={"/admin"}>Admin</Link>
    </div>
  );
};

export default Navbar;
