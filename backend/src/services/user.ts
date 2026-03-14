import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"

import key from "../config/key"
import User from "../models/user"
import validateLoginInput from "../validator/login"
import validateRegisterInput from "../validator/register"

export const register = async (req: Request, res: Response) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const user = await User.findOne({email: req.body.email})

    if (user) {
      return res.status(400).json({email: "Email already exists"})
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })

      const saltRounds = 10
      const salt = await bcrypt.genSalt(saltRounds)
      newUser.password = await bcrypt.hash(newUser.password, salt)

      await newUser.save()
      return res.status(200).json({type: true, result: newUser})
    }
  } catch(err) {
    return res.status(500).json({error: "Server error"})
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body)

    if(!isValid) {
      return res.status(400).json(errors)
    }

    const user = await User.findOne({email: req.body.email})

    if(!user) {
      return res.status(400).json({email: "Email not found"})
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password)

    if(isMatch) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email
      }

      const token = await jwt.sign(payload, key.secretOrKey, {expiresIn: 7200})

      return res.status(200).json({
        type: true,
        result: `Bearer ${token}`
      })  
    } else {
      return res.status(400).json({password: "Password is incorrect"})
    }
  } catch(err) {
    return res.status(500).json({error: "Server error"})
  }
}