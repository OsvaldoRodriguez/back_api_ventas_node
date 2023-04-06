import {Router} from 'express'
import authController from '../controllers/auth.controller'
import * as authMiddleware from "./../middlewares/auth.middleware"
export const RouteAuth = Router();

RouteAuth.post('/auth/login', authController.login)
RouteAuth.post('/auth/register', authController.register)
// que verifique antes de ir al perfil
RouteAuth.get('/auth/perfil', authMiddleware.auth, authController.perfil)
RouteAuth.post('/auth/logout', authMiddleware.auth ,authController.logout)