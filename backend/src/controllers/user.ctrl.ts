import { Response, Request } from "express"
import { login, register } from "../services/user.service"

export const loginCtrl = (req: Request, res: Response) => {
  try {
    login(req, res);
  } catch (err) {
    return res.status(500).json({error: "An error occurred while logging in" })
  }
}

export const registerCtrl = (req: Request, res: Response) => {
  try {
    register(req, res);
  } catch (err) {
    return res.status(500).json({error: "An error occurred while registering" })
  }
}

