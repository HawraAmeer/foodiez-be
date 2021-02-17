const { Category, Ingredient } = require("../db/models");

exports.fetchIngredient = async (ingredientId, next) => {
  try {
    return await Ingredient.findByPk(ingredientId);
  } catch (error) {
    next(error);
  }
};

exports.createIngredient = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
};

exports.ingredientList = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Category,
        as: "category",
        attributes: ["id"],
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
