const { User } = require("../models/users.models");


async function getUser() {
  try {
    const clientes = await User.findAll();
    return clientes;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
}
const getOneUser = async (username) => {
  try {
    const user = await User.findOne({ where: { username: username } });
    return user;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const createNewUser = async (newUser) => {
  try {
    const createdUser = await User.create(newUser);
    return createdUser;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneUser = (userId, changes) => {
  try {
      User.update(changes, { where: { id: userId } })
      return User.findOne({ where: { id: userId } })
  } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
  }
};


module.exports = { createNewUser, getOneUser, updateOneUser, getUser};