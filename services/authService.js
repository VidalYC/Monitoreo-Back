const dotenv = require("dotenv");
const User = require("../database/Users");
const jwt = require("jsonwebtoken");
const Users = require('../models/users.models');
const Util = require('../utils/Index');

dotenv.config();

const signIn = async (params) => {
  try {
    const user = await User.getOneUser(params.username);
    if (!user) {
      throw new Error("User does not exist!");
    } else {
      if (user.password !== params.password) {
        throw new Error("Password does not match!");
      } else {
        // Crear un objeto personalizado sin incluir la contraseña
        const userWithoutPassword = {
          id: user.id,
          username: user.username,
          // Puedes incluir más información según tus necesidades
        };

        // Generar el token utilizando el nuevo objeto
        const token = jwt.sign({ user: userWithoutPassword }, process.env.JWT_SECRET);

        return { userId: user.id, username: user.username, token };
      }
    }
  } catch (error) {
    throw error;
  }
};

const signUp = async (params) => {
  try {
    const user = await User.createNewUser(params);
    return user;
  } catch (error) {
    throw error;
  }
};

const updateOneUser = async (userId, changes) => {
  try {
    const updateUser = await User.updateOneUser(userId, changes);
    return updateUser;
  } catch (error) {
    throw error;
  }
};

const getAllUser = async (filterParams) => {
  try {
    
    const allClientes = await User.getUser(filterParams);
    return allClientes;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  signIn,
  signUp,
  updateOneUser,
  getAllUser
};