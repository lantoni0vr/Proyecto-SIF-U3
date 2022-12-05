import { CreateMusicDto } from '../dtos/create-music.dto';
import { UpdateMusicDto } from '../dtos/update-music.dto';
import { Music } from '../models/music';
import { ResponseDto } from '../common/dto/responsedto.music';

class MusicService {

    private responsedto : ResponseDto;

    public async getList(){
        this.responsedto = new ResponseDto();

        try{
        this.responsedto.data = await Music.findAll({})
        this.responsedto.code = 200
        this.responsedto.message = 'Listado de canciones'
        return this.responsedto;
        }catch(error){
        this.responsedto.code = 500
        this.responsedto.message = 'Error al traer la lista'
        return this.responsedto
        }
        


    }

    public async getOne( id: number){
        this.responsedto = new ResponseDto();

        const music = await Music.findOne({where: {id}})

        if(!music){
            this.responsedto.message = `Cancion con el id ${id} no fue encontrardo`
            this.responsedto.code = 500
            return this.responsedto
        }else{
            this.responsedto.data = music
            this.responsedto.message = `Cancion con id = ${id}`
            this.responsedto.code = 200
            return this.responsedto
        }

    }

    public async create(createMusicDto: CreateMusicDto){
        this.responsedto = new ResponseDto()

        try {
        this.responsedto.data = await Music.create(createMusicDto);
        this.responsedto.code = 201
        this.responsedto.message = `Cancion agregada exitosamente`
        return this.responsedto
        } catch (error) {
        this.responsedto.code = 500
        this.responsedto.message = `Error al agregar la cancion`
        return this.responsedto
        }
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