const express = require("express");
const categoryCtrl = require("../controllers/categoryCtrl");
const router = express.Router();
const upload = require("../middlewares/multer");

router.param("categoryId", async (req, res, next, categoryId) => {
  const foundCategory = await categoryCtrl.fetchCategory(categoryId, next);
  if (foundCategory) {
    req.category = foundCategory;
    next();
  } else next({ status: 404, message: "Category Not Found." });
});

router.post("/", upload.single("image"), createCategory);

router.get("/", categoryCtrl.categoryList);

router.get("/:categoryId", categoryCtrl.categoryDetail);

module.exports = router;
