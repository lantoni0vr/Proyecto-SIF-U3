import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Router, Request, Response, request } from "express";
import * as bcrypt from 'bcrypt';
const authConfing = require("../config/auth.config");
import userService from "../services/user.service";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdatePasswordDto } from "../dtos/user/update-password.dto";

module.exports = {

    async create(req: Request, res: Response): Promise<Response>{

        const payload = req.body;
        let createUserDto = plainToClass(CreateUserDto, payload);
        createUserDto.password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfing.rounds))
    
        const errors = await validate(createUserDto);

        if(errors.length > 0){
            console.log(errors);
            
            return res.status(400).json({
                "Validation-errors" : errors
            })
        }
        return res.json(await userService.create(createUserDto));

    },

    //TRAER LISTA
    async getList(req: Request, res: Response): Promise<Response>{
        const user = await userService.getList()
        return res.json(user);
    },

    //TRAER UNO
    async getOne(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const user = await userService.getOne(+id);
        return res.json(user);
    },

    //ACTUALIZAR
    async update(req: Request, res: Response): Promise<Response>{

        const { id } = req.params;
        const payload = req.body;

        let updateUserDto = plainToClass(CreateUserDto, payload)

        const errors = await validate(updateUserDto);
        updateUserDto.password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfing.rounds))
        if(errors.length > 0){
            console.log(errors);
            
            return res.status(400).json({
                "Validation-errors" : errors
            })
        }

        let user = await userService.update(updateUserDto, +id);

        console.log(user) // + VALIDAR ANTES CONTRASEÑA ANTERIOR ANDRE
        
        return res.json(user);  
    },

    async updatePassword (req: Request, res: Response): Promise<Response> {

        const payload = req.body;

        const updatePasswordDto = plainToClass(UpdatePasswordDto, payload);

        const errors = await validate(updatePasswordDto);
            
        if(errors.length > 0){
            console.log(errors);
            
            return res.status(400).json({
                "Validation-errors" : errors
            })
        }

        let user = await userService.updatePassword(updatePasswordDto);

        return res.json(user);

    },

    //ELIMINAR
    async delete(req: Request, res: Response): Promise<Response>{

        const {id} = req.params
        
        await userService.delete(+id)

        return res.status(204).json();
    }


}