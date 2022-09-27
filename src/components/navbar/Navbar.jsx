import {
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBBadge,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler,
} from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../reducers/Auth/authReducer';
import Signup from '../auth/Signup';
import styles from './navbar.module.css';
import vinyl from './vinyl.svg';
import Cart from '../cart/Cart';

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
  }

  //return only the active order lineItems or empty array
  const activeOrder = useSelector((state) =>
    state.orders.find((order) => !order.complete)
  ) || { lineItems: [] };
  const { lineItems } = activeOrder;

  return (
    <>
      {showLog && <Signup show={showLog} onHide={handleCloseLog} />}
      <MDBNavbar expand="lg" dark bgColor="dark" fixed="top">
        <MDBContainer fluid>
          <NavLink to="/">
            <img
              className={styles.logo}
              src={vinyl}
              height="50"
              alt="Grace Shopper Records Logo"
              loading="lazy"
            />
          </NavLink>
          <NavLink to="/">
            <span className="narvar-brand">
              <span className={styles.nav_title}>Grace Shopper Records</span>
            </span>
          </NavLink>
          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(showBasic ? false : true)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem className={styles.nav_header_links}>
                <NavLink
                  to="/"
                  onClick={() => setShowBasic(showBasic ? false : true)}
                >
                  Home
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem className={styles.nav_header_links}>
                <NavLink
                  to="/allProducts"
                  onClick={() => setShowBasic(showBasic ? false : true)}
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'normal',
                  })}
                >
                  Vinyl
                </NavLink>{' '}
              </MDBNavbarItem>
              <MDBNavbarItem className={styles.nav_header_links}>
                {isAdmin ? (
                  <NavLink
                    to="/admin"
                    onClick={() => setShowBasic(showBasic ? false : true)}
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

            <div className={styles.nav_header_container}>
              {/* Cart Icon */}
              <div className={styles.cart_icon}>
                <Cart />
              </div>
              {/* Signed in as */}
              <Navbar.Text className="me-3">
                Signed in as:{' '}
                <NavLink
                  to={`/userInfoPage`}
                  onClick={() => setShowBasic(showBasic ? false : true)}
                >
                  {username || 'guest'}{' '}
                </NavLink>
              </Navbar.Text>

              {/* signin / sign out */}
              {!window.localStorage.getItem('isLoggedIn') && (
                <MDBBtn
                  color="secondary"
                  variant="primary"
                  size="sm"
                  onClick={handleShowLog}
                >
                  Sign In
                </MDBBtn>
              )}
              {window.localStorage.getItem('isLoggedIn') && (
                <MDBBtn color="secondary" size="sm" onClick={handleLogout}>
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
