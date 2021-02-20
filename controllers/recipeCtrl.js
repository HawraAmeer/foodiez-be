const { Recipe, Ingredient, RecipeIngredients } = require("../db/models");

exports.fetchRecipe = async (recipeId, next) => {
  try {
    return await Recipe.findByPk(recipeId, {
      include: {
        model: Ingredient,
        as: "ingredients",
        attributes: ["id", "name", "image"],
        through: {
          attributes: ["recipeId", "ingredientId"],
        },
      },
    });
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
    newRecipe.addIngredients(req.body.ingredients.split(","));
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
        attributes: ["id", "name", "image"],
        through: {
          attributes: ["recipeId", "ingredientId"],
        },
      },
    });
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.recipeDetail = (req, res, next) => {
  res.json(req.recipe);
};
