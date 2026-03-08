const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2/promise');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
require('dotenv').config();



// Configuration Handlebars avec helper `eq`
const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: false,
  helpers: {
    json: context => JSON.stringify(context),
    includes: (arr, val) => Array.isArray(arr) && arr.includes(val),
    eq: (a, b) => a === b,
     ne: (a, b) => a !== b
  }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(require('./middleware/auth').verifyToken);

// connexion to the database
const db = require('./config/database');
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Rendre la BDD accessible dans les routes
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Add protected route example
const { verifyToken } = require('./middleware/auth');
app.get('/profil', verifyToken, (req, res) => {
    res.render('profil', { user: req.user }); // req.user is set by verifyToken
});




// Route de recherche
app.get('/search', async (req, res) => {
    const {
        carBrand,
        carModel,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        fuelType,
        transmission,
        category,
        maxMileage
    } = req.query;

    let sql = `
            SELECT c.*, 
            (SELECT image_url FROM caradsimages WHERE carads_id = c.id LIMIT 1) AS image 
            FROM carads c 
            WHERE 1=1
            `;
    const params = [];

    if (carBrand) { sql += " AND carBrand = ?"; params.push(carBrand); }
    if (carModel) { sql += " AND carModel = ?"; params.push(carModel); }
    if (fuelType) { sql += " AND energy = ?"; params.push(fuelType); }
    if (transmission) { sql += " AND gearbox = ?"; params.push(transmission); }
    if (category) { sql += " AND carType = ?"; params.push(category); }
    if (minPrice) { sql += " AND price >= ?"; params.push(minPrice); }
    if (maxPrice) { sql += " AND price <= ?"; params.push(maxPrice); }
    if (minYear) { sql += " AND year >= ?"; params.push(minYear); }
    if (maxYear) { sql += " AND year <= ?"; params.push(maxYear); }
    if (maxMileage) { sql += " AND currentMiles <= ?"; params.push(maxMileage); }

    const [cars] = await db.query(sql, params);
    const [brandsRows] = await db.query("SELECT DISTINCT carBrand FROM carads");
    const [modelsRows] = await db.query("SELECT DISTINCT carModel FROM carads");
    const [fuelTypesRows] = await db.query("SELECT DISTINCT energy FROM carads");
    const [transmissionRows] = await db.query("SELECT DISTINCT gearbox FROM carads");
    const [categoriesRows] = await db.query("SELECT DISTINCT carType FROM carads");

    res.render('index', {
        brands: brandsRows.map(r => r.carBrand),
        models: modelsRows.map(r => r.carModel),
        fuelTypes: fuelTypesRows.map(r => r.energy),
        transmissions: transmissionRows.map(r => r.gearbox),
        categories: categoriesRows.map(r => r.carType),
        cars
    });
});

// Authentification
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
;

// Serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé : http://localhost:${PORT}`);
});

