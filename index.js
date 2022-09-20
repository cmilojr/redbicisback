
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { allBicis, findById, removeById} = require("./src/db");
// defining the Express app
const app = express();

var MongoClient = require('mongodb').MongoClient;

const dburl = "mongodb://127.0.0.1:27017/"
const dbcollection = "redbici"
const collection = "bici"

var mongoose = require('mongoose');
 

function insertData(query) {
    console.log("p1")
    MongoClient.connect(dburl, (err, db) => {
        console.log(err)
        console.log(db)
        if (err) throw err;
        var dbo = db.db(dbcollection);
        // dbo.collection(collection).insertOne(query, function (err, res) {
        //     if (err) throw err;
        //     console.log("1 document inserted");
        //     db.close();
        // });
    });
}


// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads

// mongoose.connect("mongodb+srv://camilo:camilo@cluster0.1titkjb.mongodb.net/test", function (err) {
//     console.log(err)

//     if (err) throw err;
  
//     console.log('Successfully connected');
  
//  });
// });

// starting the server
app.listen(3002, () => {
    console.log('listening on port 3001');
});

app.get('/', (req, res) => {
    console.log("entre")
    res.send({
        message: "Hola"
    })
})

app.get('/prueba', (req, res) => {
    console.log("entre")
    res.send({
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
