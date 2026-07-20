const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const {
        name,
        email,
        password,
        flatNumber,
        familyMembers,
    
      } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        flatNumber,
        familyMembers,
        password: hashedPassword,
        role: "resident",
        status: "Pending",
      });
    res.status(201).json({
      message: "User Registered Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
    if (user.role === "resident" && user.status !== "Approved") {
      return res.status(403).json({
        message: "Your account is pending admin approval.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      flatNumber: user.flatNumber,
      role: user.role,
      status: user.status,
    },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};