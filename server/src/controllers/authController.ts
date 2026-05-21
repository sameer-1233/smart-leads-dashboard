import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "User already exists"
      });

      return;
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d"
      }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "Invalid credentials"
      });

      return;
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      res.status(400).json({
        message: "Invalid credentials"
      });

      return;
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error
    });
  }
};