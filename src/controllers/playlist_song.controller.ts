import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Request, Response, request } from "express";
import { CreateMusicDto } from "../dtos/music/create-music.dto";
import { UpdateMusicDto } from "../dtos/music/update-music.dto";
import musicService from "../services/music.service";
import userController from "./user.controller";
import {tokenG} from '../middlewares/authJwt'
import { CreatePlayListSongDto } from "../dtos/music/create-playlist_song.dto";
import playlistSongService from '../services/playlists_songs';

class PlayListSongController {

    async getList(req: Request, res: Response): Promise<Response>{
        const music = await musicService.getList()
        return res.json(music);
    }
    
    async getOne(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const music = await musicService.getOne(+id);
        return res.json(music);
    }
    
    // -
    async create(req: Request, res: Response): Promise<Response>{

        if (tokenG.role !== 'visor') return res.status(401).send({ code: 401, message: 'You dont have permission to create!' });
        
        const payload = req.body;
        let createPlayListSongDto = plainToClass(CreatePlayListSongDto, payload);

        createPlayListSongDto.user_id = tokenG.id;

        const errors = await validate(createPlayListSongDto);

        if(errors.length > 0){
            console.log(errors);
            
            return res.status(400).json({
                "Validation-errors" : errors
            })
        }

        return res.json(await playlistSongService.create(createPlayListSongDto));

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

        let music = await musicService.update(payload, +id);

        console.log(music)
        
        return res.json(music); 
    }
    
    //DELETE
    async delete(req: Request, res: Response): Promise<Response>{

        if (tokenG.role !== 'admin') return res.status(401).send({ code: 401, message: 'You dont have permission to delete!' });

        const {id} = req.params
        
        await musicService.delete(+id)

        return res.status(202).json({ msg: 'Deleted correctly!!' });
    }
}

export default new PlayListSongController()