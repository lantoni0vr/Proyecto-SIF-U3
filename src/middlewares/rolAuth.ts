import { Request,Response, NextFunction } from 'express'

const userModel = require('../models/user')
const authJwt = require('../config/auth.config')
//const authConfig  = require('../config/auth.config')


module.exports = (req : Request , res : Response , next : NextFunction) => {

        console.log(req.headers);

        if(!req.headers.authorization){
            res.status(401).json({msg : "Acceso denegado"})
        }
        else{

            const token = req.headers.authorization.split(" ")[1]
            const authToken = authJwt(token)
            const userData = userModel.findById(authToken.id)

            if([].concat('role').includes(userData.role)){
                next()
            }else{
                res.status(409)
                res.send({error: 'No tienes permiso'});
                }
            }

}
    
