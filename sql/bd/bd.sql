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

CREATE PROCEDURE buscarVentasPorCliente
  @clientesId INT,@productosId INT,@queHago INT
  as

  declare @valortotal int,@valorEnPuntos int

   if @queHago = 1
    BEGIN

    if exists(select top 1 1 from  ventasPorCliente where clientesId =@clientesId
         AND  productosId=@productosId)
         BEGIN
             UPDATE v
       SET v.puntos = v.puntos + p.valorEnPuntos
       from ventasPorCliente v
        inner join productos p on p.productosId= v.productosId 
        where  v.clientesId =@clientesId
         AND  v.productosId=@productosId
         END
        else 
        BEGIN
          select @valorEnPuntos = valorEnPuntos from productos where productosId=@productosId
          insert into ventasPorCliente(productosId,clientesId,puntos)
          values(@productosId,@clientesId,@valorEnPuntos)
        end
   END 
     ELSE
    BEGIN
          

          if exists(select top 1 1 from  ventasPorCliente where clientesId =@clientesId
         AND  productosId=@productosId)
         BEGIN
             UPDATE  v
       SET v.puntos = case when v.puntos - p.valorEnPuntos < 0 then 0 else v.puntos - p.valorEnPuntos end
        from ventasPorCliente v
        inner join productos p on p.productosId= v.productosId 
        where  v.clientesId =@clientesId
         AND  v.productosId=@productosId
         END
       
    END 
     select @valortotal = sum(puntos)  from ventasPorCliente where clientesId=@clientesId
   select ventasPorClienteId,
      p.nombre,
      c.nombre as nombrecliente,
      c.email,
      puntos,
      @valortotal as valortotal
      from ventasPorCliente v inner join productos p on v.productosId=p.productosId
      inner join clientes c on c.clientesId =v.clientesId
      where v.clientesId =@clientesId
go

SELECT TOP 1 1 