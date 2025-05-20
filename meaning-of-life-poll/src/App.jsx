import './App.css';
import { useAnswers } from './utils/useAnswers';
import Header from './components/Header';
import AnswerForm from './components/AnswerForm';
import AnswerList from './components/AnswerList';

function App() {
  const { answers, loading, error, addAnswer, upvoteAnswer } = useAnswers();

  return (
    <div className="app-container">
      <Header />
      <AnswerForm onSubmit={addAnswer} />
      <AnswerList 
        answers={answers} 
        onUpvote={upvoteAnswer}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;