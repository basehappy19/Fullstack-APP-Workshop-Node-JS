const express = require("express");
const router = express.Router();
const {
  read,
  list,
  listby,
  create,
  update,
  remove,
} = require("../Controllers/ProductControllers");
const { auth } = require("../Middlewares/AuthMiddlewares");
const { upload } = require("../Middlewares/UploadMiddlewares");

router.get("/product", list);
router.post("/productby", listby);
/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     tags: [Products]
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

router.get("/product/:id", read);
/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get Product by ID
 *     tags: [Products]
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

router.post("/product", upload, create);
/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create Product
 *     tags: [Products]
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

router.put("/product/:id", upload, update);

/**
 * @swagger
 * /api/product{id}:
 *   put:
 *     summary: Update a Product
 *     tags: [Products]
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

router.delete("/product/:id", remove);
/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a Product
 *     tags: [Products]
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

// router.get('/product',auth, list)
// router.get('/product/:id',auth, read)
// router.post('/product',auth, upload, create)
// router.put('/product/:id',auth, update)
// router.delete('/product/:id',auth, remove)

module.exports = router;
