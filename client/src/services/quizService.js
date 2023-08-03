import axiosInstance from "./configs/axiosInstance";


const QuizService = {

  fetchQuizTopicList: async() => {
    try {
      const response = await axiosInstance.get('/quiz/get-topic');
      return response.data;
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      return [];
    }
  },

  createQuiz : async(selectedQuizTopic) => {
    try {
      const response = await axiosInstance.post('/quiz', {topic: selectedQuizTopic});
      return response.data;
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      return [];
    }
  },

  fetchQuiz : async(quizId) => {
    try {
      const response = await axiosInstance.post(`/quiz/get-quiz/${quizId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      return [];
    }
  }

  
};

export default QuizService;