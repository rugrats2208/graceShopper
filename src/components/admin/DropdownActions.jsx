import React from "react";
import { useSelector, useDispatch } from "react-redux";

//BOOTSTRAP
import Dropdown from "react-bootstrap/Dropdown";

//COMPONENTS
import ProductForm from "./ProductForm";
import UserForm from "./UserForm";

//ACTIONS
import { delProduct } from "../../reducers/products/productsReducer";
import {
  setProduct,
  setFormMethod,
  delUser,
  setUser,
} from "../../reducers/adminReducer";

function DropdownActions({ page }) {
  const dispatch = useDispatch();
  const { formMethod, product, user } = useSelector((state) => state.admin);

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
              if (product.id && !page) {
                dispatch(setFormMethod("edit"));
              }
              if (user.id && page) {
                dispatch(setFormMethod("edit"));
              }
            }}
            href="#/action-2"
          >
            Edit Selection
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              if (product.id && !page) {
                dispatch(delProduct(product.id));
                dispatch(setProduct(""));
              }
              if (user.id && page) {
                dispatch(delUser(user.id));
                dispatch(setUser(""));
              }
            }}
            href="#/action-3"
          >
            Delete Selection
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {formMethod ? page ? <UserForm /> : <ProductForm /> : ""}
    </>
  );
}

export default DropdownActions;
