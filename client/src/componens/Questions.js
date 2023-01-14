import React, { useEffect, useState } from 'react'
import data from '../data/data'

const Questions = () => {

    const [checked, setChecked] = useState(undefined)

    const question = data[0]

    useEffect(()=> {

    })

    const onSelect = () => {
        setChecked(true)
        alert("radio");
    }

    return(
        <div className="questions">
            <h2 className="text-light">{question.question}</h2>
            <ul key={question.id}>
               {
                question.options.map((question, index) => (
                    <li key={index}>
                    <input 
                        type="radio" 
                        value={false} 
                        name="options"
                        id={`q${index}-options`}
                        onChange={onSelect}
                        
                    />

                    <label className='text-primary' htmlFor={`q${index}-options`}> {question} </label>
                    <div className='check'></div>
                </li>  
                ))
               }              
            </ul>

        </div>
    )
}

export default Questions