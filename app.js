const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const v1AuthRouter = require("./routes/authRoutes");
const sequelize = require('./database/sequelize.config.js');
const app = express();

app.use(express.json());

const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/auth", v1AuthRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});