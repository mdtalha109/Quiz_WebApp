import axiosInstance from "./configs/axiosInstance";

const questionService = {

  createQuestion: async (question, options, correctAnswer, topicName) => {
    try {
      const response = await axiosInstance.post('/question', { question, options, correctAnswer, topicName });
      return response.data;
    } catch (error) {
      console.error("Error in creating question:", error);
      return [];
    }
  }
}

export default questionService

