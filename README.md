# ejecutar angular con docker

![sql](https://res.cloudinary.com/drqk6qzo7/image/upload/v1572837779/principal_glf35j.png)

![sql](https://res.cloudinary.com/drqk6qzo7/image/upload/v1572836916/correo_ecmmvv.png)

```` bash
docker-compose build
docker run --name back -d -p 3001:3001 back_back
````

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
CORREO: su correo
CLAVE: clave del correo
````

### importante 

#### por favor asigne 2.5 gb de memoria ram a docker

# node with sql server

[![sql-node](https://res.cloudinary.com/drqk6qzo7/image/upload/v1572585904/sqlnode_hchter.png)

````bash
npm i
npm start
````
