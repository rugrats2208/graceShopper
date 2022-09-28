import React from "react";
import { useSelector, useDispatch } from "react-redux";

//BOOTSTRAP
import Dropdown from "react-bootstrap/Dropdown";

//TOAST
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//COMPONENTS
import ProductForm from "./ProductForm";
import UserForm from "./UserForm";
import ProductCards from "./ProductCards";

//ACTIONS
import { delProduct } from "../../reducers/products/productsReducer";
import {
  setProduct,
  setFormMethod,
  delUser,
  setUser,
} from "../../reducers/adminReducer";

function SortDropdown() {
  const dispatch = useDispatch();
  const { formMethod, product, user, view } = useSelector(
    (state) => state.admin
  );

  const inputAvailable = () =>
    toast.success("Success!", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
    });

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Actions
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              dispatch(setFormMethod("add"));
            }}
            href="#/action-1"
          >
            Add Item
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              if (product.id && !view) {
                dispatch(setFormMethod("edit"));
              }
              if (user.id && view) {
                dispatch(setFormMethod("edit"));
              }
            }}
            href="#/action-2"
          >
            Edit Selection
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              if (product.id && !view) {
                dispatch(delProduct(product.id));
                dispatch(setProduct(""));
                inputAvailable();
              }
              if (user.id && view) {
                dispatch(delUser(user.id));
                dispatch(setUser(""));
                inputAvailable();
              }
            }}
            href="#/action-3"
          >
            Delete Selection
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {formMethod ? view ? <UserForm /> : <ProductForm /> : ""}
      {/* {formMethod ? view ? <UserForm /> : <ProductForm /> : ""} */}
    </>
  );
}

export default SortDropdown;
