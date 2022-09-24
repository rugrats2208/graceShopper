import React from "react";
import DropdownActions from "./DropdownActions";
import ProductsTable from "./ProductsTable";
import UsersTable from "./UsersTable";

const AdminDashboard = () => {
  const [page, setPage] = React.useState(false);
  return (
    <div className="adminDashboard">
      <div className="options">
        <DropdownActions />
        <button
          onClick={() => {
            setPage(!page);
          }}
        >
          {page ? "Products" : "Users"}
        </button>
      </div>
      {page ? <UsersTable /> : <ProductsTable />}
    </div>
  );
};

export default AdminDashboard;
