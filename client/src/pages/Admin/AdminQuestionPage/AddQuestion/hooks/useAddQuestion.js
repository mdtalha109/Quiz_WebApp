import React, { useEffect, useState } from 'react';
import questionService from '../../../../../services/questionService';
import topicService from '../../../../../services/topicService';

// Custom hook for handling logic
const useAddQuestion = ({ toggleQuestionForm }) => {
  const [topicList, setTopicList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswers] = useState([]);

  useEffect(() => {
    const fetchAllTopic = async () => {
      const fetchedTopicList = await topicService.getTopic();
      if (fetchedTopicList) {
        setTopicList(fetchedTopicList);
      }
    };

    fetchAllTopic();
  }, []);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddQuestion = async () => {
    if (!question || !options || !correctAnswer || !selectedTopic) {
      return alert('All fields are required');
    }
    const createdQuestion = await questionService.createQuestion(
      question,
      options,
      correctAnswer,
      selectedTopic
    );
    if (createdQuestion) {
      alert('Question created successfully');
      toggleQuestionForm();
    }
  };

  return {
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
  };
};

export default useAddQuestion;

