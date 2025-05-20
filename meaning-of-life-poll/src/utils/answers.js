import { collection, getDocs, addDoc, updateDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "../firebase.js"

const answersCollectionRef = collection(db, "answers");


export const fetchAllAnswers = async () => {
    const q = query(answersCollectionRef, orderBy("Upvotes", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addAnswer = async (newAnswer) => {
    await addDoc(answersCollectionRef, {
        Answer: newAnswer,
        Upvotes: 0
    });
};

export const upvoteAnswer = async (id, currentUpvotes) => {
    const answerDoc = doc(db, "answers", id);
    await updateDoc(answerDoc, { Upvotes: currentUpvotes + 1 });
};

// EXAMPLE RESPONSE - fetchAllAnswers

// [
//     {
//         id: '60xaR2IGiMK9l56r9Qtb',
//         Answer: "To eat",
//         Upvotes: 0,
//     },
//     {
//         id: 'JSPodNwcCwisZ78g7aiG',
//         Answer: "To die",
//         Upvotes: 0,
//     }
// ]