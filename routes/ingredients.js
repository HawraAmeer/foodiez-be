const express = require("express");
const ingredientCtrl = require("../controllers/ingredientCtrl");
const router = express.Router();
const upload = require("../middlewares/multer");

router.param("ingredientId", async (req, res, next, ingredientId) => {
  const foundIngredient = await ingredientCtrl.fetchIngredient(
    ingredientId,
    next
  );
  if (foundIngredient) {
    req.ingredient = foundIngredient;
    next();
  } else next({ status: 404, message: "Ingredient Not Found." });
});

router.get("/", ingredientCtrl.ingredientList);

router.get("/:ingredientId", ingredientCtrl.ingredientDetail);

module.exports = router;
