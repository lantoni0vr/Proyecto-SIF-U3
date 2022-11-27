
import {Router} from 'express'

const auth = require('../middlewares/authJwt')

const authController = require('../controllers/auth.controller')
const musicController = require('../controllers/music.controller')

const router: Router = Router()

    
    router.post('/signin', authController.signIn) //Iniciar Sesion
    router.post('/signup', authController.signUp) // Registrarse

    router.get('/token', auth, musicController.MusicController)

export default router;