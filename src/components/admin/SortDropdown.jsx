import React from "react";
import { useSelector, useDispatch } from "react-redux";

//BOOTSTRAP
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

//ACTIONS
import { setSortMethod } from "../../reducers/adminReducer";

function SortDropdown() {
  const dispatch = useDispatch();
  const { sortMethod, view } = useSelector((state) => state.admin);
  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Button
          onClick={() => {
            console.log("toggled");
          }}
          variant="secondary"
        >
          {sortMethod ? "Toggle" : "Sort Options"}
        </Button>

        <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
        {view ? (
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => dispatch(setSortMethod("id"))}
              href="#/action-1"
            >
              ID
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => dispatch(setSortMethod("first"))}
              href="#/action-2"
            >
              First Name
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => dispatch(setSortMethod("last"))}
              href="#/action-3"
            >
              Last Name
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => dispatch(setSortMethod("username"))}
              href="#/action-4"
            >
              Username
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => dispatch(setSortMethod("email"))}
              href="#/action-5"
            >
              Email
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => dispatch(setSortMethod("admin"))}
              href="#/action-6"
            >
              isAdmin
            </Dropdown.Item>
          </Dropdown.Menu>
        ) : (
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">ID</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Name</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Price</Dropdown.Item>
            <Dropdown.Item href="#/action-4">Stock</Dropdown.Item>
          </Dropdown.Menu>
        )}
      </Dropdown>
    </>
  );
}

export default SortDropdown;
