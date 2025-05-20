import { useState } from 'react';

const AnswerForm = ({ onSubmit }) => {
  const [answerText, setAnswerText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answerText.trim()) return;
    onSubmit(answerText);
    setAnswerText('');
  };

  return (
    <form onSubmit={handleSubmit} className="answer-form">
      <input
        type="text"
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        placeholder="Your answer..."
        required
      />
      <button type="submit">Submit Answer</button>
    </form>
  );
};

export default AnswerForm;