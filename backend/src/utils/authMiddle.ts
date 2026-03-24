import {Request, Response, NextFunction} from 'express';

export function IsAdmin(isAdmin: boolean) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any; 
    if (user && user.isAdmin === isAdmin) {
      return next();
    }

    res.status(403).json({error: 403})
  };
}
