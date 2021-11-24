import { Body, Controller, Post, Res, Get, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt'
import { Request, Response } from "express";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async insertUser(
        @Body('name') name: string,
        @Body('username') username: string,
        @Body('password') password: string
    ) {
        const saltOrRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRound)
        const generateId = await this.userService.insertUser(
            name,
            username,
            hashedPassword
        );
        return { id: generateId };
    }

    @Post('login')
    async login(
        @Body('username') username: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response
    ) {
        const userLogin = await this.userService.login(
            username,
            password,
            response
        )

        return userLogin
    }

    @Get('getuser')
    async getuser(
        @Req() request: Request
    ) {
        const user = await this.userService.getUser(request);

        return user;
    }

    @Post('logout')
    async logout(
        @Res({ passthrough: true }) response: Response
    ) {
        const logout = await this.userService.logout(response);

        return logout;
    }
}