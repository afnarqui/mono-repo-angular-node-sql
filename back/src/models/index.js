require("dotenv").config();
import sql from "mssql";
import config from "../../config";

const query = {};

query.get = (request, res,params) => {
  const conn = new sql.ConnectionPool(config);
  let nombreProcedimientoAlmacenado;
  conn.connect(function(err) {
    if (err) throw err;
    const req = new sql.Request(conn);
    if(params.clientesId!==undefined){
      console.log('query existe');
      let clientesId = params.clientesId;
      req.input( "clientesId", sql.Int, clientesId);
      nombreProcedimientoAlmacenado = "buscarUnCliente";
    }else {
      nombreProcedimientoAlmacenado = "buscarClientes";
    }
    req.execute(nombreProcedimientoAlmacenado, function(err, response) {
      if (err) throw err;
      else conn.close();
      return res.status(200).send(response.recordset);
    });
  });
};

query.post = (request, res, params) => {
  // let { nombre,cedula,apellido,direccion,telefono,celular,email,puntosAcumulados } = req.body;
  let { nombre, email, puntosAcumulados } = params;

  let nombreProcedimientoAlmacenado = "guardarCliente";

  let conn = new sql.ConnectionPool(config);
  conn.connect(function(err) {
    if (err) throw err;
    let req = new sql.Request(conn);

    req.input("nombre", sql.VarChar(80), nombre);
    req.input("email", sql.VarChar(80), email);
    req.input("puntosAcumulados", sql.Int, puntosAcumulados);
    //    req.input( "cedula", sql.Int, cedula );
    //    req.input( "apellido", sql.VarChar( 80 ), apellido );
    //    req.input( "direccion", sql.VarChar( 80 ), direccion );
    //    req.input( "telefono", sql.Int, telefono );
    //    req.input( "celular", sql.Int, celular );

    req.execute(nombreProcedimientoAlmacenado, function(err, response) {
      if (err) throw err;
      else conn.close();
      return res.send(response.recordset);
    });
  });
};

query.correo = (req,res, params) => {
 
  var nodemailer = require('nodemailer');
  

  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: process.env.CORREO,
          pass: process.env.CLAVE_CORREO
      }
  });
  
  let {   
    from,
    correo,
    text,
    html,
    filename,
    content,
    subject,
    to,    
    puntos,
    nombre} =req.query
  
  let data = {
    from,
    correo,
    text,
    html,
    filename,
    content,
    subject,
    to,
    puntos,
    nombre
  }

var elHtml = `<html>
<head>
  <title></title>
  <style>
   #block3 {
      background:rgb(141, 166, 190);
      border:3px solid rgb(104, 108, 109);
      font-family:Georgia,"Times New Roman",Times,serif;
      margin:20px 0px;
      padding:20px;
      position:relative;
      z-index:5;
  }  
   
  #block3 .date {
      background:rgb(197, 192, 195) none repeat scroll 0 0;
      color:rgb(238, 243, 234);
      font-size:130%;
      height:40px;
      left:-55px;
      line-height:30%;
      padding:20px 0 5px;
      position:absolute;
      text-align:center;
      text-transform:uppercase;
      top:0;
      width:54px;
  }
  #block3 .date span {
      display:block;
      font-size:170%;
      font-style:italic;
      font-variant:normal;
      letter-spacing:-1px;
      line-height:90%;
  }
  #block3 .tags {
      text-transform:capitalize;
  }
  #block3 .tags a{
      color:rgb(247, 244, 245);
      font-weight:bold;
  }
  #block3 h1, h2 {
      color:#2B2B2B;
      font-size:190%;
      font-weight:bold;
      letter-spacing:-1px;
      line-height:100%;
      margin-left:-2px;
      padding:0 0 8px;
  }
  </style>
</head>
<body>

  <div>

          <p><span>Bienvenido: ${nombre}</span></p>
           
          <h1></h1>
           
          <p class="tags"> 
          Sus puntos acumulados son ${puntos}
           </div>
  </body>

  </html>`

var mailOptions = {
  from: data.from,
  to: data.to,
  subject: data.subject,
  text:  data.text,
  html: elHtml
};
transporter.sendMail(mailOptions, function(error, info){
  if (error){
      console.log(error);
      res.send(500, err.message);
  } else {
      console.log("Email enviado...");
      res.status(200).json(req.body);
  }
});
}

module.exports = query;
