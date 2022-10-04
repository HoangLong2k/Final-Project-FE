const bcrypt = require("bcryptjs");

const User = require("./usersModel");

module.exports = {
  signUp: async (req, res) => {
    const { username, password } = req.body;
    if (!res.locals.fail) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          username,
          password: hashedPassword,
        });
        await user.save();
        res.send("sign-up-success"._doc);
      } catch (err) {
        console.log(err);
        res.status(500);
        res.render("error", { error: err });
      }
    } else {
      res.render("/", {
        username,
      });
    }
  },
  signIn: async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await User.findOne({ username: username });
    console.log(user);
    if (user === null) {
      res.status(200);
      return res.send("Invalid-username-or-password.");
    }
    const rs = bcrypt.compareSync(password, user.password);
    if (rs === false) {
      return res.send("Invalid-username-or-password.");
    }
    res.send("Sign in success");
  },
};
