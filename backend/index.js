const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const stripe = require("./routes/stripe");
const productsRoute = require("./routes/products");
const users = require("./routes/users");

const products = require("./routes/products");
const orders = require("./routes/orders");

// const genAuthToken = require("./utils/genAuthToken");

const app = express();

require("dotenv").config();


const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], // Incluye 'x-auth-token'
  credentials: true,
};

app.use(cors(corsOptions));


app.use(cors(corsOptions));

// Add these lines to increase the payload size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

//app.use(express.json());
//app.use(cors());

//rutas
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);
//app.use("/api/products", products);
app.use("/api/products", productsRoute);
app.use("/api/users", users);
app.use("/api/orders", orders);

app.get("/", (req, res) => {
  res.send("Welcome to our online shop API...");
});

// Asegúrate de que esta ruta devuelve los productos
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

const port = process.env.PORT;
console.log("ENV_PORT:", process.env.PORT);
const uri = process.env.DB_URI;

app.listen(port, () => console.log(`Server running on port ${port}`));

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connection successful....."))
  .catch((err) => console.log("MongoDB connection failed", err.message));
