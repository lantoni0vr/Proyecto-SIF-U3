import { request, Request, Response} from 'express'
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { User } from '../models/user';
import { UpdatePasswordDto } from '../dtos/user/update-password.dto';
import bycrypt from 'bcrypt';
const authConfing = require("../config/auth.config");

class UserService {

    public async getList(){
        const userDB = await User.findAll({})
        return userDB;
    }

    public async getOne( id: number){
        const user = await User.findOne({where: {id}})
        return user;

    }

    public async create(createUserDto: CreateUserDto){

        const createUser = await User.create(createUserDto);
        //const hash = await bcrypt.hash(createUser.password, 10);
        //createUser.password = hash;
        return createUser;

    }

    public async update(updateUserDto: UpdateUserDto, name: number){

        const user = await this.getOne(name)

        if(!user){
            return null
        }

        const updateUser = {
            id: name,
            ...updateUserDto
        }

        const updatedUser = await User.update(updateUser, { where : {id: name}})

        return this.getOne(name);
    }

    public async updatePassword(updatePasswordDto: UpdatePasswordDto) {

        const { email } = updatePasswordDto;

        const user = await User.findOne({ where: { email } });

        if(!user){
            return null
        }

        if (!(await bycrypt.compare(updatePasswordDto.password, user.password))) {
            return null;
        }

        updatePasswordDto.new_password = bycrypt.hashSync(updatePasswordDto.new_password, Number.parseInt(authConfing.rounds));

        const updateUser = {
            password: updatePasswordDto.new_password
        }

        await User.update(updateUser, { where : { email }});

        return user;
    }

    public async delete(id: number){
        
        const user = await this.getOne(id)

        if(!user){
            return null
        }

        const deleteUser = await User.destroy({ where: { id }})
            
        return user;
    }
}

export default new UserService();