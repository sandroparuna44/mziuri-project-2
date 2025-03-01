import React from "react";
import "./App.css";

const stories = [
  { text: "The Weirdest Day at School", color: "#FF5733" },
  { text: "Adventure in the Amazon Jungle", color: "#28A745" },
  { text: "Fantasy and Imagination", color: "#007BFF" },
  { text: "The Birthday Plan", color: "#A833FF" },
  { text: "A Rainy Day", color: "#DC3545" },
  { text: "The Princess", color: "#FF7F27" },
  { text: "Cooking Show", color: "#28A745" },
  { text: "A Haunted House Visit", color: "#002766" },
  { text: "My Superpower", color: "#9C27B0" },
  { text: "The Movie Premiere", color: "#E63946" },
  { text: "The Day Everything Went Backward", color: "#FF5733" },
];

const MadLibs = () => {
  return (
    <div className="container">
      <h1 className="title">Mad Libs!</h1>
      <h2 className="subtitle">Choose a Story</h2>
      <div className="stories-grid">
        {stories.map((story, index) => (
          <button
            key={index}
            className="story-button"
            style={{ backgroundColor: story.color }}
          >
            {story.text.toUpperCase()}
          </button>
        ))}
      </div>
      <h2>------</h2>
      <div className="input-section">
        <h3 className="input-title">Go Mad! Fill in the Blank Fields Below</h3>
        <div className="input-grid">
          <input className="input-field" type="text" placeholder="Enter a verb" />
          <input className="input-field" type="text" placeholder="Enter a noun" />
          <input className="input-field" type="text" placeholder="Enter an adjective" />
          <input className="input-field" type="text" placeholder="Enter a place" />
          <input className="input-field" type="text" placeholder="Enter an emotion" />
          <input className="input-field" type="text" placeholder="Enter a name" />
        </div>
        <button className="create-button">Create!</button>
      </div>
    </div>
  );
};

export default MadLibs;