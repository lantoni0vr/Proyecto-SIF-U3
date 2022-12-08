
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePlayListDto {

    @IsString()
    @Length(3, 10)
    @IsNotEmpty()
    public name: string;

}


