import { request, Request, Response} from 'express'
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { User } from '../models/user';


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