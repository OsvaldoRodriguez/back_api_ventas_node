"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Producto.belongsTo(models.Categoria, {
        foreignKey: "categoriaId",
      });

      models.Producto.belongsToMany(models.Pedido, {
        through: "PedidoProducto",
      });
    }
  }
  Producto.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "El nombre de producto no puede estar vacio",
          },
          len: {
            args: [3, 20],
            mgs: "el tamaño del nombre debe ser [3,20] caracteres",
          },
        },
      },
      precio: DataTypes.DECIMAL,
      stock: DataTypes.INTEGER,
      imagen: DataTypes.STRING,
      descripcion: DataTypes.TEXT,
      estado: DataTypes.INTEGER,
      categoriaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Producto",
    }
  );
  return Producto;
};
