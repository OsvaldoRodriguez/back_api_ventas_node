import { Op } from "sequelize";
import models from "../database/models/index";
export default {
  listar: async (req, res) => {
    try {
      console.log("esta llegando");
      //api/producto?q=tec&page=2&limit=10&categoria_id
      let q = req.query.q;
      // let cad_id = req.query.categoria_id;
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);

      //para el  numero de pagina
      // a partir de  que se va a mostrar
      let offset = (page - 1) * limit;
      const productos = await models.Producto.findAndCountAll({
        where: {
          nombre: {
            [Op.like]: `%${q}%`,
          },
          // categoriaId: cad_id,
        },
        offset: offset, // a partir de  esta posicion
        limit: limit, // se quiere limit datos
        // dos datos a partir de 10
        include: [models.Categoria],
      });
      return res.status(200).json(productos);
    } catch (error) {
      return res.status(500).json({ mensaje: "Error al listar" });
    }
  },
  guardar: async (req, res) => {
    try {
      // const { nombre, detalle } = req.body;
      console.log(req.body);
      const prod = await models.Producto.create(req.body);
      if (prod.id) {
        return res
          .status(201)
          .json({ mensaje: "Producto registrada", body: prod });
      }
    } catch (error) {
      return res
        .status(422)
        .json({
         error: error.message,
        });
    }
  },
  mostrar: async (req, res) => {},
  modificar: async (req, res) => {},
  eliminar: async (req, res) => {},
};
