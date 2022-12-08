import { request, Request, Response} from 'express'
import { ResponseDto } from '../common/dto/responsedto';
import { CreateMusicDto } from '../dtos/music/create-music.dto';
import { UpdateMusicDto } from '../dtos/music/update-music.dto';
import { Music } from '../models/music';

class MusicService {

    private responsedto : ResponseDto

    public async getList(){
        this.responsedto = new ResponseDto();

        try {
            this.responsedto.data = await Music.findAll({})
            this.responsedto.code = 200
            this.responsedto.message = ""
            return this.responsedto
        } catch (error) {
            this.responsedto.code = 400
            this.responsedto.message = "No hay contenido"
            return this.responsedto
        }
       
    }

    public async getOne( id: number){
        this.responsedto = new ResponseDto();

        const music = await Music.findOne({where: {id}})

        if(!music){
            this.responsedto.code = 400
            this.responsedto.message = `Cancion con id numero ${id} no encontrada`
            return this.responsedto
        }

        this.responsedto.data = music
        this.responsedto.code = 200
        this.responsedto.message = ""
        return this.responsedto

    }

    public async create(createMusicDto: CreateMusicDto){
        this.responsedto = new ResponseDto()

        try {

         this.responsedto.data = await Music.create(createMusicDto);
         this.responsedto.code = 201
         this.responsedto.message = "Cancion creada"   
         return this.responsedto

        } catch (error) {

         this.responsedto.code = 400
         this.responsedto.message = "Error al crear la cancion"  
         return this.responsedto 

        }

    }

    public async update(updateMusicDto: UpdateMusicDto, id: number){

        this.responsedto = new ResponseDto();

        const music = await Music.findOne({where: {id}})

        if(!music){
            this.responsedto.code = 404
            this.responsedto.message = "No se encontro la cancion con el id ingresado"
            return this.responsedto
        }else{

            const updateMusic = {
                id,
                ...updateMusicDto
            }

         this.responsedto.data = await Music.update(updateMusic, { where : {id}}) , updateMusic
         this.responsedto.code = 200
         this.responsedto.message = "Cancion Actualizada"   
         return this.responsedto

        }
 
    }

        public async delete(id: number){

            this.responsedto = new ResponseDto()
        
            const music = await Music.findOne({where: {id}})

            if(!music){
                this.responsedto.code = 400
                this.responsedto.message = "No se encontro la cancion con el id ingresado"
                return this.responsedto
            }

            const deleteMusic= await Music.destroy({ where: { id }})

            this.responsedto.message = 'Cancion eliminada'
            this.responsedto.code = 200

            return this.responsedto;
    }
}

export default new MusicService();