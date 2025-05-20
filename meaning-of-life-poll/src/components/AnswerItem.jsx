
const AnswerItem = ({ answer, onUpvote }) => {
  return (
    <li className="answer-item">
      <p className="answer-text">
        <strong>Answer:</strong> {answer.Answer}
      </p>
      <div className="upvote-section">
        <span className="upvote-count">{answer.Upvotes}</span>
        <button 
          onClick={() => onUpvote(answer.id, answer.Upvotes)}
          className="upvote-button"
        >
          Upvote
        </button>
      </div>
    </li>
  );
};

export default AnswerItem;