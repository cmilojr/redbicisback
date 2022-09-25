const dbcollection = "redbici"
const collection = "bicis"

const { MongoClient, ServerApiVersion } = require('mongodb');
const dburl = "mongodb+srv://camilo:camilo@cluster0.1titkjb.mongodb.net/?retryWrites=true&w=majority";

function insertData(query) {
    MongoClient.connect(dburl, (err, client) => {
        if (err) throw err
        const db = client.db(dbcollection).collection(collection);
        db.insertOne(query, (err) => {
            if (err) throw err;
            console.log("1 document inserted");
            client.close();
        })
    });
}

async function allBicis() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(dburl, (err, db) => {
            if (err) throw err;
            var dbo = db.db(dbcollection);
            dbo.collection(collection).find({}).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });
    });
}

async function updateBici(id, values) {
    console.log(values)
    MongoClient.connect(dburl, (err, db) => {
        if (err) throw err;
        var dbo = db.db(dbcollection);
        var myquery = { userId: id };
        var newvalues = { $set: values };
        console.log(newvalues)
        dbo.collection(collection).updateOne(myquery, newvalues, (err) => {
                if (err)
                    throw err;
                console.log("1 document updated");
                db.close();
            });
    });
}
// TODO -  Sin terminar
function findById(id) {
    const query = { "id": id };
    return new Promise(function (resolve, reject) {
        MongoClient.connect(dburl, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbcollection);
            dbo.collection(collection).find(query).toArray((err, result) => {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });
    });
}

async function removeById(id) {
    MongoClient.connect(dburl, (err, db) => {
        if (err) throw err;
        var dbo = db.db(dbcollection);
        var myquery = { userId: id };
        dbo.collection(collection).deleteOne(myquery, (err, obj) => {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
}

module.exports = {
    insertData, 
    allBicis, 
    updateBici, 
    removeById,
}