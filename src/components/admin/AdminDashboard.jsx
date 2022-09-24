import React from "react";
import DropdownActions from "./DropdownActions";
import ProductsTable from "./ProductsTable";

const AdminDashboard = () => {
  return (
    <div className="adminDashboard">
      <DropdownActions />
      <ProductsTable />
    </div>
  );
};

export default AdminDashboard;
