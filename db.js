const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/songdb'; // local DB called "songdb"

mongoose.connect(dbUrl)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB locally!');
});

module.exports = db;
