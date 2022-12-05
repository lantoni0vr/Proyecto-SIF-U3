import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request , Response } from "express"
import { json } from "sequelize";
import { CreateRoleDto } from "../dtos/role/create-role.dto";
import rolService from "../services/rol.service"

module.exports = {

    async getList(req : Request , res : Response) : Promise<Response>{
        const rol = await rolService.getList();
        return res.status(200).json(rol);
    },

    async getRol(req : Request , res : Response) : Promise<Response>{
        const {role} =req.params;
        const rol = await rolService.getRol(role);
        return res.status(201).json(rol);
    },

    async create(req : Request , res : Response) : Promise<Response>{
        const payload = req.body;

        let createRolDto = plainToClass(CreateRoleDto, payload)

        const errors = await validate(createRolDto);

        if(errors.length > 0){
            console.log(errors)

            return res.status(500).json({
                'Validate-Error' :errors
            })
        }

        return res.status(201).json(await rolService.create(createRolDto))
        
    },

    async delete(req: Request , res : Response) : Promise<Response>{
        const {id} = req.params
        
        await rolService.deleteRole(+id)

        return res.status(204).json();
    }

}