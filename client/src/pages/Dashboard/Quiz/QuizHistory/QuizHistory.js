import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Heading from '../../../../components/Shared/Heading/Heading'
import Card from '../../../../components/Shared/Card/Card'


import QuizService from '../../../../services/quizService';
import TableC from '../../../../components/Shared/Table/Table';


const QuizHistory = () => {

  const [quizList, setQuizList] = useState()
  const navigate = useNavigate()

  const tableBodies = [
    `quiz.title`,
    `createdAt`,
    `score`,
    (rowData) => (
      <button variant="contained" color="primary" onClick={() => handleButtonClick(rowData)}>
        View Details
      </button>
    ),

  ];

  const handleButtonClick = (rowData) => {
    navigate(`detail/${rowData._id}`)
  };

  useEffect(() => {
    const getQuizByUser = async () => {
      let quizzes = await QuizService.getQuizByUser()
      console.log('quizzes: ', quizzes)
      setQuizList(quizzes)
    }
    getQuizByUser()
  }, [])

  return (
    <>
      <Heading text='Taken Quiz' />
      <div style={{width: "100%"}}>
      <Card>
        {
          quizList && <TableC data = {quizList} header={['Quiz Name', 'Date', 'Score']} body={tableBodies}
            style={{maxHeight:'90vh'}} showPagination={true}/>
        }
      </Card>
      </div>
    </>
  )
}

export default QuizHistory