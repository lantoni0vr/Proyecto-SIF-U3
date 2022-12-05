import { Role } from "../models/roles"
import { CreateRoleDto } from "../dtos/role/create-role.dto";

class RolService{

    public async getList(){
        const rol = await Role.findAll({})
        return rol;
    }

    public async getRol(role : string){
        const rol = await Role.findOne({where : {role}})
        return rol
    }

    public async create(createRolDto : CreateRoleDto){
        const rolcreate = await Role.create(createRolDto)
        return rolcreate;
    }

    public async deleteRole(id : number){
        const role = await Role.findOne({where : {id}})

        if(!role){
            return null
        }

        const deleteRole = await Role.destroy({where : {id}})

        return role
    }

}

export default new RolService()