import userModel from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find({}, {password: 0});
    res.status(202).json(allUsers);
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const {password, ...remainingUserData} = user._doc;
    res.status(200).json(remainingUserData);
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send(`user with id ${req.params.id} deleted`);
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  res.locals.createdUserState = user;
  if (req.body.isAdmin) {
    try {
      const user = await userModel.findById(req.params.id);
      
      if (!user.isAdmin) {
        res.status(403).send("You can't make yourself an admin");
      }
    } catch (error) {
      console.error(error);
    }
  }
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    next();
  } catch (error) {
    console.error(error);
  }
};