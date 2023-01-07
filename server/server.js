const path = require("node:path");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const express = require("express");
const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());

const usersRoutes = require("./routes/usersRouter");
server.use("/user", usersRoutes);

const PORT = process.env.PORT || 5500;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});
