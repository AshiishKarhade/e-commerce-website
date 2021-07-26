require("dotenv").config();
// Predefined Router
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// My Routers
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");
const stripeRoutes = require("./routes/stripePayment.js");

const PORT = 8000;

// MONGO CONNECTED
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MONGODB is Connected");
  })
  .catch(() => {
    console.log("Error while Connecting to the MONGODB");
  });

// MIDDLEWARE
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser()); // used to put token on the user browser and whenever we need to authenticate a user wheater he is logged in or not then we use express-jwt
app.use(cors());

// MY ROUTES
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);

//LISTINING
app.listen(PORT, () => {
  console.log(`Server Listining to ${PORT}`);
});

// and jsonwebtoken is used to create tokens based on id or email
// then we need to put this token into the user browser wedo that with the help of cookieParser()
//express jwt  will tel  us consantly wheather a user is logged in or not
