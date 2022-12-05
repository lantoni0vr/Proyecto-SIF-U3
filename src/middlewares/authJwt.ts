import { Request,Response, NextFunction } from 'express'    
const jtw = require('jsonwebtoken')
const authConfing = require("../config/auth.config")

module.exports= (req: Request, res: Response, next: NextFunction) =>{

    console.log(req.headers);

    if(!req.headers.authorization){
        res.status(401).json({ msg: "Acceso no autorizado" })
    }
    else{

        //Comprobar la validez de este token
        const token = req.headers.authorization.split(" ")[1]

        jtw.verify(token, authConfing.secret, (err: any, decoded: any) =>{
            if(err){

                res.status(500).json({ msg: "Ha ocurrido un error", err});
                console.log(err);
            }
            else{
               
                next();
                
            }
        })
    }
    

}