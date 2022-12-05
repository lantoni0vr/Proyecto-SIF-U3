import { User } from "../models/user"
import {Request, Response} from 'express'
import * as bcrypt from 'bcrypt'
import { plainToClass } from "class-transformer"
import { CreateUserDto } from "../dtos/user/create-user.dto"
import utils from "../utils/utils"
import userService from "../services/user.service"
import roleService from "../services/role.service"
const jtw = require('jsonwebtoken')
const authConfing = require("../config/auth.config")

module.exports = {


    
    //Register  - CREAR USUARIOS
    async signUp(req: Request, res: Response){

        //Encriptar la contrasena
        
        const createUserDto = plainToClass(CreateUserDto, req.body);
        const validateUser = await utils.errors(createUserDto);

        if (validateUser.data !== undefined) return res.status(validateUser.code).send(validateUser);
        if (await userService.searchUserByEmail(createUserDto.email)) return res.status(406).send({ code: 406, message: 'E-mail already exist!' });
        
        const existRole = await roleService.getOneRole(createUserDto.role_id);
        if (!existRole) return res.status(400).send({ code: 400, message: 'Role not exist!' });

        createUserDto.password = bcrypt.hashSync(createUserDto.password, Number.parseInt(authConfing.rounds));

        User.create({
            ...createUserDto
        }).then(user => {

         //Crear el token
            const token = jtw.sign({ id: user.dataValues.id, role: existRole.dataValues.role }, authConfing.secret, {
                expiresIn: authConfing.expires
            });

            res.json({
                user: user,
                token: token
            })
        
        })
        .catch(err =>{
            res.status(500).json(err)
            console.log(err)
        })

    },


//Login --ENTRAR
    async signIn(req: Request, res: Response){
        
        const {email, password} = req.body

        User.findOne({
            where:{
                email: email
            }
        }).then(async (user) => {
            if(!user){
                res.status(404).json({ msg: "Usuario con este correo no encontrado" })
            } else {

                //Creamos el token
                if(bcrypt.compareSync(password, user.dataValues.password)){

                    const role = await userService.getUserRole(user.dataValues.id);

                    const token = jtw.sign({ id: user.dataValues.id, role }, authConfing.secret, {
                        expiresIn: authConfing.expires
                    });
                    res.json({
                        user: user,
                        token: token

                    },
                    )
                }else{

                    //Acceso no autorizado
                    res.status(401).json({ msg: "contrasena incorrecta" })
                }
               
            }
        })
    },

}