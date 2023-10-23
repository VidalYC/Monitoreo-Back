const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require('../database/Users');

dotenv.config();

const checkAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Acceso no autorizado!",
    });
  } else {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // Supongamos que el token contiene el ID del usuario (payload.userId)
      const userId = payload.userId;

   
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(401).json({
          message: "Usuario no encontrado!",
        });
      }
      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "El token es inválido o ha caducado!",
        error,
      });
    }
  }
};

module.exports = { checkAuth };