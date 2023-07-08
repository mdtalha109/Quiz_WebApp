import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import data from '../data/data'
import { useFetchQuestion } from '../hooks/FetchQuestion'



const Questions = ({onChecked}) => {

    const [checked, setChecked] = useState(undefined)
    const [{isLoading, apiData, serverError}] = useFetchQuestion()

    const {questions} = useSelector(state => state)
    let trace = questions.trace

    const question = questions.queue[trace]

   

    useEffect(()=> {
        
    }, [])

    const onSelect = (index) => {
        setChecked(true)
         //console.log("Selected: ", index)
         onChecked(index)
        
    }

    if(isLoading) return <h3>Loading...</h3>

    return (
        <>
          <div className="questions">
            <h2 className="text-light">{question && question.question}</h2>
            <ul key={question && question.id}>
             
              {question && question.options.map((option, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    value={option}
                    name="options"
                    id={`q${index}-options`}
                    onChange={()=> onSelect(index)}
                  />
                  <label className="text-primary" htmlFor={`q${index}-options`}>
                    {option}
                  </label>
                  
                  <div className="check"></div>
                </li>
              ))}
            </ul>
          </div>
        </>
      );
      
}

export default Questions