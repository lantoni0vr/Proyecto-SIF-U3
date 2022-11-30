import {Router} from 'express'

const auth = require('../middlewares/authJwt')
const authController = require('../controllers/auth.controller')
const musicController = require('../controllers/music.controller')
const userController = require('../controllers/user.controller')


const router: Router = Router()

//TRAIDA DE CONTROLLES USER
    router.post('/auth/signin', authController.signIn) //Iniciar Sesion
    router.post('/auth/signup', authController.signUp) // Registrarse
    router.patch('/auth/update-password', auth, userController.updatePassword) //Actualizar Password

    router.get('/user/list', userController.getList); //Traer lista de usuarios  
    router.get('/user/:id', userController.getOne); //Traer un usuario
    router.patch('/user/:id', userController.update); //Actualizar un usuario
    router.delete('/user/:id', userController.delete); //eliminar un usuario

//TRAIDA DE CONTROLLES MUSIC
    router.post('/music/create' , musicController.create); //Agregar una cancion
    router.get('/music/list' , musicController.getList); //Traer una lista de canciones
    router.get('/music/:id' , musicController.getOne); //Traer una cancio
    router.patch('/music/:id' , musicController.update); //Actualizar una cancion
    router.delete('/music/:id' , musicController.delete); //Eliminar una cancion

export default router;