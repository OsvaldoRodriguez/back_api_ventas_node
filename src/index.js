import express from 'express';
import {RouteAuth} from './routes/auth.routes'
import {RouteAdmin} from './routes/admin.routes'
import cors from 'cors'
const app = express();

app.use(cors());
app.use(express.json()); // para capturar datos en formato json -> para usar req.body
app.use(express.urlencoded({extended : true}) ) // para recibir por url encoded (peticion post)
// habilitando rutas
app.use('/api', RouteAuth);
app.use('/api/v1', RouteAdmin);
app.listen(3000, () =>{
    console.log("servidor corriendo");
});