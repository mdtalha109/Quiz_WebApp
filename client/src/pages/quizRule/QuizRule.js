import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import QuizService from "../../services/quizService";
import './QuizRule.css'

export default function QuizRule(){

    const navigate = useNavigate()

    const {quiz} = useSelector(state => state)
    const selectedQuizTopic = quiz.selectedQuiz

    const startQuizHandler = async() => {
        console.log("selectedQuizTopic: ", selectedQuizTopic)
        const createdQuizId = await QuizService.createQuiz(selectedQuizTopic)
        navigate(`/quiz/${createdQuizId}`)

    }

    return (
        <div className="container_rule">
            <h1 className="title">Quiz Application</h1>

            <ol>
                <li>You will be asked 10 Questions one after another.</li>
                <li>10 points is awarded for the correct answer</li>
                <li>Each questions have fours options. you can choose only one options.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ol>

            <div className="start">
                <button onClick={startQuizHandler}>Start Quiz</button>
            </div>
        </div>
    )
}