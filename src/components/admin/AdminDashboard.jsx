import React from "react";
import { useDispatch, useSelector } from "react-redux";

//CSS
import "./css/style.css";

//COMPONENTS
import UsersTable from "./UsersTable";
import ProductsTable from "./ProductsTable";
import DropdownActions from "./DropdownActions";
import SortDropdown from "./SortDropdown";

//BOOTSTRAP
import Button from "react-bootstrap/Button";

//ACTIONS
import {
  getUsers,
  setFormMethod,
  setView,
  setSortMethod,
  getProducts,
} from "../../reducers/adminReducer";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { view, formMethod, sortMethod } = useSelector((state) => state.admin);
  const products = useSelector((state) => state.products);

  const renderTable = (sel) => (sel ? <UsersTable /> : <ProductsTable />);

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  React.useEffect(() => {
    dispatch(getProducts());
  }, [products]);

  return (
    <div className="adminDashboard">
      <div className="options">
        <DropdownActions />
        <SortDropdown />
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            if (formMethod) dispatch(setFormMethod(""));
            if (sortMethod) dispatch(setSortMethod(""));
            dispatch(setView(!view));
          }}
        >
          {view ? "Switch to Products" : "Switch to Users"}
        </Button>
      </div>
      {renderTable(view)}
    </div>
  );
};

export default AdminDashboard;
