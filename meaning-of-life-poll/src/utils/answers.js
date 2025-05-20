import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  orderBy, 
  query 
} from 'firebase/firestore';

const answersCollectionRef = collection(db, "answers");

export const getAnswers = async () => {
  const q = query(answersCollectionRef, orderBy("Upvotes", "desc"));
  const data = await getDocs(q);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const createAnswer = async (answerText) => {
  await addDoc(answersCollectionRef, {
    Answer: answerText,
    Upvotes: 0,
    createdAt: new Date()
  });
};

export const incrementUpvote = async (id, currentUpvotes) => {
  const answerDoc = doc(db, "answers", id);
  await updateDoc(answerDoc, { Upvotes: currentUpvotes + 1 });
};