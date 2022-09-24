import React from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../reducers/adminReducer";
import Pagination from "./Pagination";
function UsersTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);

  const [currPage, setCurrPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);
  const indexOfLastPost = currPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currSlice = users.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrPage(pageNumber);

  const renderStudents = () => {
    console.count(users);
  };

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            {/* <th>Password</th> */}
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currSlice.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fName}</td>
                <td>{user.lName}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
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
