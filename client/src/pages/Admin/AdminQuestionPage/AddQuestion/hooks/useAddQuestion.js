import React, { useEffect, useState } from 'react';
import questionService from '../../../../../services/questionService';
import topicService from '../../../../../services/topicService';

// Custom hook for handling logic
const useAddQuestion = ({ toggleQuestionForm, editableQuestion, setQuestionsList }) => {
  const [topicList, setTopicList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswers] = useState([]);

  console.log('editableQuestion: ', editableQuestion)

  useEffect(() => {
    const fetchAllTopic = async () => {
      const fetchedTopicList = await topicService.getTopic();
      if (fetchedTopicList) {
        setTopicList(fetchedTopicList);
      }
    };

    fetchAllTopic();
  }, []);

  useEffect(() => {
    if (editableQuestion) {
      setSelectedTopic(editableQuestion.topic);
      setQuestion(editableQuestion.question);
      setOptions(editableQuestion.options);
      setCorrectAnswers(editableQuestion.correctAnswer);
    }
  }, [editableQuestion]);

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

  const handleupdateQuestion = async () => {
    if (!question || !options || !correctAnswer || !selectedTopic) {
      return alert('All fields are required');
    }

    const createdQuestion = await questionService.updateQuestion(
      editableQuestion._id,
      question,
      options,
      correctAnswer,
      selectedTopic
    );

    if (createdQuestion) {
      alert('Question updated successfully');
      setQuestionsList((prevQuestion) =>
        prevQuestion.map((question_item) =>
          question_item._id === editableQuestion._id ? { ...question_item, question: question } : question_item
        )
      );
      toggleQuestionForm(editableQuestion._id);
    }
  }

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
    handleupdateQuestion
  };
};

export default useAddQuestion;

