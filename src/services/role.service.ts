
import { Role } from "../models/roles";

class RoleService {

    private roles = [
        'admin',
        'visor'
    ];

    public async getOneRole (id: number) {

        const role = await Role.findByPk(id);

        return role;

    }

    public async createdRoles () {

        const countRoles = await Role.findAndCountAll();

        if (countRoles.count === 0) {

            this.roles.map(async (role) => {
                await Role.create({
                    role
                });
            });

        }

    }

}

export default new RoleService();
