import {Router} from 'express'

const authController = require('../controllers/auth.controller')
import userController from '../controllers/user.controller'
import { auth } from '../middlewares/authJwt'
import musicController from '../controllers/music.controller'
import playlist_songController from '../controllers/playlist_song.controller'
import playlistController from '../controllers/playlist.controller'


const router: Router = Router()

//TRAIDA DE CONTROLLES USER
    router.post('/auth/signin', authController.signIn) //Iniciar Sesion
    router.post('/auth/signup', authController.signUp) // Registrarse
    router.patch('/auth/update-password', auth, userController.updatePassword) //Actualizar Password

    router.get('/user/list', auth, userController.getList); //Traer lista de usuarios  
    router.get('/user/:id', auth,userController.getOne); //Traer un usuario
    router.patch('/user/:id', auth,userController.update); //Actualizar un usuario
    router.delete('/user/:id', auth,userController.delete); //eliminar un usuario

//TRAIDA DE CONTROLLES MUSIC
    router.post('/music/create' , auth, musicController.create); //Agregar una cancion
    router.get('/music/list' , auth, musicController.getList); //Traer una lista de canciones
    router.get('/music/:id' , auth, musicController.getOne); //Traer una cancio
    router.patch('/music/:id' , auth, musicController.update); //Actualizar una cancion
    router.delete('/music/:id' , auth,musicController.delete); //Eliminar una cancion

// PlayListSong
    router.post('/music/playlist/add' , auth, playlist_songController.create); //Crear una playList
    router.get('/music/playlist/:id' , auth, playlistController.getOnePlaylist); //Traer una playlist
    router.post('/music/playlist/create' , auth, playlistController.create); //Crear una playlist
export default router;