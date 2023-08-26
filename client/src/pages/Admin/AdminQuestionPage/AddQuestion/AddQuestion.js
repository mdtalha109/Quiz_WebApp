import React, { useEffect, useState } from 'react';

import questionService from '../../../../services/questionService'
import topicService from '../../../../services/topicService'

import './AddQuestion.css'
import useAddQuestion from './hooks/useAddQuestion';

const AddQuestion = ({ toggleQuestionForm }) => {

  const {
    topicList,
    selectedTopic,
    setSelectedTopic,
    question,
    setQuestion,
    options,
    handleOptionChange,
    correctAnswer,
    setCorrectAnswers,
    handleAddQuestion,
  } = useAddQuestion({ toggleQuestionForm });

  return (
    <div className="add-question-popup">
      <h2>Add Question</h2>
      <div class="container">
        <label for="selectBox">Select Question Topic:</label>
        <select id="selectBox" name="selectBox" onChange={(e) => { setSelectedTopic(e.target.value) }}>
          {
            topicList && topicList.map((topic) => (
              <option value={topic.name}>{topic.name}</option>
            ))
          }
        </select>
      </div>
      <label>Question</label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div className="options-container">
        <label>Options</label>
        {options.map((option, index) => (
          <div key={index}>
            <input
              className="option-input"
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <label>Enter correct Answer</label>
      <input
        className="correct_ans-input"
        type="text"
        value={correctAnswer}
        onChange={(e) => { setCorrectAnswers(e.target.value) }}


      />

      <button onClick={handleAddQuestion}>Add</button>
    </div>
  );
};

export default AddQuestion;
