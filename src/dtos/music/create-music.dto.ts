import { Length, IsNotEmpty, IsOptional} from 'class-validator';

export class CreateMusicDto{

    @Length(3, 50, {
        message: "El titulo debe estar entre 3 y 50 caracteres"
    })
    @IsNotEmpty()
    title: string;

    @Length(3, 20)
    @IsNotEmpty()
    artist: string;

    @Length(3, 15)
    @IsOptional()
    gender: string;

    @Length(3, 20)
    @IsOptional()
    album: string

    @Length(4)
    @IsNotEmpty()
    year: number
}