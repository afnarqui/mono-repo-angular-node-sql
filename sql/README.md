# ejecutar sql con docker

[![sql](https://res.cloudinary.com/drqk6qzo7/image/upload/v1572671538/cliente_mwvjod.png)

```` bash
docker-compose build
docker run --name sql -d -p 1433:1433 sql_basededatos
````
## credenciales

````sql
USER: SA
PASSWORD=quintero1.
PORT:1433
SERVER: localhost 
DATABASE: prueba
TABLE: cliente 
````

### importante 

#### por favor asigne 2.5 gb de memoria ram a docker
