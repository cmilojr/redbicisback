
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { insertData, allBicis, removeById, updateBici} = require("./src/db");
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

app.get("/list", (req, res)=> {
    allBicis().then(bicis => {
        //let b = bicis.find((x) => x.id == req.params.id)
        res.send(bicis);
    }).catch((err) => {
        console.log("entre")
        console.log(err)
    });
})

app.post("/create", (req, res) => {
    insertData(req.body).then(() => res.send(200));
})

app.post("/delete", (req, res) => {
    removeById(req.body.id).then(() => res.send(200));
})

app.post("/update", (req, res) => {
    updateBici(req.body.userId, req.body).then(() => res.send(200));
})

/*

{"userId":"12345","bikes":[{"idBike":{"$numberInt":"1"},"color":"yellow","type":"route","latitude":"38.8951","longitud":"-77.0364"}]}

*/