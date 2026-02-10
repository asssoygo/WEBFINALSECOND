const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./app/config/db.config");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

/* ===== API ROUTES ===== */
app.use("/api/auth", require("./app/routes/auth.routes"));
app.use("/api/users", require("./app/routes/user.routes"));
app.use("/api/tasks", require("./app/routes/task.routes"));

/* ===== FRONTEND ===== */
app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

/* ===== ERROR HANDLER ===== */
app.use(require("./app/middleware/errorHandler"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
