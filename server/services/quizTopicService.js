import QuizTopic from '../models/quizTopicModel.js'

/**
 * create new quiz topic.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The success message and created topic
 */

const createQuizTopic = async(req, res) => {
    const {quizTopic} = req.body

    try{
        if(!quizTopic){
            res.status(404).json({message: "topic name is required"})
        }
    
        let isTopicExist = await QuizTopic.findOne({name: quizTopic})
        
        if(isTopicExist){
            res.status(404).json({message: "topic already exist"})
        }

        let createdTopic = await QuizTopic.create({
            name: quizTopic
        })

        if(createdTopic){
            res.status(201).json({"message": "Topic created successfully!"})
        }
    } catch(err){
         res.status(404);
    }
   
}

/**
 * get all quiz topic.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - array of quiz topic list
 */

const getQuizTopic = async(req, res) => {
    try{
        let quizTopicList = await QuizTopic.find()

        if(quizTopicList){
            res.status(200).json(quizTopicList)
        }
    } catch(err){
         res.json({message: "something went wrong"})
    }
}

/**
 * Delete a quiz topic.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The success message after deleting the topic.
 */
 const deleteQuizTopic = async (req, res) => {
    const { topicId } = req.query;

    try {
        console.log("topicId: ", topicId)
        let deletedTopic = await QuizTopic.findByIdAndDelete(topicId);

        if (deletedTopic) {
            res.status(200).json({ message: "Topic deleted successfully!" });
        } else {
            res.status(404).json({ message: "Topic not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

/**
 * Update a quiz topic's name.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The success message after updating the topic.
 */
const updateQuizTopic = async (req, res) => {
    const { topicId, updatedTopicName } = req.body;

    try {
        let updatedTopic = await QuizTopic.findByIdAndUpdate(topicId, { name: updatedTopicName }, { new: true });

        if (updatedTopic) {
            res.status(200).json({ message: "Topic updated successfully!" });
        } else {
            res.status(404).json({ message: "Topic not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const quizTopicService = {
    createQuizTopic,
    getQuizTopic,
    deleteQuizTopic,
    updateQuizTopic
}

export default quizTopicService