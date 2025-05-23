import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <span>logo</span>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Prisijungti</Link>
                    </li>
                    <li>Registruotis</li>
                    <li>Atsijungti</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
