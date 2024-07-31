import React, { useState, useEffect } from 'react';

const ExamTimer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-xl font-bold">
      Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default ExamTimer;