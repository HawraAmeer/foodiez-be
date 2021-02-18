const { Recipe, Ingredient } = require("../db/models");

exports.fetchIngredient = async (ingredientId, next) => {
  try {
    return await Ingredient.findByPk(ingredientId);
  } catch (error) {
    next(error);
  }
};

exports.ingredientList = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Recipe,
        as: "recipes",
      },
    });
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
};

exports.ingredientDetail = async (req, res, next) => {
  res.json(req.ingredient);
};
