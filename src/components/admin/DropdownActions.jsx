import React from "react";
import { useSelector, useDispatch } from "react-redux";

//BOOTSTRAP
import Dropdown from "react-bootstrap/Dropdown";
//COMPONENTS
import FormActions from "./ProductForm";
//ACTIONS
import { delProduct } from "../../reducers/products/productsReducer";
import { setSelection, setOption } from "../../reducers/adminReducer";

function DropdownActions({ page }) {
  const dispatch = useDispatch();
  const { option, selection } = useSelector((state) => state.admin);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Actions
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              if (!page) {
                dispatch(setOption("add"));
              }
            }}
            href="#/action-1"
          >
            Add Item
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              if (selection.id) {
                dispatch(setOption("edit"));
              }
            }}
            href="#/action-2"
          >
            Edit Selection
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              if (selection.id) {
                dispatch(delProduct(selection.id));
                dispatch(setSelection(""));
              }
            }}
            href="#/action-3"
          >
            Delete Selection
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {option ? <FormActions /> : ""}
    </>
  );
}

export default DropdownActions;
