import { Length, IsNotEmpty } from 'class-validator';

export class PlayListCreateDto{

    @Length(50)
    @IsNotEmpty()
    name : string

}
