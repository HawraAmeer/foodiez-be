const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    image: { 
      type: DataTypes.STRING, 
      allowNull: true, 
      defaultValue: "https://i.pinimg.com/originals/8e/fe/ea/8efeea6762f92ecb701cc0652cde2331.jpg" 
    },
    method: { 
      type: DataTypes.STRING, 
      allowNull: true, 
      defaultValue: "Enter the recipe steps"
    },
  });

  SequelizeSlugify.slugifyModel(Recipe, {
    source: ["name"],
  });
  return Recipe;
};
