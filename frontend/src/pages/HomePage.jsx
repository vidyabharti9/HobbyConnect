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
          {/* First Row of Hobby Cards */}
          <div className="hobby-card">
            <img src="/images/painting.png" alt="Painting" />
            <h3>Painting</h3>
            <p>Express your creativity and learn new techniques in painting.</p>
          </div>
          <div className="hobby-card">
            <img src="/images/cooking.png" alt="Cooking" />
            <h3>Cooking</h3>
            <p>Discover new recipes and improve your culinary skills.</p>
          </div>
          <div className="hobby-card">
            <img src="/images/gaming.png" alt="Gaming" />
            <h3>Gaming</h3>
            <p>Join the gaming community and explore new virtual worlds.</p>
          </div>
          <div className="hobby-card">
            <img src="/images/photography.jpg" alt="Photography" />
            <h3>Photography</h3>
            <p>Capture the beauty of the world through your lens.</p>
          </div>
        </div>

        <div className="hobby-grid">
          {/* Second Row of Hobby Cards */}
          <div className="hobby-card">
            <img src="/images/music.jpg" alt="Music" />
            <h3>Music</h3>
            <p>Learn to play an instrument and share your passion for music.</p>
          </div>
          <div className="hobby-card">
            <img src="/images/dance.jpeg" alt="Dancing" />
            <h3>Dancing</h3>
            <p>Express yourself through dance and rhythm.</p>
          </div>
          <div className="hobby-card">
            <img src="/images/writing.webp" alt="Writing" />
            <h3>Writing</h3>
            <p>Unleash your creativity by writing stories, poems, and more.</p>
          </div>
          <div className="hobby-card">
            <img src="/images/fitness.jpeg" alt="Fitness" />
            <h3>Fitness</h3>
            <p>Stay healthy and improve your fitness with a variety of exercises.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
