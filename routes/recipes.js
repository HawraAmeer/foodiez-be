const express = require("express");
const recipeCtrl = require("../controllers/recipeCtrl");
const router = express.Router();
const upload = require("../middlewares/multer");

router.param("recipeId", async (req, res, next, recipeId) => {
  const foundRecipe = await recipeCtrl.fetchRecipe(recipeId, next);
  if (foundRecipe) {
    req.recipe = foundRecipe;
    next();
  } else next({ status: 404, message: "Recipe Not Found." });
});

router.post("/", upload.single("image"), recipeCtrl.createRecipe);

router.get("/", recipeCtrl.recipeList);

router.get("/:recipeId", recipeCtrl.recipeDetail);

module.exports = router;
