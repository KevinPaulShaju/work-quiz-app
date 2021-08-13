const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const quiz = require("./routes/quiz");
const userRoutes = require("./routes/user");
const connectDB = require("./database/server");

const app = express();

// env config
dotenv.config({ path: "./config/config.env" });

// passport config
require("./services/passport")(passport);

// connect to db
connectDB();

// express sessions
app.use(
  session({ secret: "mySession.Id", resave: true, saveUninitialized: true })
);

// passport middlewares
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || "127.0.0.1";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(quiz);
app.use("/user", userRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Server is up on ${HOST}:${PORT}`);
});
