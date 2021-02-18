const { Recipe, Ingredient } = require("../db/models");

exports.fetchRecipe = async (recipeId, next) => {
  try {
    return await Recipe.findByPk(recipeId);
  } catch (error) {
    next(error);
  }
};

exports.createRecipe = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

exports.recipeList = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Ingredient,
        as: "ingredients",
      },
    });
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.recipeDetail = async (req, res, next) => {
  res.json(req.recipe);
};
