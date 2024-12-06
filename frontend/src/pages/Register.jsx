import { useState, useContext } from 'react';
import { registerUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', hobbies: [], profilePicture: null });
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleHobbyChange = (e) => {
    setForm({ ...form, hobby: e.target.value }); // Update the hobby input field value
  };

  const handleAddHobby = () => {
    if (form.hobby && !form.hobbies.includes(form.hobby)) {
      setForm({ ...form, hobbies: [...form.hobbies, form.hobby], hobby: '' }); // Add hobby and clear input
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
    formData.append('hobbies', form.hobbies.join(',')); // Converting hobbies to a comma-separated string
    if (form.profilePicture) {
      formData.append('profilePicture', form.profilePicture); // Add the profile picture
    }

    try {
      const res = await registerUser(formData);
      login(res.data.token); // Assuming the token is returned upon successful registration
      alert('Registration Successful!');
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Error registering user.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      {/* Hobby input and add button */}
      <input
        type="text"
        name="hobby"
        value={form.hobby || ''} // Ensure controlled input
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
  );
};

export default Register;
