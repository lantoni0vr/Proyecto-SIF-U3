
import { Music } from "../models/music";
import { PlayList } from "../models/playlist";
import { PlayListSong } from "../models/playlist_song";
import { CreatePlayListDto} from "../dtos/music/create-playlist.dto"

class PlayListService {

    private playlists = [
        'Default',
        'Birtday',
        'Working',
        'Cooking'
    ];
    

    public async getOne( id: number){
        
        const playlist = await PlayList.findOne({where: {id}})
        
        return playlist;

    }

    public async getOneAndMusic (playlist_id: number, user_id: number){
        
        const playlist = await PlayList.findAll({ where: { id: playlist_id }, 
                                                  include: [{ model: PlayListSong, where: { user_id }, attributes: ['user_id'], 
                                                  include: [{ model: Music, attributes: ['id', 'artist', 'title'] }] }] });
        
        return playlist;

    }

    
    public async getPlayList (){
        const playlist = await PlayList.findAll();

        return playlist;
    }


    //para crear listas por quemados
    public async createdPlayLists () {

        const countRoles = await PlayList.findAndCountAll();

        if (countRoles.count === 0) {

            this.playlists.map(async (playlist) => {
                await PlayList.create({
                    name: playlist
                });
            });

        }

    }


}

export default new PlayListService();
