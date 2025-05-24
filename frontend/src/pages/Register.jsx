import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [error, setError] = useState("");
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Slaptazodziai turi sutapti!");
            return;
        }

        try {
            await register({ email, password });
            navigate("/");
        } catch (error) {
            console.log(error.message);
            setError("Toks vartotojas jau egzistuoja");
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
            <div className="form-field">
                <label>Patvirtinti Slaptazodi</label>
                <input
                    type="confirmPassword"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    required
                    onChange={(e) => setconfirmPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="form-btn register-btn">
                Registruotis
            </button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Register;
