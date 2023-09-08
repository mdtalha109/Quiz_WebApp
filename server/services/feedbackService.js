import { Feedback } from "../models/feedbackModel";

const createFeedback = async(req, res) => {
    try {
        const { category, message } = req.body;

        const userId = req.user

        if (!['suggestion', 'bug', 'compliment'].includes(category)) {
          return res.status(400).json({ error: 'Invalid category' });
        }

        const feedback = new Feedback({ userId, category, message });

        const savedFeedback = await feedback.save();
    
        res.status(201).json(savedFeedback);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create feedback' });
      }
}

const getFeedback = async(req, res) => {
    try {
        const feedbackList = await Feedback.find();
        res.status(200).json(feedbackList);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch feedback' });
      }
}

const feedbackService = {
    createFeedback,
    getFeedback
  }
  
  export default feedbackService;