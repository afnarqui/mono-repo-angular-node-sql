CREATE DATABASE crud;
go
USE crud;

CREATE TABLE clientes (
  clientesId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  nombre NVARCHAR(80),
  email NVARCHAR(80),
  puntosAcumulados INT,
);
GO
create procedure buscarClientes
as

select 
  clientesId,
  nombre,
  email,
  puntosAcumulados
from clientes

GO
create procedure buscarUnCliente
@clientesId int
as

select 
  clientesId,
  nombre,
  email,
  puntosAcumulados
from clientes where clientesId=@clientesId

GO

create procedure guardarCliente
@nombre varchar(80),@email varchar(80),@puntosAcumulados int
as
insert into clientes(
  nombre,
  email,
  puntosAcumulados) values(@nombre,@email,@puntosAcumulados)

GO
create procedure actualizarCliente
@nombre varchar(80),@email varchar(80),@clientesId int
as
update clientes set nombre=@nombre,email=@email where clientesId=@clientesId

GO

CREATE TABLE productos (
  productosId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  nombre NVARCHAR(80),
  valorEnPuntos INT,
);
GO

CREATE TABLE ventasPorCliente (
  ventasPorClienteId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  productosId INT,
  clientesId INT,
  puntos INT,
);

INSERT INTO productos(nombre,valorEnPuntos)
VALUES('Listones',5),
('Reductor de altura',8),
('Largueros de cama',12)

GO
create procedure buscarProductos
as

select 
  productosId,
  nombre,
  valorEnPuntos
from productos

GO


SELECT TOP 1 1 