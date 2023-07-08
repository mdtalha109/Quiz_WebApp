import { combineReducers, configureStore } from '@reduxjs/toolkit';
import questionReducer from './question_reducer'; // Update import statement
import resultReducer from './result_reducer'; // Update import statement

const rootReducer = combineReducers({
  questions: questionReducer,
  results: resultReducer // Assuming you have a resultReducer file and want to combine it as well
});

// create store with rootReducer
export default configureStore({
  reducer: rootReducer
});