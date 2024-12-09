import { useState, useContext } from 'react';
import { registerUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Register.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', hobbies: [], profilePicture: null });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleHobbyChange = (e) => {
    setForm({ ...form, hobby: e.target.value });
  };

  const handleAddHobby = () => {
    if (form.hobby && !form.hobbies.includes(form.hobby)) {
      setForm({ ...form, hobbies: [...form.hobbies, form.hobby], hobby: '' });
    }
  };

  const handleFileChange = (e) => {
    setForm({ ...form, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('hobbies', form.hobbies.join(','));
    if (form.profilePicture) {
      formData.append('profilePicture', form.profilePicture);
    }

    try {
      const res = await registerUser(formData);
      login(res.data.token);
      alert('Registration Successful!');
      navigate('/');
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Error registering user.');
    }
  };

  return (
    <div className='outer-container'>
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="profilePicture"
          onChange={handleFileChange}
        />
        {form.profilePicture && (
          <div>
            <p>Profile Picture: {form.profilePicture.name}</p>
          </div>
        )}
        <input
          type="text"
          name="hobby"
          value={form.hobby || ''}
          placeholder="Add a hobby"
          onChange={handleHobbyChange}
        />
        <button type="button" onClick={handleAddHobby}>Add Hobby</button>
        <ul>
          {form.hobbies.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>
        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
