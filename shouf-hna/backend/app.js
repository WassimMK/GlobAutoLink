const express = require("express")
const app = express()
const path = require("path")
const bcrypt = require("bcrypt")
const mysql = require("mysql2")



// Connect to MySQL -----------------------------------------------------------------------------------------

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'globeautolink',
    port: 3306 
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// end MySQL connection  ------------------------------------------------------------------------------------

const publicDirectory = path.join(__dirname, "./public")
app.use(express.static(publicDirectory))
app.set("view engine", "hbs")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Define routes
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))


app.listen(3000)