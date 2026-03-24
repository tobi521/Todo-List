import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../models/user.model"
import validateLoginInput from "../validator/login"
import validateRegisterInput from "../validator/register"

export const register = 
async (
  body: { 
    name: string, 
    email: string, 
    password: string, 
    confirmPassword: string,
    isAdmin: boolean
  }
) => {
  const { errors, isValid } = validateRegisterInput(body)
  const { name, email, password, isAdmin } = body

  if (!isValid) {
    return { type: false, result: errors }
  }

  const user = await User.findOne({email: email})

  if (user) {
    return { type: false, result: {email: "Email already exists"} }
  } else {
    const newUser = new User({
      name: name,
      email: email,
      password: password,
      isAdmin: isAdmin
    })

    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    newUser.password = await bcrypt.hash(newUser.password, salt)

    await newUser.save()
    return { type: true, result: "User registered successfully" }
  }
}

export const login = 
async (
  body: { 
    email: string; 
    password: string 
  }
) => {
  const { errors, isValid } = validateLoginInput(body)
  const { email, password } = body

  if(!isValid) {
    return { type: false, result: errors }
  }

  const user = await User.findOne({email: email})

  if(!user) {
    return { 
      type: false, 
      result: {
        email: "Email not found"
      } 
    }
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(isMatch) {
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }

    const token = await jwt.sign(payload, process.env.SECRET_OR_KEY as string, {expiresIn: 7200})

    return { type: true, result: `Bearer ${token}` }
  } else {
    return { type: false, result: { password: "Password is incorrect" } }
  }
}
