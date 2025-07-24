const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { router: authRoutes, authenticateJWT } = require("./auth");
const cartRoutes = require("./cart");

app.use(authRoutes);
app.use(cartRoutes);

mongoose.connect(
  "mongodb+srv://yamgarsneha815:f0meVZYXO98cVfg0@cluster0.um42dan.mongodb.net/ecommerce?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const productSchema = new mongoose.Schema({ name: String, price: Number });
const Product = mongoose.model("Product", productSchema);
module.exports.Product = Product;

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "The items that you were searching for does not exist",
      });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
