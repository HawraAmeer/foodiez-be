const { Category, Ingredient } = require("../db/models");

exports.fetchCategory = async (categoryId, next) => {
  try {
    return await Category.findByPk(categoryId);
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

exports.createIngredient = async (req, res, next) => {
  try {
    req.body.categoryId = req.category.id;
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
};

exports.categoryList = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Ingredient,
        as: "ingredients",
        attributes: ["id", "name", "image", "categoryId"],
    }});
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

exports.categoryDetail = async (req, res, next) => {
  res.json(req.category);
};
