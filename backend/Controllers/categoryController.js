const categoryModel = require("../models/categoryModel");
const cloudinary = require("cloudinary");
const sendError = require("../utils/sendError");
const multer = require("multer");

// Multer setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to use in your route
// Example: router.post("/add", upload.single("categoryImage"), addCategory);

// Add Category
const addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const file = req.file;

    if (!file) return sendError(res, 400, "Category image is required");

    // Check if category already exists
    const isCategoryExist = await categoryModel.findOne({ categoryName });
    if (isCategoryExist) {
      return sendError(res, 400, "Category Already Exists..!!");
    }

    // Upload file buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        { folder: "category" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(file.buffer);
    });

    // Save category to DB
    const newCategory = await categoryModel.create({
      categoryName,
      categoryImage: result.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Category Added..!!",
      newCategory,
    });
  } catch (error) {
    sendError(res, 400, error.message);
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const CategoriesCount = await categoryModel.countDocuments();
    const Categories = await categoryModel.find();

    if (Categories.length === 0) {
      return sendError(res, 400, "Categories Not Found..!!");
    }

    res.status(200).json({
      success: true,
      Categories,
      CategoriesCount,
      message: "Categories fetched successfully..!!",
    });
  } catch (error) {
    sendError(res, 400, "Something went wrong..!!");
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) return sendError(res, 400, "Category Id Not Found");

    const category = await categoryModel.findById(categoryId);
    if (!category) return sendError(res, 400, "Category Not Found");

    await categoryModel.findByIdAndDelete(categoryId);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully..!!",
      DeletedCategory: category,
    });
  } catch (error) {
    sendError(res, 400, "Something went wrong..!!");
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) return sendError(res, 400, "Category Id Required");

    const category = await categoryModel.findById(categoryId);
    if (!category) return sendError(res, 400, "Category Not Found");

    category.categoryName = req.body.categoryName || category.categoryName;

    if (req.file) {
      // Upload new image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { folder: "category" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      category.categoryImage = result.secure_url;
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category Updated..!!",
      updatedCategory: category,
    });
  } catch (error) {
    console.log(error);
    sendError(res, 400, "Something went wrong..!!");
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
  upload, // export multer middleware for routes
};