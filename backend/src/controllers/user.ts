import { Response, Request } from "express"
import { login, register } from "../services/user"

export const loginCtrl = (req: Request, res: Response) => {
  login(req, res);
}

export const registerCtrl = (req: Request, res: Response) => {
  register(req, res);
}

