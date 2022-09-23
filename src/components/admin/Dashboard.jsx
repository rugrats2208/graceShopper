import React from "react";
import ProductsTable from "./ProductsTable";
import DropdownActions from "./DropdownActions";

const Dashboard = () => {
  const [selection, setSelection] = React.useState("");
  return (
    <div className="dashboard">
      <DropdownActions set={{ selection, setSelection }} />
      <ProductsTable set={setSelection} />
    </div>
  );
};

export default Dashboard;
