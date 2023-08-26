import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './QuestionTable.css';
import questionService from '../../../../services/questionService';
import AddQuestion from '../AddQuestion/AddQuestion';

const QuestionTable = () => {
  const [questionsList, setQuestionsList] = useState([]);
  const [editModeMap, setEditModeMap] = useState({});
  const [editableQuestion, setEditableQuestion] = useState(null);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      let allQuestions = await questionService.getAllQuestions();
      setQuestionsList(allQuestions);

      const initialEditModeMap = {};
      allQuestions.forEach((topic) => {
        initialEditModeMap[topic._id] = false;
      });
      setEditModeMap(initialEditModeMap);
    };
    fetchAllQuestions();
  }, []);

  const handleEditClick = (topicId) => {
    setEditModeMap((prevEditModeMap) => ({
      ...prevEditModeMap,
      [topicId]: true,
    }));
    const questionToEdit = questionsList.find((question) => question._id === topicId);
    setEditableQuestion(questionToEdit); // Set the editable question
  };

  const handleCancelClick = (quiestionId) => {
    setEditModeMap((prevEditModeMap) => ({
      ...prevEditModeMap,
      [quiestionId]: false,
    }));
  }

  const handleDeleteClick = async(quiestionId) => {
    const deltedQuestion = await questionService.deleteQuestion(quiestionId)
    if(deltedQuestion){
      alert('qustion deleted successfully')
      let updatedList = questionsList.filter((item) => item._id != quiestionId)
      setQuestionsList(updatedList)
      
    }

  }

  return (
    <TableContainer component={Paper} className='topic-table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Questions</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questionsList &&
            questionsList.map((row) =>
              editModeMap[row._id] ? (
                <AddQuestion
                  key={row._id}
                  editableQuestion={editableQuestion}
                  toggleQuestionForm = {handleCancelClick}
                  setQuestionsList={setQuestionsList}
                />
              ) : (
                <TableRow key={row._id}>
                  <TableCell align='left'>{row.question}</TableCell>
                  <TableCell align='right' className='topic-table-row-action'>
                    <span
                      className='span-edit'
                      onClick={() => {
                        handleEditClick(row._id);
                      }}
                    >
                      Edit
                    </span>
                    <span className='span-delete' onClick={()=>handleDeleteClick(row._id)}>Delete</span>
                  </TableCell>
                </TableRow>
              )
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuestionTable;
