const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('link-to-mongodb', (err, database) => {
    // ... start the server
})

app.listen(3000, function () {
    console.log('listening on 3000')
})