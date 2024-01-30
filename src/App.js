import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const manager = new ProductManager("./productos.json");

app.use(express.urlencoded({ extended: true }));

app.get("/products/", async (req, res) => {
  let products = await manager.getProducts();
  let { limit } = req.query;
  let prodQuery = {};

  for (let i = 0; i < (limit || products.length); i++) {
    prodQuery[`Producto ${i + 1}`] = products[i];
  }

  res.send(prodQuery);
});

app.get("/products/:pid", async (req, res) => {
  let product = await manager.getProductById(req.params.pid);

  res.send(product || "El producto no existe");
});

app.listen(8080, () => console.log("arrib"));
