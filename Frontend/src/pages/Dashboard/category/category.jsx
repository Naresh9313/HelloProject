
import React, { useState, useEffect } from "react";
import axios from "axios";
import '../category/category.css'

const Category = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    formData.append("price", category.price);
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/category/updatecategory/${editingId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setMessage("Category updated successfully!");
      } else {
        await axios.post("http://localhost:5000/category/addcategory", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Category added successfully!");
      }

      resetForm();
      fetchCategories();
    } catch (error) {
      console.error("Error submitting category:", error);
      setMessage("Failed to submit category.");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/category/getcategory");
      const categories = res.data.data || res.data.categories || res.data || [];
      setAllCategories(categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setAllCategories([]);
    }
  };

  const handleEdit = (cat) => {
    setCategory({
      name: cat.name,
      description: cat.description,
      price: cat.price,
    });
    setEditingId(cat._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:5000/category/deletecategory/${id}`);
        setMessage("Category deleted successfully!");
        fetchCategories();
      } catch (err) {
        console.error("Error deleting category:", err);
        setMessage("Failed to delete category.");
      }
    }
  };

  const resetForm = () => {
    setCategory({ name: "", description: "", price: "" });
    setImage(null);
    setEditingId(null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
     

      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        {editingId ? "✏️ Edit Category" : "➕ Add Trips"}
      </h2>
        <div>
          <label className="block font-semibold mb-1">Trip Name</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={category.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Price</label>
          <input
            type="text"
            name="price"
            value={category.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full border border-gray-300 p-2 rounded"
            accept="image/*"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-center">📋 All Trips</h3>
        <div className="custom-grid">
  {allCategories.map((cat) => (
    <div key={cat._id} className="card">
      
      {cat.image && (
        <img
          src={`http://localhost:5000/uploads/${cat.image}`}
          alt={cat.name}
          className="image"
        />
      )}
<h4 className="text-lg font-bold text-blue-700">{cat.name}</h4>
      <p className="text-gray-600 mt-1">{cat.description}</p>
      <p className="text-gray-600 mt-1 font-semibold">₹ {cat.price}</p>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => handleEdit(cat)}
          className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(cat._id)}
          className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>


      </div>
    </div>
  );
};

export default Category;
