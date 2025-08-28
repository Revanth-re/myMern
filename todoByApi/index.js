
// const express = require("express");
// const { ConnectDB } = require("./config/db.js");
// const { router } = require("./routes/router.js");
// const {todosModel}=require("./models/TodoModels.js")
// // const {Port}=require("./controllers/todoControl.js")
// // const {router}=require("./routes/router.js")
// const cors=require("cors");
// // const { expiryDateHandler,getAllProducts, getOne, addProducts, updateTodos ,updateDecrease, deletetodos,MoreDetails} = require("./controllers/todoControl.js");
// console.log(cors());

// const app = express();

// app.use(express.json({ limit: "10mb" })); 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // CORS configuration for production
// // const cors = require('cors');

// app.use(cors({
//   origin: 'https://track-one-sepia.vercel.app', // for dev, or use your deployed frontend URL in prod
//   methods: ['GET','POST','PUT','DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type','Authorization']
// }));

// // Handle OPTIONS preflight
// app.options('*', cors());

// // Allow common host patterns in addition to explicit list

// ConnectDB();

// // Health and root endpoints
// app.get("/", (req, res) => {
//   res.json({ status: "ok", service: "dhukaanTracker API" });
// });
// app.get("/health", (req, res) => {
//   res.json({ status: "healthy" });
// });

// app.use("/",router)
// // app.get("/api/getAll",getAllProducts)

// // app.post("/api/products", addProducts)

// //     app.put("/api/update/:id", updateTodos)

// //     app.put("/api/updateDec/:id",updateDecrease)

// //     app.delete(`/api/delete/:id`,deletetodos)

// //     app.get("/api/MoreDetails/:id",MoreDetails)

// // app.get("/api/MoreDetails/:id",getOne)

// // app.put("/api/expiryItems",expiryDateHandler)

// // Start server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`🚀 Server started on port ${port}`);
// });

const express = require("express");
const { ConnectDB } = require("./config/db.js");
const { router } = require("./routes/router.js");
const { todosModel } = require("./models/TodoModels.js");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ CORS configuration
app.use(cors({
  origin: 'https://track-one-sepia.vercel.app', // change if needed for dev
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

ConnectDB();

// Health and root endpoints
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "dhukaanTracker API" });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// Routes
app.use("/", router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
