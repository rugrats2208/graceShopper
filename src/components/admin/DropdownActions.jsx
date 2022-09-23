import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import FormActions from "./FormActions";
import { useDispatch } from "react-redux";
import { delProduct } from "../../reducers/products/productsReducer";

function DropdownActions({ set: { selection = {}, setSelection } }) {
  const dispatch = useDispatch();
  const [option, setOption] = React.useState("");

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Actions
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setOption("add")} href="#/action-1">
            Add Item
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              if (selection) {
                setOption("edit");
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
                setSelection("");
              }
            }}
            href="#/action-3"
          >
            Delete Selection
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {option ? (
        <FormActions data={{ selection, setSelection, option, setOption }} />
      ) : (
        ""
      )}
    </>
  );
}

export default DropdownActions;
