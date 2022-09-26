import React from "react";
import { useSelector, useDispatch } from "react-redux";

//BOOTSTRAP
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

//ACTIONS
import { setSortMethod, sortUsers } from "../../reducers/adminReducer";

function SortDropdown() {
  const dispatch = useDispatch();
  const [dir, setDir] = React.useState(false);
  const { formMethod, user, sortMethod, view } = useSelector(
    (state) => state.admin
  );

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Button
          onClick={() => {
            if (sortMethod && view) {
              dispatch(sortUsers(dir));
              setDir(!dir);
            }
            if (sortMethod && !view) {
              let productDir = false;
              dispatch(sortProducts(productDir));
              productDir = !productDir;
            }
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
            <Dropdown.Item
              onClick={() => dispatch(setSortMethod("id"))}
              href="#/action-1"
            >
              ID
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => dispatch(setSortMethod("name"))}
              href="#/action-2"
            >
              Name
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => dispatch(setSortMethod("price"))}
              href="#/action-3"
            >
              Price
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => dispatch(setSortMethod("stock"))}
              href="#/action-4"
            >
              Stock
            </Dropdown.Item>
          </Dropdown.Menu>
        )}
      </Dropdown>
    </>
  );
}

export default SortDropdown;
