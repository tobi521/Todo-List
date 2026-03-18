import PassportJwt from "passport-jwt"
import passport from "passport"

const JwtStrategy = PassportJwt.Strategy;
const ExtractJwt = PassportJwt.ExtractJwt;

import User from "../models/user.model"

const key:string = process.env.SECRET_OR_KEY || ""

let opts: any = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

passport.initialize()

passport.use(new JwtStrategy(opts, async (payload, done) => {
	try {
		const user = await User.findById(payload.id);
		if (user) {
			return done(null, user);
		}
		return done(null, false);
	} catch (error) {
		return done(error, false);
	}
}));