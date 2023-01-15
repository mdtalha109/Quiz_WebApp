import Questions from "./Questions"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { nextQuestion, prevQuestion } from "../redux/question_reducer"

export default function Quiz(){

    const dispatch = useDispatch()

    const state = useSelector(state => state)

    useEffect(()=> {
        console.log(state)
    })

    const onNext = () => {

        if(state.questions.queue.length === state.questions.trace + 1){
            alert("No next question");
            return
        }
        
        dispatch(nextQuestion())
    }

    const onPrev = () => {
        if(state.questions.trace < 1){
            alert("No prev question");
            return
        }
        dispatch(prevQuestion())
    }

    return (
        <div className="container">
            <h1 className="title text-light">Quiz Application</h1>

            {/* Questions component */}
            <Questions/>

            <div clsssName='grid'>
                <button className="btn prev" onClick={onPrev}>Prev</button>
                <button className="btn next" onClick={onNext}>Next</button>
            </div>
        </div>
    )
}