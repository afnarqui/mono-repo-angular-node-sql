require("dotenv").config();
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from 'cors';
const app = express();
const routes = require("./src/router");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(__dirname + '/public'));

app.use("/", routes);

app.use(cors({
  origin: true,
  credentials: true
}));

app.all('/*', function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*"); 
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
if (req.method == 'OPTIONS') {
  res.status(200).end()
} else {
  next()
}
})

const server = http.createServer(app);

server.listen(process.env.DB_PORT, () => {
  console.log("servidor corriendo en el puerto: ", server.address().port);
});
