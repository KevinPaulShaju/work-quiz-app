const express = require("express");
const router = express.Router();
const {
  addCategory,
  addCategoryQuestions,
  addSubCategory,
  addSubCategoryQuestions,
} = require("../controllers/quizControlers");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Quiz Application" });
});

// post a category
router.post("/category", addCategory);

// add a category question
router.patch("/category", addCategoryQuestions);

// add subcategory
router.patch("/category/subcategory", addSubCategory);

// add questions to subcategory
router.patch("/category/subcategory/questions", addSubCategoryQuestions);

module.exports = router;
