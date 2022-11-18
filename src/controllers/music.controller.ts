import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Router, Request, Response, request } from "express";
import { CreateMusicDto } from "../dtos/create-music.dto";
import { UpdateMusicDto } from "../dtos/update-music.dto";
import musicService from "../services/music.service";

export class MusicController{

    router = Router();

    constructor() {
        this.initRoutes();
    }
        
    initRoutes(){
        this.router.get('/music', this.getList);
        this.router.get('/music/:id', this.getOne);
        this.router.post('/music', this.create);
        this.router.patch('/music/:id', this.update);
        this.router.delete('/music/:id', this.delete);
    }

    async getList(req: Request, res: Response): Promise<Response>{
        const music = await musicService.getList()
        return res.json(music);
    }

    async getOne(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const music = await musicService.getOne(+id);
        return res.json(music);
    }

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

        return res.json(await musicService.create(createMusicDto));

    }
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

    //DELETE
    async delete(req: Request, res: Response): Promise<Response>{

        const {id} = req.params
        
        await musicService.delete(+id)

        return res.status(204).json();
    }
}