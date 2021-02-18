const { Recipe, Ingredient } = require("../db/models");

exports.fetchIngredient = async (ingredientId, next) => {
  try {
    return await Ingredient.findByPk(ingredientId, {
      include: {
        model: Recipe,
        as: "recipes",
        attributes: ["id"],
        through: {
          attributes: ["recipeId", "ingredientId"],
        },
      },
    });
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
        attributes: ["id"],
        through: {
          attributes: ["recipeId", "ingredientId"],
        },
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
