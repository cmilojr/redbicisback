const dbcollection = "redbici"
const collection = "bici"

const { MongoClient, ServerApiVersion } = require('mongodb');
const dburl = "mongodb+srv://camilo:camilo@cluster0.1titkjb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(dburl, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




function insertData() {
    client.connect(err => {
        if (err) throw err
        const collection = client.db(dbcollection).collection(collection);
        const user = {
            userId: "123",
            bikes: [
                {
                    idBike: 1,
                    color: "yellow",
                    type: "route",
                    latitude: "38.8951",
                    longitud: "-77.0364"
                }
            ]
        }
        collection.insertOne(user, (err) => {
            if (err) throw err;
            console.log("1 document inserted");
            client.close();
        })
    });
}

function findById(id) {
    const query = { "id": id };
    return new Promise(function (resolve, reject) {
        MongoClient.connect(dburl, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbcollection);
            dbo.collection(collection).find(query).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });
    });
}

async function allBicis() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(dburl, function (err, db) {
            console.log("entre 2")
            if (err) throw err;
            var dbo = db.db(dbcollection);
            console.log(dbo)
            dbo.collection(collection).find({}).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });
    });
}

async function updateBici(id, values) {
    MongoClient.connect(dburl, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbcollection);
        var myquery = { id: id };
        var newvalues = { $set: values };
        dbo.collection(collection).updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    });
}

async function removeById(id) {
    MongoClient.connect(dburl, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbcollection);
        var myquery = { id: id };
        dbo.collection(collection).deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
}

module.exports = {
    insertData, 
    findById, 
    allBicis, 
    updateBici, 
    removeById,
}