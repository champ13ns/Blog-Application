import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../model/token.js";

dotenv.config();
export const SignUpUser = async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      username: req.body.username,
      name: req.body.name,
      password: hashedPassword,
    };
    const newUser = new User(user);
    await newUser.save();
    return res.status(200).json({
      message: "signup successfull",
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
};

export const loginUser = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  console.log("user is ", user);
  if (!user) {
    return res.status(400).json({
      msg: "Username doen't exist",
    });
  }
  try {
    let match = await bcrypt.compare(req.body.password, user.password);
    console.log(match);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
        console.log("access Token is ",accessToken);
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SCRET_KEY
      );
      const newToken = new Token({ token: refreshToken });
      await newToken.save();
      return res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      return res.status(400).json({
        msg: "Wrong Password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      msg: "error while loggin in the user",
    });
  }
};
