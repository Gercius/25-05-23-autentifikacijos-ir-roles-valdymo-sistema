import { useState } from "react";
import { Link } from "react-router-dom";
import closeMenuIcon from "../assets/close-menu-icon.svg";
import openMenuIcon from "../assets/open-menu-icon.svg";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const headerRef = useRef(null);

    const handleMenu = () => {
        setIsMenuOpen((prev) => setIsMenuOpen(!prev));
    };

    const handleLogout = async () => {
        await logout();
        setIsMenuOpen(false);
    };

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header ref={headerRef}>
            <div className="logo-burger-menu-wrapper">
                <span>logo</span>
                <button className="mobile-menu-btn" onClick={handleMenu}>
                    {isMenuOpen ? <img src={closeMenuIcon} alt="" /> : <img src={openMenuIcon} alt="" />}
                </button>
                <nav className="menu-desktop">
                    <ul>
                        {isLoggedIn ? (
                            <li>
                                <Link to="/" onClick={handleLogout}>
                                    Atsijungti
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">Prisijungti</Link>
                                </li>
                                <li>
                                    <Link to="/register">Registruotis</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
            {isMenuOpen && (
                <nav className="menu-mobile">
                    <ul>
                        {isLoggedIn ? (
                            <li>
                                <Link to="/" onClick={handleLogout}>
                                    Atsijungti
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li onClick={handleMenu}>
                                    <Link to="/login">Prisijungti</Link>
                                </li>
                                <li onClick={handleMenu}>
                                    <Link to="/register">Registruotis</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
