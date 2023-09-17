import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticatedGuard, DiscordAuthGuard } from './guards';

@Controller('auth')
export class AuthController {

    /**
     * GET /api/auth/login
     * This is the route user will visit to authenticate
     */
    @Get('login')
    @UseGuards(DiscordAuthGuard)
    login() {
        return;
    }

    /**
     * GET /api/auth/redirect
     * This is the redirect URL the OAuth2 provider will call
     */
    @Get('redirect')
    @UseGuards(DiscordAuthGuard)
    redirect(@Res() res: Response) {
        res.send(200);
    }

    /**
     * GET /api/auth/status
     * Retriever the auth status
     */
    @Get('status')
    @UseGuards(AuthenticatedGuard)
    status(@Req() req: Request) {
        return req.user;
    }

    /**
     * GET /api/auth/logout
     * Logging the user out
     */
    @Get('logout')
    logout() {}
}
