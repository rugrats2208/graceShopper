import React from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { setUser } from "../../reducers/adminReducer";

function UsersTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);

  const { formMethod, user } = useSelector((state) => state.admin);

  const [currPage, setCurrPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);
  const indexOfLastPost = currPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currSlice = users.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrPage(pageNumber);

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Email</th>
            <th>Privileges</th>
          </tr>
        </thead>
        <tbody>
          {currSlice.map((endUser) => {
            return (
              <tr
                onClick={() => {
                  if (!formMethod) {
                    dispatch(setUser(endUser));
                  }
                }}
                className={endUser.id === user.id ? "selected" : ""}
                key={endUser.id}
              >
                <td>{endUser.id}</td>
                <td>{endUser.fName}</td>
                <td>{endUser.lName}</td>
                <td>{endUser.username}</td>
                <td>{"*******"}</td>
                <td>{endUser.email}</td>
                <td>{endUser.isAdmin ? "Administrator" : "User"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination
        currPage={currPage}
        itemsPerPage={itemsPerPage}
        total={users.length}
        paginate={paginate}
      />
    </>
  );
}

export default UsersTable;
