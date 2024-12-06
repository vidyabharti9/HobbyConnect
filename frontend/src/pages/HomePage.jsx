import { Link } from "react-router-dom";
import "./HomePage.css"; // For styling
const HomePage = () => {
    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero">
                <h1>Welcome to HobbyConnect</h1>
                <p>Find your community. Learn new skills. Share your passion.</p>
                <div className="cta-buttons">
                    <Link to="/register" className="btn btn-primary">Get Started</Link>
                    <Link to="/login" className="btn btn-secondary">Login</Link>
                </div>
            </section>

            {/* Featured Hobbies */}
            <section className="features">
                <h2>Explore Popular Hobbies</h2>
                <div className="hobby-grid">
                    <div className="hobby-card">
                        <img src="/images/painting.jpg" alt="Painting" />
                        <h3>Painting</h3>
                    </div>
                    <div className="hobby-card">
                        <img src="/images/cooking.jpg" alt="Cooking" />
                        <h3>Cooking</h3>
                    </div>
                    <div className="hobby-card">
                        <img src="/images/gaming.jpg" alt="Gaming" />
                        <h3>Gaming</h3>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
