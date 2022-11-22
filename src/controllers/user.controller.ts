import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Router, Request, Response, request } from "express";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import userService from "../services/user.service";

export class UserController{

    router = Router();

    constructor() {
        this.initRoutes();
    }
        
    initRoutes(){
        this.router.get('', this.getList);
        this.router.get('/:id', this.getOne);
        this.router.post('', this.create);
        this.router.patch('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }

    async getList(req: Request, res: Response): Promise<Response>{
        const user = await userService.getList()
        return res.json(user);
    }

    //TRAER
    async getOne(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const user = await userService.getOne(+id);
        return res.json(user);
    }

    //CREATE
    async create(req: Request, res: Response): Promise<Response>{

        const payload = req.body;
        let createUserDto = plainToClass(CreateUserDto, payload);

        const errors = await validate(createUserDto);

        if(errors.length > 0){
            console.log(errors);
            
            return res.status(400).json({
                "Validation-errors" : errors
            })
        }

        return res.json(await userService.create(createUserDto));

    }
    //UPDATE
    async update(req: Request, res: Response): Promise<Response>{

        const { id } = req.params;
        const payload = req.body;

        let updateUserDto = plainToClass(UpdateUserDto, payload)

        const errors = await validate(updateUserDto);

        if(errors.length > 0){
            console.log(errors);
            
            return res.status(400).json({
                "Validation-errors" : errors
            })
        }

        let user = await userService.update(payload, +id);

        console.log(user)
        
        return res.json(user); 
    }

    //DELETE
    async delete(req: Request, res: Response): Promise<Response>{

        const {id} = req.params
        
        await userService.delete(+id)

        return res.status(204).json();
    }
}