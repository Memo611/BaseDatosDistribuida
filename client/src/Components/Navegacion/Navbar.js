import React, { useState } from 'react';
import '../Styles/Navegacion/Nav.css';
import { Link } from 'react-router-dom';
import Gorca from '../../Gorca.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button, Badge, Dropdown } from 'react-bootstrap';
import Carrito from '../Paginas/Carrito/Carrito.js'; // Importa el componente Carrito

const Navbar = ({ links, cartItems ,setShowModal, clearCart}) => {
    const [isAdmin, setIsAdmin] = useState(true); // Simulando que el admin ha iniciado sesión
    const [cartMenuVisible, setCartMenuVisible] = useState(false);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const toggleCartMenu = () => {
        setCartMenuVisible(!cartMenuVisible);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" content='center'>GORCA</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        {links.map((link) => (
                            link.name === 'Home' ? (
                                <li className="nav-item" key={link.href}>
                                    <Link className="nav-link" to={link.href}>{link.name}</Link>
                                </li>
                            ) : link.subLinks ? (
                                <li className="nav-item dropdown" key={link.name}>
                                    <a className="nav-link dropdown-toggle" href="#" id={`navbarDropdown-${link.name}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {link.name}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby={`navbarDropdown-${link.name}`}>
                                        {link.subLinks.map((subLink) => (
                                            <li key={subLink.href}>
                                                <Link className="dropdown-item" to={subLink.href}>{subLink.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ) : (
                                <li className="nav-item" key={link.href}>
                                    <Link className="nav-link" to={link.href}>{link.name}</Link>
                                </li>
                            )
                        ))}
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success me-2" type="submit">Search</button>
                    </form>
                    <div className="cart-container">
                        <Carrito cartItems={cartItems} clearCart={clearCart} setShowModal={setShowModal} />
                    </div>
                    {isAdmin ? (
                        <div className="btn-group">
                            <button type="button" className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faUser} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link></li>
                                <li><Link className="dropdown-item" to="/admin/settings">Settings</Link></li>
                                <li><Link className="dropdown-item" to="/admin/profile">Profile</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={() => setIsAdmin(false)}>Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <button className="btn btn-outline-light" onClick={() => setIsAdmin(true)}>Login</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
