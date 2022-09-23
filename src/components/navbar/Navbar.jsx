import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../reducers/Auth/authReducer';
import Signup from '../auth/Signup';

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //grab the username if logged in
  const username = useSelector((state) => state.auth.username);

  //modal handlers
  const [showLog, setShowLog] = React.useState(false);
  const handleCloseLog = () => setShowLog(false);
  const handleShowLog = () => setShowLog(true);

  //login  handler
  function handleLogin(e) {
    e.preventDefault();
    navigate('/signup');
  }
  //logout  handler
  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
    window.location.reload();
  }

  return (
    <>
      {showLog && <Signup show={showLog} onHide={handleCloseLog} />}
      <Navbar className="shadow" bg="dark" variant="dark" fixed="top">
        <Container fluid>
          <Navbar.Brand>Grace Shopper</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <div className="nav-header-links">
                <NavLink to="/">Home</NavLink>
                <NavLink
                  to="/allProducts"
                  style={({ isActive }) => ({
                    'font-weight': isActive ? 'bold' : 'normal',
                  })}
                >
                  Products
                </NavLink>
                <NavLink
                  to="/admin"
                  style={({ isActive }) => ({
                    'font-weight': isActive ? 'bold' : 'normal',
                  })}
                >
                  Admin
                </NavLink>
              </div>
            </Nav>

            <Navbar.Text>
              Signed in as: <a href="#login">{username || 'guest'} </a>
            </Navbar.Text>

            {username === null && (
              <Button
                className="ms-3"
                variant="outline-success"
                onClick={handleShowLog}
              >
                Sign In
              </Button>
            )}
            {username !== null && (
              <Button
                className="ms-3"
                variant="outline-success"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
