import React from "react";
import DropdownActions from "./DropdownActions";
import ProductsTable from "./ProductsTable";
import UsersTable from "./UsersTable";
const AdminDashboard = () => {
  return (
    <div className="adminDashboard">
      <DropdownActions />
      {/* <ProductsTable /> */}
      <UsersTable />
    </div>
  );
};

export default AdminDashboard;
