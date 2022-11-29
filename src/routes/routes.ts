import {Router} from 'express'
import getList from '../services/user.service'

const auth = require('../middlewares/authJwt')
const authController = require('../controllers/auth.controller')
const musicController = require('../controllers/music.controller')
//const userController = require('../controllers/user.controller')
const ejemplo = require('../controllers/ejemplo.controller')


const router: Router = Router()

    router.post('/auth/signin', authController.signIn) //Iniciar Sesion
    router.post('/auth/signup', authController.signUp) // Registrarse
    router.get('/auth/token',auth, ejemplo.getList)//autentificador HACER:ejemplo.getList
    router.patch('/auth/update-password', ejemplo.updatePassword) //Iniciar Sesion

//TRAIDA DE CONTROLLES USER
    router.post('/user/create', ejemplo.create); //Crear Usuario
    router.get('/user/list', ejemplo.getList); //Traer lista de usuarios  
    router.get('/user/:id', ejemplo.getOne); //Traer un usuario
    router.patch('/user/:id', ejemplo.update); //Actualizar un usuario
    router.delete('/user/:id', ejemplo.delete); //eliminar un usuario

//TRAIDA DE CONTROLLES MUSIC
    router.post('/music/create' , musicController.create); //Agregar una cancion
    router.get('/music/list' , musicController.getList); //Traer una lista de canciones
    router.get('/music/:id' , musicController.getOne); //Traer una cancio
    router.patch('/music/:id' , musicController.update); //Actualizar una cancion
    router.delete('/music/:id' , musicController.delete); //Eliminar una cancion

export default router;