import AnswerItem from './AnswerItem';

const AnswerList = ({ answers, onUpvote, loading, error }) => {
  if (loading) return <div>Loading answers...</div>;
  if (error) return <div>Error: {error}</div>;
  if (answers.length === 0) return <div>No answers yet. Be the first to answer!</div>;

  return (
    <ul className="answers-list">
      {answers.map((answer) => (
        <AnswerItem 
          key={answer.id} 
          answer={answer} 
          onUpvote={onUpvote} 
        />
      ))}
    </ul>
  );
};

export default AnswerList;