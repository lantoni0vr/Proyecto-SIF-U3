import { Length, IsNotEmpty, IsOptional} from 'class-validator';


export class CreateRoleDto{


    id : number 
    
    @Length(3, 50, {
        message: ":-("
    })
    @IsNotEmpty()
    role: string;

}