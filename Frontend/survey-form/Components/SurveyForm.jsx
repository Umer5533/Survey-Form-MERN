import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SurveyForm = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/questions')
      .then(response => setQuestions(response.data));
  }, []);

  return (
    <div>
      <h1>Survey Form</h1>
      <form>
        {questions.map(q => (
          <div key={q._id}>
            <label>{q.questionText}</label>
            {q.questionType === 'text' && <input type="text" />}
            {q.questionType === 'radio' && q.options.map(option => (
              <div key={option}>
                <input type="radio" name={q._id} value={option} />
                <label>{option}</label>
              </div>
            ))}
            {/* Add other input types as needed */}
          </div>
        ))}
      </form>
    </div>
  );
};

export default SurveyForm;
