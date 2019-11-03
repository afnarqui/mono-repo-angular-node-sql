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

module.exports = router;
