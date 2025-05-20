import { useState, useEffect } from 'react';
import { getAnswers, createAnswer, incrementUpvote } from './answers';

export const useAnswers = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnswers = async () => {
    try {
      setLoading(true);
      const data = await getAnswers();
      setAnswers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addAnswer = async (answerText) => {
    try {
      await createAnswer(answerText);
      await fetchAnswers();
    } catch (err) {
      setError(err.message);
    }
  };

  const upvoteAnswer = async (id, currentUpvotes) => {
    try {
      await incrementUpvote(id, currentUpvotes);
      await fetchAnswers();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  return { answers, loading, error, addAnswer, upvoteAnswer };
};