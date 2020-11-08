# express-basic
Example express app
- Este ejercicio consta de tres roles user, admin y master las tareas que puede realizar cada usuario se pueden evidenciar en las pruebas POSTMAN, sin embargo, se describen a continuación.
- Todos los usuarios deben registrarse y autenticarse para que los pasos posteriores funcionen
- después de autenticarse hay que lograrse y sacar el token que se genera como resultado de la petición para copiarlo y ponerlo en las siguientes peticiones en la parte de autenticación.
- El rol admin: puede obtener todos lo productos, eliminar un producto (pasando todo el json del producto sin el campo generado "_id"), actualizar un producto (pasando todo el json del producto que se quiere actualizar con el id del producto)
- El rol user: puede obtener todos los productos e insertar productos nuevos (pasando todos los campos que se encuentran en json suministrado)
- el rol master: puede consultar si existe o no un usuario (de cualquier rol) en la base de datos.
- Consejo: ver las rutas disponibles para pruebas en las colecciones POSTMAN
