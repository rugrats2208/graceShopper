import React from "react";
import DropdownActions from "./DropdownActions";
import ProductsTable from "./ProductsTable";
import UsersTable from "./UsersTable";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setFormMethod } from "../../reducers/adminReducer";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(false);
  const { formMethod } = useSelector((state) => state.admin);

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="adminDashboard">
      <div className="options">
        <DropdownActions page={page} />
        <button
          onClick={() => {
            if (formMethod) dispatch(setFormMethod(""));
            setPage(!page);
          }}
        >
          {page ? "Switch to Products" : "Switch to Users"}
        </button>
      </div>
      {page ? <UsersTable /> : <ProductsTable />}
    </div>
  );
};

export default AdminDashboard;
