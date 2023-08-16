import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { nextQuestion, prevQuestion } from "../../redux/question_reducer"
import { pushAnswer } from "../../hooks/setResult"




import Questions from '../../components/Question/Question';

import './Quiz.css'
import { useNavigate } from 'react-router-dom'


export default function Quiz() {

    const [checked, setChecked] = useState(undefined)
    const width = window.innerWidth
    const height = window.innerHeight
    const dispatch = useDispatch()

    const urlParts = window.location.pathname.split("/");
    let quizId = urlParts[urlParts.length - 1];

    const navigate = useNavigate()

    const { questions, results } = useSelector(state => state)
    
    

    const onNext = () => {
        
        dispatch(pushAnswer(checked))
        

        if (questions.trace === questions.queue.length - 1) {
            
            navigate(`/result/${quizId}`)
            
            
            return
        }
        dispatch(nextQuestion())
        
    }

    const onPrev = () => {
        if (questions.trace <= 0) {
            alert("No prev question");
            return
        }
        dispatch(prevQuestion())
    }

    const onChecked = (check) => {
        setChecked(check)
        // setChecked(undefined)
    }

    console.log(`questions.queue.length is ${questions.queue.length} and trace is ${questions.trace}`)
    // if (questions && questions.queue.length - 1 === questions.trace) {
    //     alert('inside')
    //     navigate('/result')
    // }


    return (
        <div className="container_quiz">
            <Questions onChecked={onChecked} />
            <div className='navigate_area'>
                <button className="btn prev" onClick={onPrev} disabled={questions.trace == 0}>Prev</button>
                <button className="btn next" onClick={onNext}>{questions.trace === questions.queue.length - 1 ? "Finish": "Next"}</button>
            </div>
        </div>
    )
}