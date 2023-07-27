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
    
        let isTopicExist = await QuizTopic.find({name: quizTopic})
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

const quizTopicService = {
    createQuizTopic,
    getQuizTopic
}

export default quizTopicService