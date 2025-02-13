import { useEffect, useState } from "react";
import "./Homepage.css";

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 } // Trigger animation when 50% of the element is in view
    );

    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="hero-section">
      <div className={`hero-content ${isVisible ? "animate" : ""}`}>
        <h1 className="hero-title">Discover the Ultimate Wallpapers</h1>
        <p className="hero-description">
          Thousands of stunning, high-quality wallpapers to personalize your
          devices, from nature to technology. Explore a world of beauty and
          inspiration!
        </p>
        <div className="cta-container">
          <a href="/signup" className="cta-button">
            Get Started
          </a>
          <a href="/dashboard" className="cta-button secondary">
            Browse Wallpapers
          </a>
        </div>
      </div>
      <div className="hero-image-container">
        <img src="image" alt="" className="hero-image" />
      </div>
    </div>
  );
};

export default Homepage;
