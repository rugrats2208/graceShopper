import {
    MDBBtn,
    MDBCollapse,
    MDBContainer,
    MDBIcon,
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

export default function Navigation() {
    const [showBasic, setShowBasic] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //grab the username if logged in
    const username = useSelector(state => state.auth.username);
    const isAdmin = useSelector(state => state.auth.isAdmin);

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

    return (
        <>
            {showLog && <Signup show={showLog} onHide={handleCloseLog} />}
            <MDBNavbar expand="lg" dark bgColor="dark" fixed="top">
                <MDBContainer fluid>
                    <img
                        className={styles.logo}
                        src={vinyl}
                        height="50"
                        alt="Grace Shopper Records Logo"
                        loading="lazy"
                    />
                    <MDBNavbarBrand className={styles.nav_title} href="#">
                        Grace Shopper Records
                    </MDBNavbarBrand>

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
                            <MDBNavbarItem className={styles.nav_header_links}>
                                <NavLink to="/">Home</NavLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem className={styles.nav_header_links}>
                                <NavLink
                                    to="/allProducts"
                                    style={({ isActive }) => ({
                                        fontWeight: isActive
                                            ? 'bold'
                                            : 'normal',
                                    })}
                                >
                                    Vinyl
                                </NavLink>{' '}
                            </MDBNavbarItem>
                            <MDBNavbarItem className={styles.nav_header_links}>
                                {isAdmin ? (
                                    <NavLink
                                        to="/admin"
                                        style={({ isActive }) => ({
                                            fontWeight: isActive
                                                ? 'bold'
                                                : 'normal',
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
                            <Navbar.Text className="me-2">
                                Signed in as:{' '}
                                <a href="#login">{username || 'guest'} </a>
                            </Navbar.Text>
                            {/* Cart Icon */}
                            <div className={styles.cart_icon}>
                                <a className="text-reset me-3" href="#">
                                    <i className="fas fa-shopping-cart"></i>
                                </a>
                            </div>
                            {!window.localStorage.getItem('isLoggedIn') && (
                                <MDBBtn
                                    color="secondary"
                                    variant="primary"
                                    onClick={handleShowLog}
                                >
                                    Sign In
                                </MDBBtn>
                            )}
                            {window.localStorage.getItem('isLoggedIn') && (
                                <MDBBtn
                                    color="secondary"
                                    onClick={handleLogout}
                                >
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
