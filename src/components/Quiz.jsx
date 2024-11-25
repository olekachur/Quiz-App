import { useState } from "react";
import completeImg from '../assets/quiz-complete.png';

import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const [userAnswer, setUserAnswer] = useState([]);

    const activeQuestionIndex = userAnswer.length;
    const completedQuizStatus = activeQuestionIndex === QUESTIONS.length;

    if (completedQuizStatus) {
        return <div id="summary">
            <img src={completeImg} alt="Complete quiz image" />
            <h2>Quiz is completed</h2>
        </div>
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    function handleSelectAnswer(answer) {
        setUserAnswer((prevAnswer) => {
            return [...prevAnswer, answer];
        });
    }

    return <div id="quiz">
        <div id="questions">
            <QuestionTimer timeout={10000} onTimeout={() => handleSelectAnswer(null)} />
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <ul id="answers">
                {shuffledAnswers.map((answer) => (
                    <li key={answer} className="answer">
                        <button onClick={() => handleSelectAnswer(answer)}>
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
};
