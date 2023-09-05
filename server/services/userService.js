import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';

const loginUser = async (req, res) => {

  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
}

const registerUser = async (req, res) => {

  const { name, email, password } = req.body

  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('User Already Exists')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
}



const updateUser = async (req, res) => {
  try {
      
      const userId = req.user; 
      const updatedField = req.body;

      const user = await User.findById(userId);

      if (!user) {
          res.status(404);
          throw new Error('User not found');
      }

      for (const key in updatedField) {
          if (Object.hasOwnProperty.call(updatedField, key)) {
              user[key] = updatedField[key];
          }
      }

      await user.save();

      res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id)
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const userService = {
  loginUser,
  registerUser,
  updateUser
};

export default userService;
