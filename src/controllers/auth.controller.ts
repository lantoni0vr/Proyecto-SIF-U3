import { User } from "../models/user"
import {Request, Response} from 'express'
import * as bcrypt from 'bcrypt'
const jtw = require('jsonwebtoken')
const authConfing = require("../config/auth.config")

module.exports = {

    //Register
    signUp(req: Request, res: Response){

        //Encriptar la contrasena
        const password = bcrypt.hashSync(req.body.password, +authConfing.rounds)
        User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: password
        }).then(user => {

         //Crear el token
            const token = jtw.sign({ user: user }, authConfing.secret, {
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


//Login
    signIn(req: Request, res: Response){
        
        const {email, password} = req.body

        User.findOne({
            where:{
                email: email
            }
        }).then(user => {
            if(!user){
                res.status(404).json({ msg: "Usuario con este correo no encontrado" })
            } else {

                //Creamos el token
                if(bcrypt.compareSync(password, user.password)){
                    const token = jtw.sign({ user: user }, authConfing.secret, {
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
       

    }
}