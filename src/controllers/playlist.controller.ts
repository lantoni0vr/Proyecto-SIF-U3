import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Request, Response, request } from "express";
import {tokenG} from '../middlewares/authJwt'
import { CreatePlayListSongDto } from "../dtos/music/create-playlist_song.dto";
import playlistSongService from '../services/playlists_songs';
import playlistService from "../services/playlist.service";


class PlayListController {

    async getPlayList(req: Request, res: Response): Promise<Response>{
        const music = await playlistService.getPlayList()
        return res.json(music);
    }
    
    // 
    async getOnePlaylist (req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const responsedto = await playlistService.getOneAndMusic(+id, tokenG.id);
        return res.status(responsedto.code).json(responsedto);
    }
    
    //agregar cacion a las playlist
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
    

}

export default new PlayListController()