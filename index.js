const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();

const errorHandler = require("./middleware/error.middleware");
const dbConnection = require("./utils/db.util");

/* custom colors setup */
// colors.setTheme({
//   success: "green",
//   error: "red",
// });

const jobRoute = require("./routes/job.route");
const userRoute = require("./routes/user.route");
const managerRoute = require("./routes/manager.route");

const app = express();
const port = process.env.PORT || 8080;

/* middleware connections */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* router level connections */
app.use("/jobs", jobRoute);
app.use("/user", userRoute);
app.use("/manager", managerRoute);

/* global error handler */
app.use(errorHandler);

/* database connection */
// dbConnection();
mongoose
  .connect(process.env.DB_URI, {
    dbName: "job-portal-assignment",
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Success: MongoDB connected with Mongoose".green.bold.italic);
  })
  .catch((error) => console.log(`Error: ${error.name}`.error.bold));


app.get("/", async (req, res) => {
  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "request is OK",
  });
});


app.listen(port, () => {
  console.log(
    colors.green.italic.bold(`Success: This portal connected on port ${port}`)
  );
});
