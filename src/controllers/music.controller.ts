import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Request, Response, request } from "express";
import { CreateMusicDto } from "../dtos/create-music.dto";
import { UpdateMusicDto } from "../dtos/update-music.dto";
import musicService from "../services/music.service";

module.exports = {

    async getList(req: Request, res: Response): Promise<Response>{
        const responsedto = await musicService.getList()
        return res.status(responsedto.code).json(responsedto);
    }
    ,
    async getOne(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const responsedto = await musicService.getOne(+id);
        return res.status(200).json({
            message : responsedto.message,
            data : responsedto.data
        });
    }
    ,
    async create(req: Request, res: Response): Promise<Response>{

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

        return res.status(200).json(responsedto);

    }
    ,
    //UPDATE
    async update(req: Request, res: Response): Promise<Response>{

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

        let music = await musicService.update(payload, +id);

        console.log(music)
        
        return res.json(music); 
    }
    ,
    //DELETE
    async delete(req: Request, res: Response): Promise<Response>{

        const {id} = req.params
        
        await musicService.delete(+id)

        return res.status(204).json();
    }
}