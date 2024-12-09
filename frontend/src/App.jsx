import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import HobbyGroups from "./pages/HobbyGroups";
import GroupPage from "./pages/GroupPage"; // Import the dynamic group page component
import Footer from "./pages/Footer";
import Testimonials from "./pages/Testimonials"; // Import Testimonials

function App() {
    return (
        <Router>
            <Routes>
                {/* Home Page Route */}
                <Route
                    path="/"
                    element={
                        <>
                            <HomePage />
                            <Testimonials /> {/* Include Testimonials here */}
                        </>
                    }
                />
                {/* Other Routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/groups" element={<HobbyGroups />} />
                <Route path="/groups/:hobby" element={<GroupPage />} />
            </Routes>
            {/* Footer Outside Routes */}
            <Footer />
        </Router>
    );
}

export default App;
