import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../../../Components/Header/Header";
import { addCategoryAction } from "../../../../Redux/Actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";

const AddCategory = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.addCategory);

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCategoryImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Handle form submit
  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (!categoryName || !categoryImage) return;

    const categoryData = new FormData();
    categoryData.append("categoryName", categoryName);
    categoryData.append("categoryImage", categoryImage);

    dispatch(addCategoryAction(categoryData));
  };

  // Reset form after successful submit
  useEffect(() => {
    if (success) {
      setCategoryName("");
      setCategoryImage(null);
      setPreviewImage("");
    }
  }, [success]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-container">
        <div className="dashboard-sub-heading">
          <h1>Add Category</h1>
        </div>

        <div className="add-product-form-box">
          <form encType="multipart/form-data" onSubmit={handleAddCategorySubmit}>
            <div className="product-name">
              <input
                type="text"
                value={categoryName}
                placeholder="Category Name"
                required
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <div className="product-image">
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleImageChange}
              />
            </div>

            {previewImage && (
              <div className="product-preview">
                <img src={previewImage} alt="Preview" />
              </div>
            )}

            {error && (
              <div className="upload-error">
                <h1>{error}</h1>
              </div>
            )}

            {success && (
              <div className="upload-success">
                <h1>Category Added Successfully!</h1>
              </div>
            )}

            <div className="add-product-form-btn">
              <button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;