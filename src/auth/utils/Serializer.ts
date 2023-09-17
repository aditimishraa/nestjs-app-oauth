import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport"
import { User } from "../../typeorm";
import { AuthenticationProvider } from "../auth";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('AUTH_SERVICE') 
        private readonly authService: AuthenticationProvider,
    ) {
        super();
    }

    async serializeUser(user: User, done: (err: Error, user: User) => void) {
        done(null, user);
        
    }

    async deserializeUser(user: User, done: (err: Error, user: User) => void) {
        const userDB = await this.authService.findUser(user.discordId);
        console.log(userDB);
        return userDB ? done(null, userDB) : done(null, null);
    }
}