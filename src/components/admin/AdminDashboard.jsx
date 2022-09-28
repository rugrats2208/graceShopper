import React from "react";
import { useDispatch, useSelector } from "react-redux";

//CSS
import "./css/style.css";

//COMPONENTS
import DropdownActions from "./DropdownActions";
import SortDropdown from "./SortDropdown";
import ProductsTable from "./ProductsTable";
import ProductCards from "./ProductCards";
import UsersTable from "./UsersTable";
import UserCards from "./UserCards";
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
  const [cardView, setCardView] = React.useState(window.innerWidth);
  const { view, formMethod, sortMethod } = useSelector((state) => state.admin);
  const products = useSelector((state) => state.products);
  const renderTable = (sel) => (sel ? <UsersTable /> : <ProductsTable />);
  const renderCards = (sel) => (sel ? <UserCards /> : <ProductCards />);

  const switchToMobile = () => {
    setCardView(window.innerWidth);
  };

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  React.useEffect(() => {
    dispatch(getProducts());
  }, [products]);

  window.addEventListener("resize", switchToMobile);
  return (
    <div className="adminDashboard">
      <div className="options">
        <DropdownActions />
        <SortDropdown />
        <div className="dropdown">
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
      </div>
      {cardView > 900 ? renderTable(view) : renderCards(view)}
    </div>
  );
};

export default AdminDashboard;
