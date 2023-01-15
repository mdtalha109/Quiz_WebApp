import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import data from "../data/data";

import * as Actions from '../redux/question_reducer'

export const useFetchQuestion = () => {
    const dispatch = useDispatch()
    const [getData, setGetData] = useState({isLoading: false, apiData: [], serverError: null});

    useEffect(()=> {
        setGetData(prev => ({...prev, isLoading: true}));
        
        /** async funtion to fetch data */
        (async ()=> {
            try{
                let question = data;
                if(question.length > 0){
                    setGetData(prev => ({...prev, isLoading: false}));
                    setGetData(prev => ({...prev, apiData: question}));

                    /** dispatch an action */
                    dispatch(Actions.startExamAction(question))
                } else {
                    // throw new Error("No questions available")
                }
            } catch (err){
                setGetData(prev => ({...prev, isLoading: false}));
                setGetData(prev => ({...prev, serverError: err}));
            }
        })()
    }, [dispatch])

    return [getData, setGetData]
}