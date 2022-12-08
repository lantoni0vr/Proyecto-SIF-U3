
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePlayListSongDto {

    @IsNumber()
    @IsNotEmpty()
    public playlist_id: number;
    
    @IsNumber()
    @IsNotEmpty()
    public user_id: number;
    
    @IsNumber()
    @IsNotEmpty()
    public music_id: number;

}
