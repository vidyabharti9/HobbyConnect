import React, { useState } from 'react';
import './Testimonials.css'; // Make sure you have the necessary styles here

const testimonialsData = [
  {
    id: 1,
    imgSrc: "/images/user1.jpeg",
    text: "This is a great product! I love using it.",
    name: "Katrina Kaif"
  },
  {
    id: 2,
    imgSrc: "/images/user2.jpeg",
    text: "Amazing experience, highly recommend it.",
    name: "Shraddha Kapoor"
  },
  {
    id: 3,
    imgSrc: "/images/user3.jpg",
    text: "Fantastic service, I'll definitely come back again.",
    name: "Zayn Malik"
  },
  {
    id: 4,
    imgSrc: "/images/user4.jpg",
    text: "Best experience ever, I'm so happy!",
    name: "Virat Kohli"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <div className="testimonials-container">
      <div className="testimonial-slider">
        <button className="prev-btn" onClick={goToPrev}>←</button>
        <div className="testimonial">
          <img src={currentTestimonial.imgSrc} alt={`User ${currentTestimonial.id}`} />
          <p>"{currentTestimonial.text}"</p>
          <h4>{currentTestimonial.name}</h4>
        </div>
        <button className="next-btn" onClick={goToNext}>→</button>
      </div>
    </div>
  );
};

export default Testimonials;
