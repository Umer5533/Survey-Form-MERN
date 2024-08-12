import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ questionText: '', questionType: '', options: [] });

  useEffect(() => {
    axios.get('http://localhost:3001/questions')
      .then(response => setQuestions(response.data));
  }, []);

  const handleAddQuestion = () => {
    axios.post('http://localhost:3001/questions', newQuestion)
      .then(response => setQuestions([...questions, response.data]));
    setNewQuestion({ questionText: '', questionType: '', options: [] });
  };

  const handleDeleteQuestion = (id) => {
    axios.delete(`http://localhost:3001/questions/${id}`)
      .then(() => setQuestions(questions.filter(q => q._id !== id)));
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <input
        type="text"
        placeholder="Question Text"
        value={newQuestion.questionText}
        onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })}
      />
      <input
        type="text"
        placeholder="Question Type"
        value={newQuestion.questionType}
        onChange={(e) => setNewQuestion({ ...newQuestion, questionType: e.target.value })}
      />
      <button onClick={handleAddQuestion}>Add Question</button>
      <ul>
        {questions.map(q => (
          <li key={q._id}>
            {q.questionText} ({q.questionType})
            <button onClick={() => handleDeleteQuestion(q._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
