const passport = require("passport");
const localStrategy = require("passport-local");
const Person = require("./models/Person");

passport.use(
  new localStrategy(async (uname, password, done) => {
    // auth Locgic
    try {
      console.log("Resived Uname & PWD", uname, password);
      const user = await Person.findOne({ username: uname });
      if (!user)
        return done(null, false, {
          message: "Incorrect Username Or Password!",
        });
      //   // for non encrypt password
      //   const isPasswordMatch = user.password === password ? true : false;

      // for encript password
    //   console.log(user)
      const isPasswordMatch = await user.comparePassword(password);

      if (isPasswordMatch) return done(null, user);
      else
        return done(null, false, {
          message: "Incorrect Userneme or Password!",
        });
    } catch (err) {
      console.log(err);
      return done(err);
    }
  })
);
module.exports = passport;
