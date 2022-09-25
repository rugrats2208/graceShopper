import React from "react";
import { useSelector, useDispatch } from "react-redux";

//BOOTSTRAP
import Dropdown from "react-bootstrap/Dropdown";
//COMPONENTS
import ProductForm from "./ProductForm";
import UserForm from "./UserForm";
//ACTIONS
import { delProduct } from "../../reducers/products/productsReducer";
import { setProduct, setFormMethod } from "../../reducers/adminReducer";

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
              if (product.id) {
                dispatch(setFormMethod("edit"));
              }
            }}
            href="#/action-2"
          >
            Edit Selection
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              if (product.id) {
                dispatch(delProduct(product.id));
                dispatch(setProduct(""));
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
