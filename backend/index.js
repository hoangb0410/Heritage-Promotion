const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const heritageRoute = require("./routes/heritage");
const eventRoute = require("./routes/event");
const inquiryRoute = require("./routes/inquiry");
const app = express();

dotenv.config();
const connectToMongo = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to MongoDB");
};

connectToMongo();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/heritage", heritageRoute);
app.use("/v1/event", eventRoute);
app.use("/v1/inquiry", inquiryRoute);
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
