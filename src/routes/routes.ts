import {Router} from 'express'


const auth = require('../middlewares/authJwt')
const authController = require('../controllers/auth.controller')
const musicController = require('../controllers/music.controller')
const user = require('../controllers/user.controller')
const rolController = require('../controllers/role.controller')
const usuario = require('../models/user')


const router: Router = Router()

    router.post('/auth/signin', authController.signIn) //Iniciar Sesion
    router.post('/auth/signup', authController.signUp) // Registrarse
    router.get('/auth/token',auth, user.getList)//autentificador HACER:ejemplo.getList
    router.patch('/auth/update-password', user.updatePassword) //Iniciar Sesion

//TRAIDA DE CONTROLLES USER
    
    router.post('/user/create' , user.create); //Crear Usuario
    router.get('/user/list', user.getList); //Traer lista de usuarios  
    router.get('/user/:id', user.getOne); //Traer un usuario
    router.patch('/user/:id', user.update); //Actualizar un usuario
    router.delete('/user/:id', user.delete); //eliminar un usuario
    
//TRAIDA DE CONTROLLES MUSIC
    router.post('/music/create' , musicController.create); //Agregar una cancion
    router.get('/music/list' , musicController.getList); //Traer una lista de canciones
    router.get('/music/:id' , musicController.getOne); //Traer una cancio
    router.patch('/music/:id' , musicController.update); //Actualizar una cancion
    router.delete('/music/:id' , musicController.delete); //Eliminar una cancion

//TRAIDA DE CONTROLES ROL
    router.get('/role/list' , rolController.getList);
    router.get('/role/:role' , rolController.getRol);
    router.post('/role' , rolController.create);
    router.delete('/role/:id' , rolController.delete);

export default router;