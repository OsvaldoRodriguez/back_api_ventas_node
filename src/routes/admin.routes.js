import {Router} from 'express'
import * as authMiddleware from "./../middlewares/auth.middleware"
import categoriaController from '../controllers/categoria.controller'
import productoController from '../controllers/producto.controller'
import multer from 'multer'
export const RouteAdmin = Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
  const upload = multer({ storage: storage })




RouteAdmin.get('/categoria', authMiddleware.auth, categoriaController.listar)
RouteAdmin.post('/categoria', authMiddleware.auth, categoriaController.guardar)
RouteAdmin.get('/categoria/:id', authMiddleware.auth, categoriaController.mostrar)
RouteAdmin.put('/categoria/:id', authMiddleware.auth, categoriaController.modificar)
RouteAdmin.delete('/categoria/:id', authMiddleware.auth, categoriaController.eliminar)

// actualizacion de imagenes
RouteAdmin.post('/producto/:id/actualizar-imagen', upload.single("imagen"), function(req, res) {
    res.send({mensaje : "imagen subida"});
});


RouteAdmin.get('/producto', authMiddleware.auth, productoController.listar)
RouteAdmin.post('/producto', authMiddleware.auth, productoController.guardar)
RouteAdmin.get('/producto/:id', authMiddleware.auth, productoController.mostrar)
RouteAdmin.put('/producto/:id', authMiddleware.auth, productoController.modificar)
RouteAdmin.delete('/producto/:id', authMiddleware.auth, productoController.eliminar)
