import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import HobbyGroups from "./pages/HobbyGroups";
import GroupPage from "./pages/GroupPage"; // Import the dynamic group page component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/groups" element={<HobbyGroups />} />
                <Route path="/groups/:hobby" element={<GroupPage />} /> {/* Dynamic Group Route */}
            </Routes>
        </Router>
    );
}

export default App;
