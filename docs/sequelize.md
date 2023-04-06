## Migrations
* https://stackedit.io/app#
* hola que tal
- como estan

De la ultima tabla se borrara el modelo solo se necesita la tablita (migracion)



```bash
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,status:boolean

npx sequelize-cli model:generate --name Categoria --attributes nombre:string,detalle:text,estado:integer

npx sequelize-cli model:generate --name Producto --attributes nombre:string,precio:decimal,stock:integer,imagen:string,descripcion:text,estado:integer,categoriaId:integer


npx sequelize-cli model:generate --name Cliente --attributes nombre_completo:string,ci_nit:string,correo:string,telefono:string,direccion:string,estado:integer


npx sequelize-cli model:generate --name Pedido --attributes fecha:date,cod_ped:string,estado_pedido:integer,clienteId:integer,observacion:text


npx sequelize-cli model:generate --name PedidoProducto --attributes pedidoId:integer,productoId:integer,cantidad:integer

```





# helPER PARA RESPUESTAS
https://dev.to/nedsoft/central-error-handling-in-express-3aej
