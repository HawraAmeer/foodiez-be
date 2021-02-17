const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const path = require("path");

const categoriesRoutes = require("./routes/categories");
const ingredientsRoutes = require("./routes/ingredients");
const recipesRoutes = require("./routes/recipes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/media", express.static(path.join(__dirname, "media")));

app.use("/categories", categoriesRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/recipes", recipesRoutes);

app.use((req, res, next) => {
  next({ status: 404, message: "Path Not Found." });
});

app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error!" });
});

db.sequelize.sync({ alter: true });

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
