
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { insertData, allBicis, findById, removeById} = require("./src/db");
// defining the Express app
const app = express();

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// starting the server
app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port: '+process.env.PORT);
});

app.get('/', (req, res) => {
    insertData()
    res.status(200)
})

app.get('/prueba', (req, res) => {
    console.log("entre")
    res.status(200).send({
        message: "Hola Prueba"
    })
})

app.get("/list", (req, res)=> {
    console.log("entre 1")
    allBicis().then(bicis => {
        let b = bicis.find((x) => x.id == req.params.id)
        res.send(b);
    }).catch((err) => {
        console.log("entre")
        console.log(err)
    });
})

app.post("user:/create", (req, res) => {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    insertData(bici).then(() => res.send(200));
})

app.post(":id/delete", (req, res) => {
    removeById(req.body.id).then(() => res.redirect("/bicicletas"));
})

app.post("id:/update", (req, res) => {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    update(req.body.id, bici).then(() => res.redirect("/bicicletas"));
})
