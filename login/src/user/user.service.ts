import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt'
import { User } from "./user.model";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly UserModel: Model<User>,
        private readonly jwtService: JwtService
    ) { }

    async insertUser(name: string, username: string, password: string) {

        const newUser = new this.UserModel({
            name: name,
            username: username,
            password: password
        });
        const result = await newUser.save();
        return result.id as string;
    }


    async login(username: string, password: string, response: Response) {
        const user = await this.UserModel.findOne({ username: username });

        if (!user) {
            throw new NotFoundException({ Message: 'User not Found' });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            throw new NotFoundException({ Message: 'Invalid credentail' });
        }

        const jwt = await this.jwtService.signAsync({ id: user.id })

        response.cookie('jwt', jwt, { httpOnly: true })

        return {
            message: "login success"
        }
    }

    async getUser(request: Request) {
        try {
            const cookies = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookies);

            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.UserModel.findOne({id:data['id']});

            return {
                id:user._id,
                name:user.name,
                username:user.username
            };

        } catch (e) {
            throw new UnauthorizedException(e)
        }
    }

    async logout(response: Response){
        const clearCookie = response.clearCookie('jwt');

        return {
            message : 'logout Success'
        }
    }


}