const Category = require("../model/Category");

exports.addCategory = async (req, res) => {
  try {
    const existingCategory = await Category.findOne({
      category: req.body.category,
    });
    if (existingCategory) {
      return res.status(406).json({ error: "This Category already exists" });
    }
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addCategoryQuestions = async (req, res) => {
  const category = req.query.category;
  try {
    const existingCategory = await Category.findOne({
      category: category,
    });
    if (!existingCategory) {
      return res.status(406).json({ error: "This Category does not exists" });
    }
    existingCategory.questions.push(req.body);
    const savedCategory = await existingCategory.save();
    res.json(savedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addSubCategory = async (req, res) => {
  const category = req.query.category;
  try {
    const existingCategory = await Category.findOne({
      category: category,
    });
    if (!existingCategory) {
      return res.status(406).json({ error: "This Category does not exists" });
    }
    existingCategory.subCategories.push(req.body);

    const savedCategory = await existingCategory.save();
    res.json(savedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addSubCategoryQuestions = async (req, res) => {
  const category = req.query.category;
  const subCategoryId = req.query.subcategory;
  try {
    const existingCategory = await Category.findOne({
      category: category,
    });
    if (!existingCategory) {
      return res.status(406).json({ error: "This Category does not exists" });
    }
    existingSubCategory = existingCategory.subCategories.find(
      (category) => category.id === subCategoryId
    );

    if (!existingSubCategory) {
      return res
        .status(406)
        .json({ error: "This Sub Category does not exists" });
    }

    existingSubCategory.questions.push(req.body);

    const savedQuestions = await existingCategory.save();
    res.json(savedQuestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
