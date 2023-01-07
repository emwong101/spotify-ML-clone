const path = require("node:path");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const usersRoutes = require("./routes/usersRouter");
app.use("/user", usersRoutes);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});
