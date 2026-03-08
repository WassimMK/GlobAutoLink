const express = require('express')
const router = express.Router()
const { verifyToken, requireAdmin } = require('../middleware/auth');


router.get('/', async (req, res) => {
    const db = req.db;
    const {
        carType,
        carBrand,
        carModel,
        minYear,
        maxYear,
        fuel,
        minPrice,
        maxPrice,
        sort,
        gearbox,
        maxMileage
    } = req.query;

    let sql = `
    SELECT c.*, 
    (SELECT image_url FROM caradsimages WHERE carads_id = c.id LIMIT 1) AS image 
    FROM carads c 
    WHERE 1=1
    `;

    const params = [];

    if (carType) { sql += " AND carType = ?"; params.push(carType); }
    if (carBrand) { sql += " AND carBrand = ?"; params.push(carBrand); }
    if (carModel) { sql += " AND carModel = ?"; params.push(carModel); }

    const minYearInt = parseInt(minYear, 10);
    const maxYearInt = parseInt(maxYear, 10);

    if (!isNaN(minYearInt)) {
        sql += " AND year >= ?";
        params.push(minYearInt);
    }

    if (!isNaN(maxYearInt)) {
        sql += " AND year <= ?";
        params.push(maxYearInt);
    }

    if (fuel) { sql += " AND energy = ?"; params.push(fuel); }
    if (gearbox) { sql += " AND gearbox = ?"; params.push(gearbox); }
    if (minPrice) { sql += " AND price >= ?"; params.push(minPrice); }
    if (maxPrice) { sql += " AND price <= ?"; params.push(maxPrice); }
    if (maxMileage) { sql += " AND currentMiles <= ?"; params.push(maxMileage); }

    let sortClause = " ORDER BY year DESC";
    if (sort === 'oldest') sortClause = " ORDER BY year ASC";
    if (sort === 'priceLow') sortClause = " ORDER BY price ASC";
    if (sort === 'priceHigh') sortClause = " ORDER BY price DESC";

    try {
        const [cars] = await db.query(sql + sortClause, params);

        // Check if cars are in favorites for logged-in users
        let favorites = [];
        if (req.user) {
            const [favoritesResult] = await db.query(
                'SELECT car_id FROM user_favorites WHERE user_id = ?',
                [req.user.id]
            );
            favorites = favoritesResult.map(f => f.car_id);
        }

        // Add isFavorite property to each car
        const carsWithFavorites = cars.map(car => ({
            ...car,
            isFavorite: favorites.includes(car.id)
        }));

        const [brandsRows] = await db.query("SELECT DISTINCT carBrand FROM carads");
        const [modelsRows] = await db.query("SELECT DISTINCT carModel FROM carads");
        const [typesRows] = await db.query("SELECT DISTINCT carType FROM carads");
        const [energiesRows] = await db.query("SELECT DISTINCT energy FROM carads");
        const [gearboxesRows] = await db.query("SELECT DISTINCT gearbox FROM carads");

        res.render('index', {
            cars: carsWithFavorites,
            brands: brandsRows.map(r => r.carBrand),
            models: modelsRows.map(r => r.carModel),
            categories: typesRows.map(r => r.carType),
            fuelTypes: energiesRows.map(r => r.energy),
            transmissions: gearboxesRows.map(r => r.gearbox),
            user: req.user
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
// Route pour privacy policy 
router.get('/privacypolicy', (req, res) => {
  res.render('privacypolicy', { user: req.user });
});
// Route pour afficher le profil de l'utilisateur

router.get('/profil', verifyToken, async (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  const db = req.db;
  const userid = req.user.id; 

  try {
    const [userData] = await db.query(
      'SELECT fullname, email, phone_number as phone, address, wilaya, baladiya FROM users WHERE id = ?', 
      [userid]
    );

    if (!userData || userData.length === 0) {
      return res.status(404).send("User not found");
    }

    // Merge user data with req.user
    const user = { ...req.user, ...userData[0] };
    
    res.render('profil', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

router.get("/signup", (req, res) => {
    res.render("signup.hbs");
});
router.get("/login", (req, res) => {
    res.render("login.hbs");
});
router.get("/recentlyadded", async (req, res) => {
  const db = req.db;
  const {
    carType,
    carBrand,
    carModel,
    year,
    fuel,
    minPrice,
    maxPrice,
    sort,
    gearbox,
    maxMileage
  } = req.query;

  let sql = `
    SELECT c.*, 
    (SELECT image_url FROM caradsimages WHERE carads_id = c.id LIMIT 1) AS image 
    FROM carads c 
    WHERE 1=1
  `;

  const params = [];

  if (carType) { sql += " AND carType = ?"; params.push(carType); }
  if (carBrand) { sql += " AND carBrand = ?"; params.push(carBrand); }
  if (carModel) { sql += " AND carModel = ?"; params.push(carModel); }
  if (year) { sql += " AND year = ?"; params.push(year); }
  if (fuel) { sql += " AND energy = ?"; params.push(fuel); }
  if (gearbox) { sql += " AND gearbox = ?"; params.push(gearbox); }
  if (minPrice) { sql += " AND price >= ?"; params.push(minPrice); }
  if (maxPrice) { sql += " AND price <= ?"; params.push(maxPrice); }
  if (maxMileage) { sql += " AND currentMiles <= ?"; params.push(maxMileage); }

  // Tri par date de scraping, donc "récemment ajoutés"
  let sortClause = " ORDER BY scraped_date DESC";
  if (sort === 'priceLow') sortClause = " ORDER BY price ASC";
  if (sort === 'priceHigh') sortClause = " ORDER BY price DESC";

  try {
    const [cars] = await db.query(sql + sortClause, params);

    const [brandsRows] = await db.query("SELECT DISTINCT carBrand FROM carads");
    const [modelsRows] = await db.query("SELECT DISTINCT carModel FROM carads");
    const [typesRows] = await db.query("SELECT DISTINCT carType FROM carads");
    const [energiesRows] = await db.query("SELECT DISTINCT energy FROM carads");
    const [gearboxesRows] = await db.query("SELECT DISTINCT gearbox FROM carads");
    // Add favorite status check
    let favorites = [];
    if (req.user) {
        const [favoritesResult] = await db.query(
            'SELECT car_id FROM user_favorites WHERE user_id = ?',
            [req.user.id]
        );
        favorites = favoritesResult.map(f => f.car_id);
    }

    const carsWithFavorites = cars.map(car => ({
        ...car,
        isFavorite: favorites.includes(car.id)
    }));

    res.render("recentlyadded", {
      cars: carsWithFavorites,
      brands: brandsRows.map(r => r.carBrand),
      models: modelsRows.map(r => r.carModel),
      types: typesRows.map(r => r.carType),
      energies: energiesRows.map(r => r.energy),
      gearboxes: gearboxesRows.map(r => r.gearbox),
      user: req.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});
// Route pour la page about
router.get("/about", (req, res) => {
  res.render("about", { user: req.user });
});
// Route pour la page d'accueil de l'admin
router.get("/admin", (req, res) => {
  res.redirect("/admin/users");
});
// Route pour la page des offres
router.get("/offers", (req, res) => {
  res.render("offers", { user: req.user });
});
// Route pour la page des questions fréquentes
router.get("/frequentlyquestions", (req, res) => {
  res.render("frequentlyquestions", { user: req.user });
});
// Route pour les offres personnalisées
router.get("/personalisedoffers", (req, res) => {
  res.render("personalisedoffers", { user: req.user });
});
// Route pour la page de basicoffer
router.get("/basicoffer", (req, res) => {
  res.render("basicoffer", { user: req.user });
});
// Route pour la page de premiumoffer
router.get("/premiumoffer", (req, res) => {
  res.render("premiumoffer", { user: req.user });
});
// Route pour la page de businessoffer
router.get("/standardoffer", (req, res) => { 
  res.render("standardoffer", { user: req.user });
});
// Route pour la page de support
router.get("/support", (req, res) => { 
  res.render("support", { user: req.user });
});
router.get('/electric', async (req, res) => {
    const db = req.db;
    const {
        carType,
        carBrand,
        carModel,
        year,
        fuel,
        minPrice,
        maxPrice,
        sort,
        gearbox,
        maxMileage,
        minYear,
        maxYear
    } = req.query;

    let sql = `
    SELECT c.*, 
    (SELECT image_url FROM caradsimages WHERE carads_id = c.id LIMIT 1) AS image 
    FROM carads c 
    WHERE energy = 'Électrique'
    `;

    const params = [];

    if (carType) { sql += " AND carType = ?"; params.push(carType); }
    if (carBrand) { sql += " AND carBrand = ?"; params.push(carBrand); }
    if (carModel) { sql += " AND carModel = ?"; params.push(carModel); }
    if (year) { sql += " AND year = ?"; params.push(year); }
    if (fuel) { sql += " AND energy = ?"; params.push(fuel); } // permet de filtrer hybride/électrique si besoin
    if (gearbox) { sql += " AND gearbox = ?"; params.push(gearbox); }
    if (minPrice) { sql += " AND price >= ?"; params.push(minPrice); }
    if (maxPrice) { sql += " AND price <= ?"; params.push(maxPrice); }
    if (maxMileage) { sql += " AND currentMiles <= ?"; params.push(maxMileage); }

    const minYearInt = parseInt(minYear, 10);
    const maxYearInt = parseInt(maxYear, 10);

    if (!isNaN(minYearInt)) {
        sql += " AND year >= ?";
        params.push(minYearInt);
    }

    if (!isNaN(maxYearInt)) {
        sql += " AND year <= ?";
        params.push(maxYearInt);
    }

    let sortClause = " ORDER BY year DESC";
    if (sort === 'oldest') sortClause = " ORDER BY year ASC";
    if (sort === 'priceLow') sortClause = " ORDER BY price ASC";
    if (sort === 'priceHigh') sortClause = " ORDER BY price DESC";

    try {
        const [cars] = await db.query(sql + sortClause, params);

        const [brandsRows] = await db.query("SELECT DISTINCT carBrand FROM carads WHERE energy = 'Électrique'");
        const [modelsRows] = await db.query("SELECT DISTINCT carModel FROM carads WHERE energy = 'Électrique'");
        const [typesRows] = await db.query("SELECT DISTINCT carType FROM carads WHERE energy = 'Électrique'");
        const [energiesRows] = await db.query("SELECT DISTINCT energy FROM carads WHERE energy = 'Électrique'");
        const [gearboxesRows] = await db.query("SELECT DISTINCT gearbox FROM carads WHERE energy = 'Électrique'");
        const currentYear = new Date().getFullYear();
        const yearsRows = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

        // Add favorite status check
        let favorites = [];
        if (req.user) {
            const [favoritesResult] = await db.query(
                'SELECT car_id FROM user_favorites WHERE user_id = ?',
                [req.user.id]
            );
            favorites = favoritesResult.map(f => f.car_id);
        }

        const carsWithFavorites = cars.map(car => ({
            ...car,
            isFavorite: favorites.includes(car.id)
        }));

        res.render('electric', {
            cars: carsWithFavorites,
            brands: brandsRows.map(r => r.carBrand),
            models: modelsRows.map(r => r.carModel),
            types: typesRows.map(r => r.carType),
            energies: energiesRows.map(r => r.energy),
            gearboxes: gearboxesRows.map(r => r.gearbox),
            years: yearsRows,
            user: req.user
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
});

// favorites get router 
router.get('/favorites', verifyToken, async (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }

    const db = req.db;
    const userId = req.user.id;

    try {
        const [favorites] = await db.query(`
            SELECT c.*, 
            (SELECT image_url FROM caradsimages WHERE carads_id = c.id LIMIT 1) AS image 
            FROM carads c
            JOIN user_favorites uf ON c.id = uf.car_id
            WHERE uf.user_id = ?
        `, [userId]);

        res.render('favorites', { 
            cars: favorites,
            user: req.user 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// -3 get router 
router.get('/less3years', async (req, res) => {
    const db = req.db;
    const {
        carType,
        carBrand,
        carModel,
        year,
        fuel,
        minPrice,
        maxPrice,
        sort,
        gearbox,
        maxMileage,
        minYear,
        maxYear
    } = req.query;

    let sql = `
  SELECT c.*, 
  (SELECT image_url FROM caradsimages WHERE carads_id = c.id LIMIT 1) AS image 
  FROM carads c 
  WHERE year >= YEAR(CURDATE()) - 3
  `;

    const params = [];

    if (carType) { sql += " AND carType = ?"; params.push(carType); }
    if (carBrand) { sql += " AND carBrand = ?"; params.push(carBrand); }
    if (carModel) { sql += " AND carModel = ?"; params.push(carModel); }
    if (year) { sql += " AND year = ?"; params.push(year); }
    if (fuel) { sql += " AND energy = ?"; params.push(fuel); }
    if (gearbox) { sql += " AND gearbox = ?"; params.push(gearbox); }
    if (minPrice) { sql += " AND price >= ?"; params.push(minPrice); }
    if (maxPrice) { sql += " AND price <= ?"; params.push(maxPrice); }
    if (maxMileage) { sql += " AND currentMiles <= ?"; params.push(maxMileage); }

    const minYearInt = parseInt(minYear, 10);
    const maxYearInt = parseInt(maxYear, 10);

    if (!isNaN(minYearInt)) {
        sql += " AND year >= ?";
        params.push(minYearInt);
    }

    if (!isNaN(maxYearInt)) {
        sql += " AND year <= ?";
        params.push(maxYearInt);
    }

    let sortClause = " ORDER BY year DESC";
    if (sort === 'oldest') sortClause = " ORDER BY year ASC";
    if (sort === 'priceLow') sortClause = " ORDER BY price ASC";
    if (sort === 'priceHigh') sortClause = " ORDER BY price DESC";

    try {
       const [cars] = await db.query(sql + sortClause, params);

       const [brandsRows] = await db.query("SELECT DISTINCT carBrand FROM carads");
       const [modelsRows] = await db.query("SELECT DISTINCT carModel FROM carads");
       const [typesRows] = await db.query("SELECT DISTINCT carType FROM carads");
       const [energiesRows] = await db.query("SELECT DISTINCT energy FROM carads");
       const [gearboxesRows] = await db.query("SELECT DISTINCT gearbox FROM carads");
       const currentYear = new Date().getFullYear();
       const yearsRows = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

       // Add favorite status check
       let favorites = [];
       if (req.user) {
           const [favoritesResult] = await db.query(
               'SELECT car_id FROM user_favorites WHERE user_id = ?',
               [req.user.id]
           );
           favorites = favoritesResult.map(f => f.car_id);
       }

       const carsWithFavorites = cars.map(car => ({
           ...car,
           isFavorite: favorites.includes(car.id)
       }));

       res.render('less3years', {
         cars: carsWithFavorites,
         brands: brandsRows.map(r => r.carBrand),
         models: modelsRows.map(r => r.carModel),
         types: typesRows.map(r => r.carType),
         energies: energiesRows.map(r => r.energy),
         gearboxes: gearboxesRows.map(r => r.gearbox),
         years: yearsRows,
         user: req.user
       });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// car details route 

router.get('/cardetails/:id', async (req, res) => {
    const db = req.db;
    const carId = req.params.id;

    try {
        const [[car]] = await db.query('SELECT * FROM carads WHERE id = ?', [carId]);
        if (!car) return res.status(404).send("Voiture introuvable");

        const [images] = await db.query('SELECT * FROM caradsimages WHERE carads_id = ? LIMIT 10', [carId]);

        const [similarCars] = await db.query(`SELECT c.*, 
           (SELECT image_url FROM caradsimages WHERE carads_id = c.id LIMIT 1) AS image
            FROM carads c 
            WHERE (carBrand = ? OR year = ?) AND id != ? LIMIT 2
            `, [car.carBrand, car.year, carId]
        );

        // Check if the car is in user's favorites
        let isFavorite = false;
        if (req.user) {
            const [favorites] = await db.query(
                'SELECT * FROM user_favorites WHERE user_id = ? AND car_id = ?',
                [req.user.id, carId]
            );
            isFavorite = favorites.length > 0;
        }

        res.render('cardetails', {
            car,
            images,
            similarCars,
            user: req.user,
            isFavorite
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
});
// ROUTES ADMIN POUR LA GESTION DES UTILISATEURS

// Voir tous les utilisateurs
router.get('/admin/users', verifyToken, requireAdmin, async (req, res) => {
  const db = req.db;
  try {
    const [users] = await db.query('SELECT * FROM users');
    res.render('admin', { users, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

// Formulaire d’édition
router.get('/admin/users/edit/:id', verifyToken, requireAdmin, async (req, res) => {
  const db = req.db;
  const userId = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) return res.status(404).send("Utilisateur non trouvé");
    res.render('edituser', { targetUser: rows[0], user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors du chargement de l'utilisateur");
  }
});


router.post('/admin/users/edit/:id', verifyToken, requireAdmin, async (req, res) => {
  const db = req.db;
  const userId = req.params.id;

  // Vérifie les champs reçus
  console.log("Requête reçue :", req.body);

  const {
    fullname,
    email,
    phonenumber,
    address,
    wilaya,
    baladiya,
    country,
    role
  } = req.body;

  try {
    const [rows] = await db.query('SELECT role FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) return res.status(404).send('Utilisateur non trouvé');

    const currentRole = rows[0].role;

    let updateQuery = `
      UPDATE users SET fullname = ?, email = ?, phonenumber = ?, address = ?, wilaya = ?, baladiya = ?, country = ?
    `;
    const params = [fullname, email, phonenumber, address, wilaya, baladiya, country];

    if (currentRole !== 'admin') {
      updateQuery += `, role = ?`;
      params.push(role);
    }

    updateQuery += ` WHERE id = ?`;
    params.push(userId);

    await db.query(updateQuery, params);

    res.redirect('/admin/users');
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err); // 🔥 Affiche l’erreur précise
    res.status(500).send("Erreur serveur");
  }
});
// Voir les favoris d'un utilisateur
router.get('/admin/users/:id/favorites', requireAdmin, async (req, res) => {
  const db = req.db;
  const userId = req.params.id;

  try {
    console.log("➡️ ID utilisateur :", userId);

    // 🔽 On récupère les infos du user ciblé (et pas l'admin)
    const [[user]] = await db.query(`SELECT id, username FROM users WHERE id = ?`, [userId]);

    const [favorites] = await db.query(`
      SELECT c.*,
             (SELECT image_url FROM caradsimages WHERE carads_id = c.id LIMIT 1) AS image
      FROM carads c
      JOIN user_favorites uf ON uf.car_id = c.id
      WHERE uf.user_id = ?
    `, [userId]);

    console.log("📦 Favoris récupérés :", favorites);

    res.render('userfavorites', {
      cars: favorites,
      user,           // ✅ user ciblé par l’URL
      layout: false
    });

  } catch (error) {
    console.error("❌ Erreur SQL :", error);
    res.status(500).send("Erreur lors de la récupération des favoris");
  }
});

// Supprimer un utilisateur
router.post('/admin/users/delete/:id', verifyToken, requireAdmin, async (req, res) => {
  const db = req.db;
  const userId = req.params.id;
  try {
    await db.query('DELETE FROM users WHERE id = ?', [userId]);
    res.redirect('/admin/users');
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});
// 🔧 Affiche toutes les voitures
router.get('/admin/cars', verifyToken, requireAdmin, async (req, res) => {
  const db = req.db;
  try {
    const [cars] = await db.query(`
      SELECT c.*, 
      (SELECT image_url FROM caradsimages WHERE carads_id = c.id LIMIT 1) AS image
      FROM carads c
    `);
    res.render('admin-cars', { cars, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors du chargement des voitures");
  }
});
// Afficher le formulaire de modification d'une voiture
router.get('/admin/cars/edit/:id', verifyToken, requireAdmin, async (req, res) => {
  const db = req.db;
  const carId = req.params.id;

  try {
    const [[car]] = await db.query('SELECT * FROM carads WHERE id = ?', [carId]);
    if (!car) return res.status(404).send("Car not found");

    // 🔧 Récupérer l’image associée
    const [[imageRow]] = await db.query(
      'SELECT image_url FROM caradsimages WHERE carads_id = ? LIMIT 1',
      [carId]
    );

    const image = imageRow ? imageRow.image_url : null;

    res.render('edit-cars', { car, image, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading car");
  }
});

// Enregistrer les modifications
router.post('/admin/cars/edit/:id', verifyToken, requireAdmin, async (req, res) => {
  const db = req.db;
  const carId = req.params.id;
  const {
    carBrand,
    carModel,
    year,
    currentMiles,
    price,
    energy,
    gearbox,
    carType,
    country
  } = req.body;

  try {
    await db.query(`
      UPDATE carads SET carBrand = ?, carModel = ?, year = ?, currentMiles = ?, price = ?, energy = ?, gearbox = ?, carType = ?, country = ?
      WHERE id = ?
    `, [carBrand, carModel, year, currentMiles, price, energy, gearbox, carType, country, carId]);

    res.redirect('/admin/cars');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating car");
  }
});
router.get('/admin/cars/delete/:id', verifyToken, requireAdmin, async (req, res) => {
  const db = req.db;
  const carId = req.params.id;
  try {
    await db.query('DELETE FROM carads WHERE id = ?', [carId]);
    res.redirect('/admin/cars');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting car");
  }
});

// 🔧 Affiche les chats avec les utilisateurs
router.get('/admin/chats', verifyToken, requireAdmin, async (req, res) => {
  const db = req.db;
  try {
    const [chats] = await db.query(`
      SELECT 
        ch.id AS chat_id,
        u.username AS user_name,
        u.email AS user_email,
        u.registration_date AS user_created_at,
        ch.updated_at AS chat_updated_at,
        (
          SELECT m.message 
          FROM messages m 
          WHERE m.chat_id = ch.id 
            AND m.sender_id = ch.user_id
          ORDER BY m.created_at DESC 
          LIMIT 1
        ) AS last_message
      FROM chats ch
      JOIN users u ON u.id = ch.user_id
      ORDER BY ch.updated_at DESC
    `);

    res.render('admin-chats', { chats, user: req.user });
  } catch (err) {
    console.error("Erreur SQL dans /admin/chats :", err);
    res.status(500).send("Erreur lors du chargement des chats");
  }
});

// Route pour supprimer un chat
router.post('/admin/chats/:chatId/delete', verifyToken, requireAdmin, async (req, res) => {
  const db = req.db;
  const chatId = req.params.chatId;

  try {
    // Supprimer les messages liés au chat
    await db.query('DELETE FROM messages WHERE chat_id = ?', [chatId]);

    // Supprimer le chat
    await db.query('DELETE FROM chats WHERE id = ?', [chatId]);

    res.redirect('/admin/chats');
  } catch (err) {
    console.error('Erreur lors de la suppression du chat :', err);
    res.status(500).send("Erreur lors de la suppression.");
  }
});

// Route pour afficher un chat spécifique
router.get('/chat', verifyToken, async (req, res) => {
  const db = req.db;
  const userId = req.user.id;

  try {
    // Trouver le chat de l'utilisateur
    const [existingChat] = await db.query('SELECT id FROM chats WHERE user_id = ?', [userId]);

    if (existingChat.length === 0) {
      // Créer le chat s’il n’existe pas
      await db.query('INSERT INTO chats (user_id) VALUES (?)', [userId]);
      return res.redirect('/chat');
    }

    const chatId = existingChat[0].id;

    // Récupérer les messages
    const [messages] = await db.query(
      `SELECT m.message, m.sender_id
       FROM messages m
       WHERE m.chat_id = ?
       ORDER BY m.created_at ASC`,
      [chatId]
    );

    // Marquer si le message est envoyé par l'utilisateur ou pas
    const formattedMessages = messages.map(msg => ({
      message: msg.message,
      isUser: msg.sender_id === userId
    }));

    res.render('chat', {
      user: req.user,
      messages: formattedMessages
    });

  } catch (error) {
    console.error('Erreur dans GET /chat :', error);
    res.status(500).send('Erreur lors du chargement du chat.');
  }
});



// Route pour envoyer un message dans le chat
router.post('/chat/send', verifyToken, async (req, res) => {
  const db = req.db;
  const userId = req.user.id;
  const { message } = req.body;

  try {
    // Vérifie si un chat existe déjà
    const [existing] = await db.query('SELECT id FROM chats WHERE user_id = ?', [userId]);
    let chatId;

    if (existing.length === 0) {
      const [result] = await db.query('INSERT INTO chats (user_id) VALUES (?)', [userId]);
      chatId = result.insertId;
    } else {
      chatId = existing[0].id;
    }

    const [msgResult] = await db.query(
      'INSERT INTO messages (chat_id, sender_id, message) VALUES (?, ?, ?)',
      [chatId, userId, message]
    );

    res.status(200).json({ success: true, message }); // ✅ réponse AJAX
  } catch (error) {
    console.error('Erreur lors de l’envoi du message :', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});
// Route pour afficher un chat spécifique pour l'admin
router.get('/admin/chats/:chatId', verifyToken, requireAdmin, async (req, res) => {
  const db = req.db;
  const chatId = req.params.chatId;
  const adminId = req.user.id;

  try {
    // Récupérer les infos du chat et de l'utilisateur associé
    const [[chatInfo]] = await db.query(`
      SELECT ch.*, u.username AS user_name
      FROM chats ch
      JOIN users u ON u.id = ch.user_id
      WHERE ch.id = ?
    `, [chatId]);

    if (!chatInfo) return res.status(404).send("Chat introuvable");

    // Récupérer les messages
    const [messages] = await db.query(`
      SELECT m.message, m.sender_id
      FROM messages m
      WHERE m.chat_id = ?
      ORDER BY m.created_at ASC
    `, [chatId]);

    // Marquer si c’est un message admin ou utilisateur
    const formattedMessages = messages.map(msg => ({
      message: msg.message,
      isUser: msg.sender_id !== adminId
    }));

    res.render('admin-chat-view', {
      user: req.user,
      chat_user: { username: chatInfo.user_name },
      messages: formattedMessages,
      chat_id: chatId
    });

  } catch (error) {
    console.error("Erreur dans GET /admin/chats/:chatId :", error);
    res.status(500).send("Erreur lors du chargement du chat.");
  }
});


// Route pour envoyer un message en tant qu'admin dans un chat spécifique
router.post('/admin/chats/:chatId/send', verifyToken, requireAdmin, async (req, res) => {
  const db = req.db;
  const adminId = req.user.id;
  const chatId = req.params.chatId;
  const { message } = req.body;

  try {
    if (!message || message.trim() === "") {
      return res.status(400).json({ success: false, error: "Message vide" });
    }

    // Vérifie que le chat existe
    const [chatExists] = await db.query('SELECT id FROM chats WHERE id = ?', [chatId]);
    if (chatExists.length === 0) {
      return res.status(404).json({ success: false, error: "Chat introuvable" });
    }

    // Insertion du message
    await db.query(
      'INSERT INTO messages (chat_id, sender_id, message) VALUES (?, ?, ?)',
      [chatId, adminId, message]
    );

    res.status(200).json({ success: true, message });
  } catch (err) {
    console.error("Erreur lors de l’envoi du message admin :", err);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});


module.exports = router;
