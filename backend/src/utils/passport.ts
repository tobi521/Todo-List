import { Strategy, ExtractJwt } from "passport-jwt"
import passport from "passport"

import User from "../models/user.model"

const key:string = process.env.SECRET_OR_KEY || ""

let opts: any = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

passport.initialize()

passport.use(
	new Strategy(
		opts, 
		async (payload, done) => 
			{ 
				try {
					const user = await User.findById(payload.id);
					if (user) {
						return done(null, {
							id: user._id,
							name: user.name,
							email: user.email,
							isAdmin: user.isAdmin
						});
					}
					
					return done(null, false);
				} catch (error) {
					return done(error, false);
				}
			}
		)
	);
