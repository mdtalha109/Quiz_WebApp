import { combineReducers, configureStore } from '@reduxjs/toolkit';
import questionReducer from './question_reducer';  
import resultReducer from './result_reducer'; 
import userReducer from './user_reducer';
import quiz_reducer from './quiz_reducer';

const rootReducer = combineReducers({
  questions: questionReducer,
  results: resultReducer,
  user: userReducer,
  quiz: quiz_reducer
});

export default configureStore({
  reducer: rootReducer
});