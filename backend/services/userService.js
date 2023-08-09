const userModel = require("../models/userModel");

const findUser = async (filter) => {
  try {
    const user = await userModel.findOne(filter);
    return user;
  } catch (error) {
    throw error;
  }
};

const createUser = async (data) => {
  try {
    const user = await userModel.create(data);
    return user;
  } catch (error) {
    throw error;
  }
};

const userService = async () => {
  try {
    const users = await userModel.find();
    return users;
  } catch (error) {
    throw error;
  }
};


const updateUser = async (userId, newData) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, newData, { new: true });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};



module.exports = { findUser, createUser, userService, updateUser };
