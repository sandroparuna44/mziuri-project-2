import React, { useState } from "react";
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

const storyTitles = stories.map((story) => story.text);

const MadLibs = () => {

  const [form, setForm] = useState({
    topic: "",
    verb: "",
    noun: "",
    adjective: "",
    place: "",
    emotion: "",
    name: "",
  });

  const [errors, setErrors] = useState({});


  const [generatedText, setGeneratedText] = useState("");

  // ბულეანი  რომელიც გვიჩვენებს იმას თუ დასრულდა თუ არა ფორმის შევსება
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ვალიდაციები თითოეული ველისთის
  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = "Required field"; 
    } else {
      switch (name) {
        case "topic":
          if (!storyTitles.includes(value)) error = "Invalid topic selection"; 
          break;
        case "verb":
        case "noun":
        case "adjective":
        case "place":
        case "name":
          if (value.length < 3 || value.length > 20)
            error = "Must be 3-20 characters"; 
          break;
        case "emotion":
          if (value.length < 3 || value.length > 15)
            error = "Must be 3-15 characters"; 
          break;
        default:
          break;
      }
    }
    return error;
  };

  // ფუნქცია რომელიც ამუშავებს ველის ცვლილებას
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) }); // შეცდომებს ამოწმებს
  };

  // ამოწმებს იმას თუ არის თუ არა სწორად შევსებული
  const isFormValid =
    Object.values(errors).every((error) => error === "") &&
    Object.values(form).every((value) => value.trim() !== "");

  // ფუნქცია აგზავნის მონაცემებს apiზე
  const handleSubmit = async () => {
    if (!isFormValid) return; // თუ ფორმა არასწორია ფუნქცია შეჩერდება და ერრორი ვარდება

    try {
      const response = await fetch("https://api.abcd.ge/mad-libs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setGeneratedText(data.text); 
      setIsSubmitted(true); 
    } catch (error) {
      console.error("Error generating text:", error);
    }
  };

  //ეს ფუნქცია ასუფთავებს ფორმას და აბრუნებს საწყის მდგომარეობას
  const handleReset = () => {
    setForm({
      topic: "",
      verb: "",
      noun: "",
      adjective: "",
      place: "",
      emotion: "",
      name: "",
    });
    setGeneratedText(""); 
    setIsSubmitted(false); // ახლიდან დაწყება
  };

  return (
    <div className="container">
      <h1 className="title">Mad Libs!</h1>

      {isSubmitted ? (
        // ტექსტი გამოაქ თეთრი ფონტით
        <div className="result">
          <h2>{form.topic.toUpperCase()}</h2>
          <p className="generated-text">
            {generatedText.split(" ").map((word, index) => {
              const cleanWord = word.replace(/[.,!?]/g, ""); // ეს ფუნქცია აშორებს წერტილს მძიმეს და ა.შ
              return (
                <span
                  key={index}
                  className={Object.values(form).includes(cleanWord) ? "highlight" : ""}
                >
                  {word}{" "}
                </span>
              );
            })}
          </p>
          <button className="try-again-button" onClick={handleReset}>
            TRY AGAIN!
          </button>
        </div>
      ) : (
        <>
          <h2 className="subtitle">Choose a Story</h2>
          <div className="stories-grid">
            {stories.map((story, index) => (
              <button
                key={index}
                className="story-button"
                style={{ backgroundColor: story.color }}
                onClick={() => setForm({ ...form, topic: story.text })}
              >
                {story.text.toUpperCase()}
              </button>
            ))}
          </div>

          <h2>------</h2>

          <div className="input-section">
            <h3 className="input-title">Go Mad! Fill in the Blank Fields Below</h3>

            <div className="input-grid">
              {Object.keys(form).map((key, index) => (
                <div key={index} className="input-wrapper">
                  <input
                    className="input-field"
                    type="text"
                    name={key}
                    placeholder={`Enter a ${key}`}
                    value={form[key]}
                    onChange={handleChange}
                  />
                  {errors[key] && <span className="error-message">{errors[key]}</span>}
                </div>
              ))}
            </div>

            <button className="create-button" disabled={!isFormValid} onClick={handleSubmit}>
              Create!
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MadLibs;
