import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Router, Request, Response, request, response } from "express";
import * as bcrypt from 'bcrypt';
const authConfing = require("../config/auth.config");
import userService from "../services/user.service";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdatePasswordDto } from "../dtos/user/update-password.dto";
import { tokenG, tokenRole } from "../middlewares/authJwt";

class UserController {

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

    }

    //TRAER LISTA
    async getList(req: Request, res: Response): Promise<Response>{

        if (tokenG.role !== 'admin') return res.status(401).send({ code: 401, message: 'You dont have permission to see the users!' });

        const responsedto = await userService.getList()
        return res.status(responsedto.code).json(responsedto);
    }

    //TRAER UNO
    async getOne(req: Request, res: Response): Promise<Response>{

       if (tokenG.role !== 'admin') return res.status(401).send({ code: 401, message: 'You dont have permission to get a user!' });

        const { id } = req.params;
        const responsedto = await userService.getOne(+id);
      //  console.log(await userService.getUserRole(+id));
        return res.status(responsedto.code).json(responsedto);
    }

    //ACTUALIZAR
    async update(req: Request, res: Response): Promise<Response>{

        if (tokenG.role !== 'admin') return res.status(401).send({ code: 401, message: 'You dont have permission to update!' });

        const { id } = req.params;
        const payload = req.body;

        let updateUserDto = plainToClass(CreateUserDto, payload)

        const errors = await validate(updateUserDto);
        updateUserDto.password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfing.rounds))
        if(errors.length > 0){
            console.log(errors);
            
            return res.status(400).json({
                msg: 'Error in the requested request'
            })
        }

        const responsedto = await userService.update(updateUserDto, +id);

        console.log(responsedto) // + VALIDAR ANTES CONTRASEÑA ANTERIOR ANDRE
        
        return res.status(responsedto.code).json(responsedto);  
    }

    async updatePassword (req: Request, res: Response): Promise<Response> {

        const payload = req.body;

        const updatePasswordDto = plainToClass(UpdatePasswordDto, payload);

        const errors = await validate(updatePasswordDto);

        if(errors.length > 0){
            console.log(errors);
            
            return res.status(400).json({
                msg: 'Error in the requested request'
            })
        }

        const responsedto = await userService.updatePassword(updatePasswordDto);

        return res.status(responsedto.code).json(responsedto);

    }

    //ELIMINAR
    async delete(req: Request, res: Response): Promise<Response>{

        if (tokenG.role !== 'admin') return res.status(401).send({ code: 401, message: 'You dont have permission to delete!' });

        const {id} = req.params
        
        const responsedto = await userService.delete(+id)

        return res.status(responsedto.code).json(responsedto);
    }

}

export default new UserController();