import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../reducers/Auth/authReducer';
import Signup from '../auth/Signup';
// import { MDBBtn } from 'mdb-react-ui-kit';

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //grab the username if logged in
  const username = useSelector((state) => state.auth.username);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

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
      <Navbar
        className="shadow"
        bg="dark"
        expand="md"
        variant="dark"
        fixed="top"
      >
        <Container>
          <Navbar.Brand>Grace Shopper</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div className="nav-header-links">
                <NavLink to="/">Home</NavLink>
                <NavLink
                  to="/allProducts"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'normal',
                  })}
                >
                  Products
                </NavLink>

                {isAdmin ? (
                  <NavLink
                    to="/admin"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 'bold' : 'normal',
                    })}
                  >
                    Admin
                  </NavLink>
                ) : (
                  ''
                )}
              </div>
            </Nav>
            <div className="nav-header-container">
              <Navbar.Text>
                Signed in as: <a href="#login">{username || 'guest'} </a>
              </Navbar.Text>

              {window.localStorage.getItem('username') === null && (
                <Button
                  className="ms-3"
                  variant="primary"
                  onClick={handleShowLog}
                >
                  Sign In
                </Button>
              )}
              {window.localStorage.getItem('username') !== null && (
                <Button className variant="secondary" onClick={handleLogout}>
                  Log Out
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
