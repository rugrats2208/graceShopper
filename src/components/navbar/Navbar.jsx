import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../reducers/Auth/authReducer';
import Signup from '../auth/Signup';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';

export default function Navigation() {
  const [showBasic, setShowBasic] = useState(true);
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
      <MDBNavbar expand="lg" dark bgColor="dark" fixed="top">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">Grace Shopper</MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem className="nav-header-links">
                <NavLink to="/">Home</NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem className="nav-header-links">
                <NavLink
                  to="/allProducts"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'normal',
                  })}
                >
                  Products
                </NavLink>{' '}
              </MDBNavbarItem>
              <MDBNavbarItem className="nav-header-links">
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
              </MDBNavbarItem>
            </MDBNavbarNav>
            <div className="nav-header-container">
              <Navbar.Text className="me-2">
                Signed in as: <a href="#login">{username || 'guest'} </a>
              </Navbar.Text>

              {window.localStorage.getItem('username') === null && (
                <MDBBtn
                  color="secondary"
                  variant="primary"
                  onClick={handleShowLog}
                >
                  Sign In
                </MDBBtn>
              )}
              {window.localStorage.getItem('username') !== null && (
                <MDBBtn color="secondary" onClick={handleLogout}>
                  Log Out
                </MDBBtn>
              )}
            </div>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
