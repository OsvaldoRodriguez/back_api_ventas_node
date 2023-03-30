import models from "./../database/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// const models = require('../database/models');
export default {
  async login(req, res) {
    // hay que generar tokens
    const { email, password } = req.body;
    console.log(req.body);

    let user = await models.User.findOne({
      where: { email: email },
    });

    // si no existe
    if (!user) {
      return res.status(401).json({ mensaje: "no existe tal usuario" });
    }

    // verificar contraseña
    let correcto = await bcrypt.compare(password, user.password);

    if (!correcto) {
      return res.status(401).json({ mensaje: "contraseña incorrecta" });
    } else {
      // generando token
      let payload = {
        id: user.id,
        email: user.email,
        time: new Date(),
      };

      // dura 1 hora
      const token = jwt.sign(payload, "MI_CODIGO_SECRETO", {
        // tipo de algoritmo a manejar
        expiresIn: 3600,
      });
      return res
        .status(200)
        .json({
          mensaje: "Todo OK",
          access_token: token,
          user: user,
          error: false,
        });
    }

    // res.status(200).json({ mensaje: "Todo OK", body: req.body });
  },

  async register(req, res) {
    const  {name, email, password} = req.body;;
    if(email){
        let user = await models.User.findOne({
            where : {email: email}
        })

        if(!user){
            // cifrar passwrord
            // contraseña y el valor de seguridad (10)
            const hash = await bcrypt.hash(password, 12);
            await models.User.create({name: name, email : email, password : hash});
            return res.status(201).json({ mensaje : "Usuario Registrado"});
        }else{
            res.status(422).json({mensaje : "Ya esta registrado el usuario"});
        }
    }else{
        res.status(422).json({mensaje : "el correo es obligatorio"});
    }

  },

  perfil(req, res) {},

  logout(req, res) {},
};
