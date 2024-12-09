import { useState } from "react";
import { loginUser } from "../services/api";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token } = await loginUser(form);
            localStorage.setItem("token", token);
            alert("Login successful");
            navigate("/profile");
        } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };

    return (
        <div className="outer-container">
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <input name="email" placeholder="Email" onChange={handleChange} />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
