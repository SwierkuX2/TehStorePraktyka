import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'


const salt = 10

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET'],
    credentials: true
}))
app.use(cookieParser())

const db = mysql.createConnection({ 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'teh_store_database'
})

const verifyUser = (req, res, next) => { 
    const token = req.cookies.Token
    if(!token) {
        return res.json({Error: "User not authenticated"})
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) =>{
            if(err) {
                return res.json({Error: "Token is not valid"})
            } else {
                req.nazwa = decoded.nazwa
                req.isAdmin = decoded.isAdmin   
                next()
            }
        })
    }
}


const verifyAdmin = (req, res, next) => {
    if (!req.isAdmin) {
        return res.status(403).json({ Error: "Admin only" });
    }
    next();
};

app.get('/', verifyUser, (req, res) => { 
    return res.json({
        Status: "User is authenticated",
        nazwa: req.nazwa,
        isAdmin: req.isAdmin   
    });
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Wszystkie pola są wymagane" });
    }

    const sql = "INSERT INTO uzytkownicy (nazwa, email, haslo) VALUES (?, ?, ?)";

    bcrypt.hash(password.toString(), salt, (err, hash) => {
        if (err) return res.status(500).json({ error: "Error hashing password" });

        db.query(sql, [name, email, hash], (err, data) => {
            if (err) {
                console.log(err); 
                return res.status(500).json({ Error: "Error inserting user into database" });
            }
            return res.status(201).json({ Status: "User registered successfully" });
        });
    });
});

app.post('/login', (req, res) => { 
    const sql = "SELECT * FROM uzytkownicy WHERE email = ?"

    db.query(sql, [req.body.email], (err, data) => {
        if(err) return res.json({Error: "Login error in server"})

        if(data.length > 0) { 
            bcrypt.compare(req.body.password.toString(), data[0].haslo, (err, response) => {

                if(err) return res.json({Error: "Password compare error in server"})

                if(response) {
                    const nazwa = data[0].nazwa;
                    const role = data[0].role;

                    const isAdmin = role === "admin";

                    const token = jwt.sign(
                        { nazwa, isAdmin },
                        "jwt-secret-key",
                        {expiresIn: "7d"}
                    )

                    res.cookie("Token", token, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "lax",
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    })

                    return res.json({Status: "User logged in successfully"})
                } else {
                    return res.json({Error: "Wrong password"})
                }
            })
        } else {
            return res.json({ Error: "User not found" });
        }
    })
});

app.listen(8081, () => { 
    console.log('Server is running on port 8081');
})

app.post('/logout', (req, res) => {
    res.clearCookie('Token', {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    return res.json({ Status: "User logged out" });
});

app.get('/products', (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: "Error fetching products" });
        }
        return res.json(data);
    });
});


app.post('/products', verifyUser, verifyAdmin, (req, res) => {
    const { name, price, img, category } = req.body;

    const sql = "INSERT INTO products (name, price, img, category) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, price, img, category], (err, data) => {
        if (err) {
            return res.json({ Error: "Error adding product" });
        }
        return res.json({ Status: "Product added" });
    });
});