import { request, Request, Response} from 'express'
import { CreateMusicDto } from '../dtos/music/create-music.dto';
import { UpdateMusicDto } from '../dtos/music/update-music.dto';
import { Music } from '../models/music';

class MusicService {

    public async getList(){
        const musicDB = await Music.findAll({})
        return musicDB;
    }

    public async getOne( id: number){
        const music = await Music.findOne({where: {id}})
        return music;

    }

    public async create(createMusicDto: CreateMusicDto){

        const createMusic = await Music.create(createMusicDto);

        return createMusic;
    }

    public async update(updateMusicDto: UpdateMusicDto, id: number){

        const music = await this.getOne(id)

        if(!music){
            return null
        }

        const updateMusic = {
            id,
            ...updateMusicDto
        }

        const updatedMusic = await Music.update(updateMusic, { where : {id}})

        return this.getOne(id);
    }

        public async delete(id: number){
        
            const music = await this.getOne(id)

            if(!music){
                return null
            }

            const deletedMusic = await Music.destroy({ where: { id }})
            
            return music;
    }
}

export default new MusicService();