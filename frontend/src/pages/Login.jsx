import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);
            navigate("/");
        } catch (error) {
            console.log(error.message);
            setError("Tokio vartotojo nera arba neteisingai ivesti prisijungimo duomenys");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label>El. Pastas</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-field">
                <label>Slaptazodis</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="form-btn login-btn">
                Prisijungti
            </button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Login;
