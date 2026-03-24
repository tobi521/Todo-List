import { Response, Request } from "express"
import { login, register } from "../services/user.service"

export const loginCtrl = async (req: Request, res: Response) => {
  try {
    const result = await login(req.body);
    if(!result.type) {
      return res.status(400).json({ ...result });
    }

    return res.status(200).json({ ...result });
  } catch (err) {

    return res.status(500).json({error: 500})
  }
}

export const registerCtrl = async (req: Request, res: Response) => {
  try {
    const result = await register(req.body);
    if(!result.type) {
      return res.status(400).json({ ...result });
    }

    return res.status(200).json({ ...result });
  } catch (err) {
    return res.status(500).json({error: 500})
  }
}

