import React from "react";
import { useDispatch, useSelector } from "react-redux";

//BOOTSTRAP
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

//FUNCTIONS
import Pagination from "./Pagination";
import { setUser } from "../../reducers/adminReducer";

function UserCards() {
  const { formMethod, user, users } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [currPage, setCurrPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);
  const indexOfLastPost = currPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currSlice = users.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrPage(pageNumber);

  return (
    <>
      <div className="cardsContainer">
        {currSlice.map((endUser) => {
          return (
            <Card
              className={endUser.id === user.id ? "selected mb-4" : "mb-4"}
              onClick={() => {
                if (!formMethod) {
                  dispatch(setUser(endUser));
                }
              }}
              key={endUser.id}
              bg={"light"}
              style={{ width: "18rem" }}
            >
              <Card.Header>{`ID#${endUser.id}`}</Card.Header>
              <Card.Body>
                <Card.Title>{`${endUser.fName} ${endUser.lName}`}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <label>Username</label>
                <ListGroup.Item>{endUser.username}</ListGroup.Item>
                <label>Email</label>
                <ListGroup.Item>{endUser.email}</ListGroup.Item>
                <label>Privileges</label>
                <ListGroup.Item>
                  {endUser.isAdmin ? "Administrator" : "User"}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          );
        })}
      </div>
      <Pagination
        currPage={currPage}
        itemsPerPage={itemsPerPage}
        total={users.length}
        paginate={paginate}
      />
    </>
  );
}

export default UserCards;
