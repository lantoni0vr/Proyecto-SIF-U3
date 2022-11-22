import { request, Request, Response} from 'express'
import { CreateAdminDto } from '../dtos/admin/create-admin.dto';
import { UpdateAdminDto } from '../dtos/admin/update-admin.dto';
import { Admin } from '../models/admin';

class AdminService {

    public async getList(){
        const adminDB = await Admin.findAll({})
        return adminDB;
    }

    public async getOne( id: number){
        const admin = await Admin.findOne({where: {id}})
        return admin;

    }

    public async create(createAdminDto: CreateAdminDto){

        const createAdmin = await Admin.create(createAdminDto);

        return createAdmin;
    }

    public async update(updateAdminDto: UpdateAdminDto, name: number){

        const admin = await this.getOne(name)

        if(!admin){
            return null
        }

        const updateAdmin = {
            id: name,
            ...updateAdminDto
        }

        const updatedAdmin = await Admin.update(updateAdmin, { where : {id: name}})

        return this.getOne(name);
    }

        public async delete(id: number){
        
            const admin = await this.getOne(id)

            if(!admin){
                return null
            }

            const deleteAdmin = await Admin.destroy({ where: { id }})
            
            return admin;
    }
}

export default new AdminService();