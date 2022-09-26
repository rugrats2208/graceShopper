import React from "react";
import { useDispatch, useSelector } from "react-redux";

//COMPONENTS
import UsersTable from "./UsersTable";
import ProductsTable from "./ProductsTable";
import DropdownActions from "./DropdownActions";
import SortDropdown from "./SortDropdown";
import ErrorMessage from "./ErrorMessage";

//BOOTSTRAP
import Button from "react-bootstrap/Button";

//ACTIONS
import { getUsers, setFormMethod, setView } from "../../reducers/adminReducer";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { formMethod, view } = useSelector((state) => state.admin);

  const renderTable = (sel) => (sel ? <UsersTable /> : <ProductsTable />);

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

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
            dispatch(setView(!view));
          }}
        >
          {view ? "Switch to Products" : "Switch to Users"}
        </Button>
      </div>
      {renderTable(view)}
      {<ErrorMessage />}
    </div>
  );
};

export default AdminDashboard;
