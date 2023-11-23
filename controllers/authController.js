const authService = require("../services/authService");

const getAllUser = async (req, res) => {
  const { nombre } = req.query;
  try {
      const allclientes = await authService.getAllUser({ nombre });
      res.status(200).send({ status: "OK", data: allclientes });
  } catch (error) {
      res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authService.signIn({ username, password });
    res.status(200).send({ status: "OK", data: token });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};



const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const createdUser = await authService.signUp({
      username,
      email,
      password,
    });
    res.send({ status: "OK", data: createdUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
      
  }
};
const updateOneUser = async (req, res) => {
  const {
      body,
      params: { userId },
  } = req;
  if (!userId) {
      res.status(400).send({
          status: "FAILED",
          data: { error: "Parameter ':winnerId' can not be empty" },
      });
  }
  try {
      const updateUser = await authService.updateOneUser(userId, body);
      res.send({ status: "OK", data: updateUser });
  } catch (error) {
      res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};



module.exports = {
  signIn,
  signUp,
  updateOneUser,
  getAllUser
};
