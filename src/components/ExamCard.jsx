import React from 'react';
import { Link } from 'react-router-dom';

const ExamCard = ({ exam }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{exam.title}</h2>
      <p className="text-gray-600 mb-4">Level: {exam.level}</p>
      <Link to={`/exam/${exam._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        View Exam
      </Link>
    </div>
  );
};

export default ExamCard;