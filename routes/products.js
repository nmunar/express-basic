var express = require("express");
var router = express.Router();
var [
  getProducts,
  insertProduct,
  deleteProduct,
  updateProduct,
] = require("../controllers/product");
const auth = require("../lib/utils/auth.js");

/* GET product listing. */
router.get("/", auth.checkToken, async function (req, res, next) {
  const products = await getProducts();
  res.send(products);
});
/**
 * POST product
 */
router.post("/", auth.checkTokenUser, async function (req, res, next) {
  const newProduct = await insertProduct(req.body);
  console.warn("insert products->", newProduct);
  
  res.send(newProduct.ops[0]);
});

/**
 * DELETE product
 */
router.delete("/", auth.checkTokenAdmin, async function (req, res, next) {
  const oldProduct = await deleteProduct(req.body);
  console.warn("delete products->", oldProduct);
  res.send(oldProduct);
});

/**
 * UPDATE product
 */
router.put("/", auth.checkTokenAdmin, async function (req, res, next) {
  const oldProduct = await updateProduct(req.body);
  console.warn("update product->", oldProduct);
  try {
    res.send(req.body);
  } catch (err) {
    res.send(400).json({
      success: false,
      message: "Incorrect fields.",
    });
  }
});

module.exports = router;
