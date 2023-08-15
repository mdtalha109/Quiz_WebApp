import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { setQuizzes, selectQuiz } from '../../redux/quiz_reducer';
import QuizService from '../../services/quizService';



import './HomePage.css'

const HomePage = () => {
    const [quizCategoryList, setQuizCategoryList] = useState()
    const [selectedQuiz, setSelectedQuiz] = useState()
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCategoryClick = (category) => {
        dispatch(selectQuiz(category))
        navigate(`/quiz?category=${category}`)
    }

    useEffect(() => {
        const fetchData = async () => {
            let quizList = await QuizService.fetchQuizTopicList();
            console.log("quizList: ", quizList);
            dispatch(setQuizzes(quizList))
            setQuizCategoryList(quizList)
        };
        fetchData();

        // setQuizCategoryList(['Javascript', 'HTML', 'CSS', 'Typescript', 'SQL', 'Cassandra',
        //     'Rabbitmq', 'Redis'])

    }, []);
   
    

    return (
        <>
            <div className='abc'>
                <h2>Choose the category and check your knowledge</h2>
                <div className="curved-line"></div>
            </div>
            {
                
                <div className="quiz-categories" >
                    
                    {quizCategoryList && quizCategoryList.map((category, index) => (
                        <div className="quiz-category-box" key={index} onClick={() => handleCategoryClick(category.name)} >
                            <h3>{category.name}</h3>
                        </div>
                    ))}
                </div>
            }

        </>
    );

}

export default HomePage