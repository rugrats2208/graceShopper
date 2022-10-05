import {
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler,
} from 'mdb-react-ui-kit';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Hamburger from 'hamburger-react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../reducers/Auth/authReducer';
import Signup from '../auth/Signup';
import styles from './navbar.module.css';
import vinyl from './vinyl.svg';
import Cart from '../cart/Cart';

export default function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //grab the username if logged in
  const username = useSelector((state) => state.auth.username);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  //modal handlers
  const [showLog, setShowLog] = React.useState(false);
  const handleCloseLog = () => setShowLog(false);
  const handleShowLog = () => setShowLog(true);
  const [isOpen, setOpen] = useState(false);

  //login  handler
  // function handleLogin(e) {
  //   e.preventDefault();
  //   navigate('/signup');
  // }
  //logout  handler
  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
    setOpen(!isOpen);
    navigate('/');
  }

  //render tooltip
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Shopping Cart
    </Tooltip>
  );

  return (
    <>
      {showLog && (
        <Signup
          closeNav={() => setOpen(!isOpen)}
          show={showLog}
          onHide={handleCloseLog}
        />
      )}
      <Navbar
        expanded={isOpen}
        className="d-flex justify-content-between"
        collapseOnSelect
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top"
        onToggle={() => setOpen(!isOpen)}
      >
        <Container fluid>
          <NavLink to="/">
            <img
              className={styles.logo}
              src={vinyl}
              height="50"
              alt="Grace Shopper Records Logo"
              loading="lazy"
            />
          </NavLink>
          <Nav.Link as={NavLink} to="/" onClick={() => setOpen(!isOpen)}>
            <span className="narvar-brand">
              <span className={styles.nav_title}>Grace Shopper Records</span>
            </span>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" onClick={() => setOpen(!isOpen)}>
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/allProducts"
                onClick={() => setOpen(!isOpen)}
                style={({ isActive }) => ({
                  fontWeight: isActive ? 'bold' : 'normal',
                })}
              >
                Vinyl
              </Nav.Link>{' '}
              {isAdmin ? (
                <Nav.Link
                  as={NavLink}
                  to="/admin"
                  onClick={() => setOpen(!isOpen)}
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'normal',
                  })}
                >
                  Admin
                </Nav.Link>
              ) : (
                ''
              )}
            </Nav>
            <Nav className="mx-3">
              {/* Signed in as */}
              <Stack
                direction="horizontal"
                gap={3}
                className="d-flex justify-content-end"
              >
                <Navbar.Text className="d-flex align-items-center">
                  Signed in as:{' '}
                  <Nav.Link
                    as={NavLink}
                    to={`/userInfoPage`}
                    onClick={() => setOpen(!isOpen)}
                  >
                    {username || 'guest'}{' '}
                  </Nav.Link>
                </Navbar.Text>
                {/* Cart Icon */}

                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <div className={styles.cart_icon}>
                    <Cart />
                  </div>
                </OverlayTrigger>
                {/* signin / sign out */}
                <div className="vr" />
                {!window.localStorage.getItem('isLoggedIn') && (
                  <Button variant="primary" size="sm" onClick={handleShowLog}>
                    Sign In
                  </Button>
                )}
                {window.localStorage.getItem('isLoggedIn') && (
                  <Button variant="info" size="sm" onClick={handleLogout}>
                    Log Out
                  </Button>
                )}
              </Stack>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
