import cliente from "../models";
const query = {};

query.get = (req, res) => {
  cliente.get(req, res, req.query);
};

query.post = (req, res) => {
  cliente.post(req, res, req.body);
};

query.correo = (req,res) => {
  cliente.correo(req,res,req.body);
}

query.productos = (req,res) => {
  cliente.productos(req,res,req.body);
}

module.exports = query;
