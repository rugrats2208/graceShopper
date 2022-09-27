import React from "react";
import { useDispatch, useSelector } from "react-redux";

//CSS
import "./css/style.css";

//COMPONENTS
import UsersTable from "./UsersTable";
import ProductsTable from "./ProductsTable";
import DropdownActions from "./DropdownActions";
import SortDropdown from "./SortDropdown";
import ProductCards from "./ProductCards";
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

  const windowWidth = () => window.innerWidth;

  const renderTable = (sel) => (sel ? <UsersTable /> : <ProductsTable />);

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  React.useEffect(() => {
    dispatch(getProducts());
  }, [products]);

  const switchToMobile = () => {
    setCardView(window.innerWidth);
  };

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
      {cardView > 900 ? renderTable(view) : <ProductCards />}
    </div>
  );
};

export default AdminDashboard;

// import React from "react";
// function MyComponent() {
//   const [dimensions, setDimensions] = React.useState({
//     height: window.innerHeight,
//     width: window.innerWidth,
//   });
//   React.useEffect(() => {
//     function handleResize() {
//       setDimensions({
//         height: window.innerHeight,
//         width: window.innerWidth,
//       });
//     }

//     window.addEventListener("resize", handleResize);
//   });
//   return (
//     <div>
//       Rendered at {dimensions.width} x {dimensions.height}
//     </div>
//   );
// }
