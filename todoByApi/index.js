
const express = require("express");
const { ConnectDB } = require("./config/db.js");
const { router } = require("./routes/router.js");
const { todosModel } = require("./models/TodoModels.js");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",       // for local dev
  "https://my-mern.vercel.app"   // for production
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (React Native, Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy does not allow access from origin: ${origin}`;
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  credentials: true
}));

ConnectDB();

// Health and root endpoints
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "dhukaanTracker API" });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});
// console.log("hello");

// Routes
app.use("/", router);



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
