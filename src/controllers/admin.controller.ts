import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Router, Request, Response, request } from "express";
import { CreateAdminDto } from "../dtos/admin/create-admin.dto";
import { UpdateAdminDto } from "../dtos/admin/update-admin.dto";
import adminService from "../services/admin.service";

export class AdminController{

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
        const admin = await adminService.getList()
        return res.json(admin);
    }

    //TRAER
    async getOne(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const admin = await adminService.getOne(+id);
        return res.json(admin);
    }

    //CREATE
    async create(req: Request, res: Response): Promise<Response>{

        const payload = req.body;
        let createAdminDto = plainToClass(CreateAdminDto, payload);

        const errors = await validate(createAdminDto);

        if(errors.length > 0){
            console.log(errors);
            
            return res.status(400).json({
                "Validation-errors" : errors
            })
        }

        return res.json(await adminService.create(createAdminDto));

    }
    //UPDATE
    async update(req: Request, res: Response): Promise<Response>{

        const { id } = req.params;
        const payload = req.body;

        let updateAdminDto = plainToClass(UpdateAdminDto, payload)

        const errors = await validate(updateAdminDto);

        if(errors.length > 0){
            console.log(errors);
            
            return res.status(400).json({
                "Validation-errors" : errors
            })
        }

        let admin = await adminService.update(payload, +id);

        console.log(admin)
        
        return res.json(admin); 
    }

    //DELETE
    async delete(req: Request, res: Response): Promise<Response>{

        const {id} = req.params
        
        await adminService.delete(+id)

        return res.status(204).json();
    }
}