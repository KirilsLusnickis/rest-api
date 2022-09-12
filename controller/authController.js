import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import  Jwt  from "jsonwebtoken";
import  сookie  from "express-session";

export const createUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new userModel({ ...req.body, password: hash , isAdmin: false});
    await newUser.save();
    res.status(201).send("new user created");
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};

export const loginUser = async (req, res) => {
    try {
      const user = await userModel.findOne({email: req.body.email});

      if (!user) {
        res.status(404).send('User or password is wrong!');
      }

      const isPasswordCorrect =await bcrypt.compare(
        req.body.password,
         user.password
         );

      if (!isPasswordCorrect) {
        res.status(404).send('User or password is wrong!');
      }

      const token = Jwt.sign({id: user._id, isAdmin: user.isAdmin},
         process.env.JWT_SECRET, 
         { expiresIn: '1 day' });
      
      return res

      .cookie("session_token", token, {
        httpOnly: true,
      })
      .status(201)
      .send(`Successfully logged in ${token}`);
    } catch (error) {
      console.error(error);
    }
  };