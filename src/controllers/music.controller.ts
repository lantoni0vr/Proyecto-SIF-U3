import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Request, Response, request } from "express";
import { CreateMusicDto } from "../dtos/music/create-music.dto";
import { UpdateMusicDto } from "../dtos/music/update-music.dto";
import musicService from "../services/music.service";
import userController from "./user.controller";
import {tokenG} from '../middlewares/authJwt'

class MusicController {

    async getList(req: Request, res: Response): Promise<Response>{
        const responsedto = await musicService.getList()
        return res.status(responsedto.code).json(responsedto);
    }
    
    async getOne(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const responsedto = await musicService.getOne(+id);
        return res.status(responsedto.code).json(responsedto);
    }
    
    async create(req: Request, res: Response): Promise<Response>{

        if (tokenG.role !== 'admin') return res.status(401).send({ code: 401, message: 'You dont have permission to create!' });
        
        const payload = req.body;
        let createMusicDto = plainToClass(CreateMusicDto, payload);

        const errors = await validate(createMusicDto);

        if(errors.length > 0){
            console.log(errors);
            
            return res.status(400).json({
                "Validation-errors" : errors
            })
        }

        const responsedto = await musicService.create(createMusicDto)
        
        return res.status(responsedto.code).json(responsedto)

    }
    
    //UPDATE
    async update(req: Request, res: Response): Promise<Response>{

        if (tokenG.role !== 'admin') return res.status(401).send({ code: 401, message: 'You dont have permission to update!' });

        const { id } = req.params;
        const payload = req.body;

        let updateMusicDto = plainToClass(UpdateMusicDto, payload)

        const errors = await validate(updateMusicDto);



        if(errors.length > 0){
            console.log(errors);
            
            return res.status(400).json({
                "Validation-errors" : errors
            })
        }

        const responsedto = await musicService.update(payload, +id);

        console.log(responsedto)
        
        return res.status(responsedto.code).json(responsedto); 
    }
    
    //DELETE
    async delete(req: Request, res: Response): Promise<Response>{

        if (tokenG.role !== 'admin') return res.status(401).send({ code: 401, message: 'You dont have permission to delete!' });

        const {id} = req.params
        
        const responsedto = await musicService.delete(+id)

        return res.status(responsedto.code).json(responsedto);
    }
}

export default new MusicController()