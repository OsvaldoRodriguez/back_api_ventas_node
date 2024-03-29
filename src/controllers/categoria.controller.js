import models from "./../database/models/index";

export default {
  listar: async (req, res) => {
    const categorias = await models.Categoria.findAll({});
    return res.status(200).json(categorias);
  },
  guardar: async (req, res) => {
    try {
      const { nombre, detalle } = req.body;
      const cat = await models.Categoria.create({
        nombre,
        detalle,
      });
      return res
        .status(201)
        .json({ nombre, detalle});
    } catch (error) {
      return res
      .status(422)
      .json({ mensaje: "Ocurro un error al registrar la categoria" , error});
    }

    
  },
  mostrar: async (req, res) => {
    const id = req.params.id;
    const categoria = await models.Categoria.findByPk(id);
    if (categoria === null) {
      console.log("No encontrado");
      return res.status(404).json({ mensaje: "Categoria no encontrada", error : error.message});
    }
    // si existe

    return res.status(200).json(categoria);
  },
  modificar: async (req, res) => {
    const id = req.params.id;
    const {nombre, detalle} = req.body;
    const cat = await models.Categoria.findByPk(id);

    if (cat) {
        await models.Categoria.update(
          {nombre, detalle }, {
            where : {
              id : cat.id
            }
          }
        );
      return res
        .status(200)
        .json({ mensaje: "Categoria actualizada"});
    }
    return res
      .status(404)
      .json({ mensaje: "Ocurro un error al registrar la categoria" });
  },
  eliminar: async (req, res) => {
    const id = req.params.id
    console.log("data base, " + id);
    await models.Categoria.destroy({
        where: {
            id: id
        },
    });
    return res.status(200).json({ message: "categoria Eliminada" })

}
};
