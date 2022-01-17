const express = require("express");
const ProductsController = require("../controllers/ProductsController");

const router = express.Router();

router.get("/", ProductsController.indexProducts);
router.post("/new", ProductsController.createProduct);
router.get("/:id", ProductsController.readProduct);
router.patch("/:id", ProductsController.updateProduct);
router.delete("/:id", ProductsController.deleteProduct);

module.exports = router;
