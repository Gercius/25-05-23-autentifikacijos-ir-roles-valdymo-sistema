import { useState } from "react";
import { Link } from "react-router-dom";
import closeMenuIcon from "../assets/close-menu-icon.svg";
import openMenuIcon from "../assets/open-menu-icon.svg";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenu = () => {
        setIsMenuOpen((prev) => setIsMenuOpen(!prev));
    };

    return (
        <header>
            <div className="logo-burger-menu-wrapper">
                <span>logo</span>
                <button className="mobile-menu-btn" onClick={handleMenu}>
                    {isMenuOpen ? <img src={closeMenuIcon} alt="" /> : <img src={openMenuIcon} alt="" />}
                </button>
                <nav className="menu-desktop">
                    <ul>
                        <li>
                            <Link to="/login">Prisijungti</Link>
                        </li>
                        <li>
                            <Link to="/register">Registruotis</Link>
                        </li>
                        {/* <li>
                            <Link to="/">Atsijungti</Link>
                        </li> */}
                    </ul>
                </nav>
            </div>
            {isMenuOpen && (
                <nav className="menu-mobile">
                    <ul>
                        <li onClick={handleMenu}>
                            <Link to="/login">Prisijungti</Link>
                        </li>
                        <li onClick={handleMenu}>
                            <Link to="/register">Registruotis</Link>
                        </li>
                        {/* <li>
                            <Link to="/">Atsijungti</Link>
                        </li> */}
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
