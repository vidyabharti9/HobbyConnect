import { useState } from "react";
import { loginUser } from "../services/api";

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
            console.log("login", token)
            alert("Login successful");
            navigate("/profile"); // Redirect to Profile page
        } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    );
}


export default Login;
