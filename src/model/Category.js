const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  questions: [
    {
      questionNo: { type: Number },
      question: { type: String },
      options: [String],
      answer: { type: String },
    },
  ],
  subCategories: [
    {
      subCategory: { type: String },
      questions: [
        {
          questionNo: { type: Number },
          question: { type: String },
          options: [String],
          answer: { type: String },
        },
      ],
    },
  ],
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
