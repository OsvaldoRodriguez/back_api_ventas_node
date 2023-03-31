import {Router} from 'express'
import authController from '../controllers/auth.controller'
import * as authMiddleware from "./../middlewares/auth.middleware"
export const Route = Router();

Route.post('/auth/login', authController.login)
Route.post('/auth/register', authController.register)
// que verifique antes de ir al perfil
Route.get('/auth/perfil', authMiddleware.auth, authController.perfil)
Route.post('/auth/logout', authMiddleware.auth ,authController.logout)