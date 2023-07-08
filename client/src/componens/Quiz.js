import Questions from "./Questions"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { nextQuestion, prevQuestion } from "../redux/question_reducer"
import { pushAnswer } from "../hooks/setResult"
import { useNavigate } from 'react-router-dom';


import Confetti from 'react-confetti'


export default function Quiz() {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(undefined)

    // const { width, height } = useWindowSize()
    const width = window.innerWidth
    const height = window.innerHeight
    const dispatch = useDispatch()

    const { questions, results } = useSelector(state => state)
    console.log(questions)
    // console.log("results: ", results)

    // let trace = questions.trace



    useEffect(() => {

    })

    const onNext = () => {
        // alert(`questions.trace is ${questions.trace} and `)
        if (questions.trace === questions.queue.length - 1) {
            alert("No next question");
            return
        }

        dispatch(nextQuestion())
        dispatch(pushAnswer(checked))
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
        setChecked(undefined)
    }

    // check if user reached last question, then exam has to be ended and user should be navigated to result page
    console.log(`questions.queue.length is ${questions.queue.length} and trace is ${questions.trace}`)
    if(questions && questions.queue.length-1 === questions.trace){
        alert('inside')
        navigate('/result')
    }


    return (
        <div className="container">
            {/* <Confetti
      width={width}
      height={height}
      drawShape
      
    /> */}
            <h1 className="title text-light">Quiz Application</h1>

            {/* Questions component */}
            
            <Questions onChecked = {onChecked} />
            <div clsssName='grid'>
                <button className="btn prev" onClick={onPrev} disabled={questions.trace <= 0}>Prev</button>
                <button className="btn next" onClick={onNext}>Next</button>
            </div>
        </div>
    )
}