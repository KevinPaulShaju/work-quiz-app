const User = require("../model/User");
const userValidator = require("../services/validation");
const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.registerHandler = async (req, res) => {
  // Joi validation
  const { error } = userValidator(req.body);
  const { name, email, gender, password, password2 } = req.body;
  if (error) {
    return res.status(400).json({ mssg: error.details[0].message });
  }

  //   password double check(not joi)
  if (password !== password2) {
    return res.status(400).json({ mssg: "Passwords do not match" });
  }
  //   all validations passed
  else {
    try {
      // check if the email is already registered
      const existingUser = await User.findOne({ email: email }).populate(
        "userid"
      );
      if (existingUser) {
        return res.json({ message: "User already exists. Try Logging In" });
      }
      //   adding new user
      else {
        let newUser = new User({
          name,
          gender,
          email,
          password,
        });

        // hash password
        const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err);
            resolve(hash);
          });
        });
        newUser.password = hashedPassword;
        const savedUser = await newUser.save();
        res.json(savedUser);
        // res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

exports.loginHandler = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    // failureFlash: true,
  })(req, res, next);
};

exports.logoutHandler = (req, res) => {
  req.logout();
  res.redirect("/login");
};
