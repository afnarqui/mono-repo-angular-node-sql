import express from "express";
import cliente from "../controllers/clientes";

const router = express.Router();

router.get("/clientes", function(req, res) {
  cliente.get(req, res, req.body);
});

router.post("/clientes", function(req, res) {
  cliente.post(req, res, req.body);
});

router.post('/correo', function(req,res){
  cliente.correo(req,res,req.body);
})

router.get('/productos', function(req,res){
  cliente.productos(req,res,req.body);
})

router.post('/ventas', function(req,res){
  cliente.ventas(req,res,req.body);
})

module.exports = router;
