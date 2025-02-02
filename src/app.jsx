import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; // Use HashRouter
import "./app.css";

function App() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = dayjs("2029-01-20T12:00:00Z"); // Inauguration Day 2029

  useEffect(() => {
    const fetchCountdown = () => {
      const now = dayjs();
      const timeDifference = targetDate.diff(now);

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    // Update the countdown every second
    const interval = setInterval(fetchCountdown, 1000);

    // Initial fetch
    fetchCountdown();

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <Router>
      <div className="App">
        <h1>Countdown to Inauguration Day 2029</h1>
        <div className="countdown">
          <div className="countdown-item">
            <span className="countdown-number">{countdown.days}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{countdown.hours}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{countdown.minutes}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{countdown.seconds}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;