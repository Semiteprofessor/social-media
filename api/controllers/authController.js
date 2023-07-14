const { User } = require("../model");
const bcrypt = require("bcrypt");
const { createError } = require("../util/error");
const { validateResult, check } = require("express-validator");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res, next) => {
  try {
    const errors = validateResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const avatar = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    const { surname, othernames, username, email, password, phone, about_me } =
      req.body;

    const alreadyExist = await User.findAll({
      attributes: ["email", "phone"],
      where: { [Op.or]: [{ email: email, phone: phone }] },
    });
    if (alreadyExist.length > 0) {
      return next(createError(400, "User already exist"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userID = uuidv4();

    const newUser = await User.create({
      user_id: userID,
      surname,
      othernames,
      username,
      email,
      password: hash,
      phone,
      image: avatar,
      about_me,
    });

    res.status(200).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to create user",
      error,
    });
  }
};

const register = async (req, res) => {
  try {
    const avatar = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    const { surname, othernames, username, email, password, about_me } =
      req.body;

    if (!surname || !othernames || !username || !email || !password) {
      return next(createError(403, "Invalid credentials"));
    }

    const userID = uuidv4();

    const newUser = await User.create({
      user_id: userID,
      surname,
      othernames,
      username,
      email,
      password: hash,
      image: avatar,
      about_me,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = {
        id: User.user_id,
        username: User.username,
      };
      res.status(200).json({
        status: "success",
        message: "User created successfully",
        data: newUser,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the user",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign({ id: user.user_id }, process.env.JWT);

    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        status: "euccess",
        message: "Login successful",
        details: { ...otherDetails },
      });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      raw: true,
      where: { email: req.body.email },
    });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      next(createError(400, "Password not valid"));
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = {
        id: user.user_id,
        username: user.username,
      };
      res.json({
        status: "success",
        message: "Login successful",
      });
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Login failed",
      error,
    });
  }
};

const logoutUser = (req, res) => {
  if (req.session.loggedin) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(403).end();
  }
};

export { registerUser, register, loginUser, login, logoutUser };
