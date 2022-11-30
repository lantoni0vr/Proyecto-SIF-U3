
import {Router} from 'express'
import getList from '../services/user.service'

const auth = require('../middlewares/authJwt')
const authController = require('../controllers/auth.controller')
const musicController = require('../controllers/music.controller')
const userController = require('../controllers/user.controller')


const router: Router = Router()

    router.post('/auth/signin', authController.signIn) //Iniciar Sesion
    router.post('/auth/signup', authController.signUp) // Registrarse
    router.get('/auth/token',auth, userController.getList)//autentificador HACER:ejemplo.getList
    router.patch('/auth/update-password', userController.updatePassword) //Iniciar Sesion

//TRAIDA DE CONTROLLES USER
    router.post('/user/create', userController.create); //Crear Usuario
    router.get('/user/list', userController.getList); //Traer lista de usuarios  
    router.get('/user/:id', userController.getOne); //Traer un usuario
    router.patch('/user/:id', userController.update); //Actualizar un usuario
    router.delete('/user/:id', userController.delete); //eliminar un usuario

//TRAIDA DE CONTROLLES MUSIC

export default router;

