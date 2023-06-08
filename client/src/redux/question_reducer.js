

import { createSlice } from "@reduxjs/toolkit";

// create reducer with initial property: createSlice
export const questionReducer = createSlice({
    name: 'questions',
    initialState: {
        queue: [],
        answers: [],
        trace: 0
    },
    reducers: {
        startExamAction: (state, action) => {

            return {
                ...state,
                queue: action.payload
            };
        },

        nextQuestion: (state, action) => {
            return {
                ...state, trace: state.trace + 1
            }
        },

        prevQuestion: (state, action) => {
            return { ...state, trace: state.trace - 1 }
        },

        resetAllAction: (state, action) => {
            return {
                queue: [],
                answers: [],
                trace: 0
            }
        }
    }
});

export const { startExamAction, nextQuestion, prevQuestion, resetAllAction } = questionReducer.actions;
export default questionReducer.reducer;
