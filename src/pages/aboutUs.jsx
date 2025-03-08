import React from "react";
import "./AboutUs.css"; // Import the CSS file for styling
import backup from "../assets/backup.jpg"; // Import a backup image
import abiram from "../assets/abiram.jpg"; // Import an image
import Nithusan from "../assets/Nithusan.jpg"; // Import an image
import kanga from "../assets/kanga.jpeg"; // Import an image

const AboutUs = () => {
  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: " R ABIRAM",
      job: "Backend Developer",
      image: `${abiram}`, // Replace with actual image URL
    },
    {
      id: 2,
      name: "B NITHUSAN",
      job: "Backend Developer",
      image: `${Nithusan}`, // Replace with actual image URL
    },
    {
      id: 3,
      name: "K KANGASUTHAN",
      job: "Frontend Developer",
      image: `${kanga}`, // Replace with actual image URL
    },
  ];

  return (
    <div className="about-us-container">
        <div className="about-us-description">
        <h1>About CineHolic</h1>
      <p>
        Welcome to <strong>CineHolic</strong>, your go-to platform for discovering and reviewing movies!
        We provide honest reviews, ratings, and personalized recommendations to help you choose the best films.
      </p>

      <h1>Our Mission</h1>
      <p>
        Our mission is to create a movie-loving community where users can share their thoughts, explore 
        trending movies, and get recommendations based on their preferences.
      </p>

      <h1>About Us</h1>
      <p>
        Meet the talented team behind our success. We are passionate about what we do and strive to deliver the best
        results for our clients.
      </p>
      </div>
      <div className="team-members">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card">
            <img src={member.image} alt={member.name} className="team-member-image" />
            <h2 className="team-member-name">{member.name}</h2>
            <p className="team-member-job">{member.job}</p>
          </div>
        ))}
      </div>
      <div>
        <h1 style={{color: '#666'}}>Contact Us</h1>
       <p> <a href="support@cineholic.com">Email: support@cineholic.com</a> </p>
        <p>Follow us on social media for updates!</p>
      </div>
    </div>
  );
};

export default AboutUs;