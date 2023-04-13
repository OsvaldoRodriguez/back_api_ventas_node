import jwt from "jsonwebtoken";

// next -> deja pasar o no deja pasar
export const auth = function (req, res, next) {
  console.log("tenemos que verificar token");
  let token = null;
  // esa variable tiene el token
  if (req.headers.authorization) {
    // token es -> "Bearer ABC.DEF.GHI"
    // entonces con split se halla el token
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token + " llega token");
  if (!token) {
    return res
      .status(401)
      .json({ mensaje: "No tiene el token de seguridad", auth: false });
  }
  // verificando el token
  jwt.verify(token, "MI_CODIGO_SECRETO", (error, decode) => {
    if (error) {
      return res
        .status(401)
        .json({ mensaje: "el token ingresado expiro", auth: false });
    }
    // todo esta bien, asi que puede continuar

    req.user = decode.user;
    next();
  });
};
