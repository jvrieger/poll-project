import './App.css'
import { useEffect, useState } from 'react'
import { fetchAllAnswers, addAnswer, upvoteAnswer } from './utils/answers'

function App() {
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllAnswers();
        setAnswers(data);
      } catch (error) {
        console.error("Failed to fetch answers: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      await addAnswer(newAnswer);
      setNewAnswer('');
      //refresh answers list
      const updatedAnswers = await fetchAllAnswers();
      setAnswers(updatedAnswers);
    } catch (error) {
      console.error("Failed to add answer: ", error);
    }
  };

  const handleUpvote = async (id, currentUpvotes) => {
    try {
      await upvoteAnswer(id, currentUpvotes);
      //refresh answers list
      const updatedAnswers = await fetchAllAnswers();
      setAnswers(updatedAnswers);
    } catch (error) {
      console.error("Failed to upvote: ", error);
    }
  };

  return (
    <div className="app-container">
      <h1>What is the meaning of life?</h1>
      
      <form onSubmit={handleSubmit} className="answer-form">
        <input
          type="text"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Your answer..."
          required
        />
        <button type="submit">Submit Answer</button>
      </form>
      
      <ul className="answers-list">
        {answers.map((answer) => (
          <li key={answer.id} className="answer-item">
            <p className="answer-text">
              <strong>Answer:</strong> {answer.Answer}
            </p>
            <div className="upvote-section">
              <span className="upvote-count">{answer.Upvotes}</span>
              <button 
                onClick={() => handleUpvote(answer.id, answer.Upvotes)}
                className="upvote-button"
              >
                Upvote
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
