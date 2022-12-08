import { request, Request, response, Response} from 'express'
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { User } from '../models/user';
import { UpdatePasswordDto } from '../dtos/user/update-password.dto';
import bycrypt from 'bcrypt';
import { Role } from '../models/roles';
import { ResponseDto } from '../common/dto/responsedto';
import { Music } from '../models/music';
const authConfing = require("../config/auth.config");

class UserService {

    private responsedto : ResponseDto

    public async getList(){
        this.responsedto = new ResponseDto()

        try {
        
        this.responsedto.data = await User.findAll({})
        this.responsedto.code = 200
        this.responsedto.message = "Lista de usuario"
        return this.responsedto
        
        } catch (error) {
        this.responsedto.code = 404
        this.responsedto.message = "Lista no encontrada"
        return this.responsedto
        }
    
    }

    public async getOne( id: number){

        this.responsedto = new ResponseDto()

        const user = await User.findOne({where: {id}})

        if(!user){
            this.responsedto.code = 404
            this.responsedto.message = `Usuario con el id numero ${id} no encontrado`
            return this.responsedto
        }else{
            this.responsedto.data = user
            this.responsedto.code = 200
            this.responsedto.message = ''
            return this.responsedto
        }

    }

    public async create(createUserDto: CreateUserDto){

        const createUser = await User.create({ ...createUserDto });
        return createUser;

    }

    public async update(updateUserDto: UpdateUserDto, id: number){

        this.responsedto = new ResponseDto()

        const user = await User.findOne({where : {id}})

        if(!user){
            this.responsedto.code = 404
            this.responsedto.message = "Usuario no encontrado"
            return this.responsedto
        }else{
            const updateUser = {
                id: name,
                ...updateUserDto
            }
    
            this.responsedto.data =  await User.update(updateUser, { where : {id: name}})
            this.responsedto.code = 200
            this.responsedto.message = "Usuario actualizado"
            return this.responsedto
        }

        
    }

    public async updatePassword(updatePasswordDto: UpdatePasswordDto) {

        this.responsedto = new ResponseDto();

        const { email } = updatePasswordDto;

        const user = await User.findOne({ where: { email } });

        if(!user){
            this.responsedto.message = "No se encontro el email ingresado, intentalo de nuevo"
            this.responsedto.code = 404
            return this.responsedto
        }

        if (!(await bycrypt.compare(updatePasswordDto.password, user.dataValues.password))) {
            this.responsedto.message = "Error en la peticion"
            this.responsedto.code = 404
            return this.responsedto
        }

        updatePasswordDto.new_password = bycrypt.hashSync(updatePasswordDto.new_password, Number.parseInt(authConfing.rounds));

        const updateUser = {
            password: updatePasswordDto.new_password
        }

        await User.update(updateUser, { where : { email }});

        this.responsedto.message = "Se actualizo la contrasena"
        this.responsedto.code = 200
        return this.responsedto;
    }

    public async delete(id: number){
        
        this.responsedto = new ResponseDto()
        
        const user = await Music.findOne({where : {id}})

        if(!user){
            this.responsedto.message = "No se encontro el usuario con el id ingresado"
            this.responsedto.code = 404
            return this.responsedto
        }else{
            this.responsedto.data =  await User.destroy({ where: { id }})
            this.responsedto.message = "Usuario eliminado"
            this.responsedto.code = 200
            return this.responsedto
        }

    }

    public async getUserRole (id: number) {

        const userRole = await User.findOne({ where: { id }, include: [{ model: Role }] }).then(data => data?.toJSON());

        return userRole.role.role;

    }

    public async searchUserByEmail (email: string) {

        const user = await User.findOne({ where: { email } });

        return user;

    }

}

export default new UserService();