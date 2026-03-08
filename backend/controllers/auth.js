const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require('../config/database');

//------------------------------------------------------------------
// Signup function to register a new user
exports.signup = async (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;

    try {
        // 1. Check if passwords match
        if (password !== passwordConfirm) {
            return res.render('signup', {
                message: "Passwords do not match",
                name,
                email
            });
        }

        // 2. Check if email exists (using await directly)
        const [results] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
        if (results.length > 0) {
            return res.render('signup', {
                message: "Email already in use",
                name,
                email: ""
            });
        }

        // 3. Hash password & create user
        const hashedPassword = await bcrypt.hash(password, 12);
        await db.query('INSERT INTO users SET ?', { 
            username: name, 
            email: email, 
            password: hashedPassword 
        });

        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.render('signup', {
            message: "An error occurred during registration",
            name,
            email
        });
    }
};
//------------------------------------------------------------------
// Login function to authenticate user and set JWT cookie
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if user exists
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.render('login', {
                message: "Invalid email or password",
                email
            });
        }

        const user = users[0];

        // 2. Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.render('login', {
                message: "Invalid email or password",
                email
            });
        }

        // 3. Create JWT token
        const token = jwt.sign(
    {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        role: user.role   // ✅ c’est cette ligne qui manquait !
    },
    process.env.SECRET_KEY || 'fallback_secret',
    { expiresIn: '1h' }
);


        // 4. Set cookie and redirect
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour
            secure: process.env.NODE_ENV === 'production'
        });

        res.redirect('/');
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', {
            message: "An error occurred during login",
            email
        });
    }
};

// Logout function to clear the JWT cookie and redirect to login
exports.logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/' // Assure que le bon cookie est ciblé
  });
  return res.redirect('/');
};

//------------------------------------------------------------------------
// Update Profile 
exports.updateProfile = async (req, res) => {
    if (!req.user) return res.redirect('/login');
    
    const userid = req.user.id; 
    const { fullname, email, phone, address, wilaya, baladiya } = req.body;
    
    try {
        await db.query(
            'UPDATE users SET fullname = ?, email = ?, phonenumber = ?, address = ?, wilaya = ?, baladiya = ? WHERE id = ?', 
            [fullname, email, phone, address, wilaya, baladiya, userid]
        );

        // Update JWT token with new user data
        const token = jwt.sign(
            { 
                id: userid, 
                email: email,
                fullname: fullname,
                phone: phone,
                address: address,
                wilaya: wilaya,
                baladiya: baladiya,
                 role: req.user.role
            },
            process.env.SECRET_KEY || 'fallback_secret',
            { expiresIn: '1h' }
        );

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 3600000,
            secure: process.env.NODE_ENV === 'production'
        });

        res.redirect('/profil');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send("An error occurred while updating your profile.");
    }
}

//------------------------------------------------------------------------
// Add Favorite Car
exports.addFavorite = async (req, res) => {
    if (!req.user) return res.redirect('/login');

    const user_id = req.user.id;
    const { car_id } = req.body; // Destructure car_id from req.body
    
    try {
        // Check if the car is already in favorites
        const [existingFavorites] = await db.query(
            'SELECT * FROM user_favorites WHERE user_id = ? AND car_id = ?',
            [user_id, car_id]
        );

        if (existingFavorites.length > 0) {
            return res.status(400).json({ success: false, message: "Car is already in your favorites." });
        }

        // Add to favorites
        await db.query(
            'INSERT INTO user_favorites (user_id, car_id) VALUES (?, ?)',
            [user_id, car_id]
        );

        return res.status(200).json({ success: true, message: "Car added to favorites successfully." });
    } catch (error) {
        console.error('Error adding favorite:', error);
        return res.status(500).json({ success: false, message: "An error occurred while adding the favorite." });
    }
}

// Remove from favorites
exports.removeFavorite = async (req, res) => {
    if (!req.user) return res.redirect('/login');

    const user_id = req.user.id;
    const { car_id } = req.body;

    try {
        // Check if the car exists in favorites
        const [existingFavorites] = await db.query(
            'SELECT * FROM user_favorites WHERE user_id = ? AND car_id = ?',
            [user_id, car_id]
        );

        if (existingFavorites.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Car is not in your favorites." 
            });
        }

        // Remove from favorites
        await db.query(
            'DELETE FROM user_favorites WHERE user_id = ? AND car_id = ?',
            [user_id, car_id]
        );

        return res.status(200).json({ 
            success: true, 
            message: "Car removed from favorites successfully." 
        });
    } catch (error) {
        console.error('Error removing favorite:', error);
        return res.status(500).json({ 
            success: false, 
            message: "An error occurred while removing the favorite." 
        });
    }
};
//------------------------------------------------------------------------
// checks if the user is subscribed
exports.checkSubscription = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const [rows] = await db.query('SELECT subscribed FROM users WHERE id = ?', [req.user.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const isSubscribed = rows[0].subscribed !== '0';
    res.json({ isSubscribed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};