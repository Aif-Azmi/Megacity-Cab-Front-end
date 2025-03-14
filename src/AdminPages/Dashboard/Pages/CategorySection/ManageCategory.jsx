import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../Utils/AuthContext'; // Adjust the import path as needed

const ManageCategory = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null); // Track the category being edited
  const [updatedName, setUpdatedName] = useState(''); // Store the updated name
  const [updatedPrice, setUpdatedPrice] = useState(0); // Store the updated price per km
  const [showAddCategory, setShowAddCategory] = useState(false); // Track if add category form is visible
  const [newCategoryName, setNewCategoryName] = useState(''); // Store the new category name
  const [newCategoryPrice, setNewCategoryPrice] = useState(0); // Store the new category price per km

  // Fetch all categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve the token
        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        console.log('Fetching categories with token:', token); // Debugging

        const response = await axios.get('http://localhost:8080/auth/allcategory', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request
          },
        });

        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        if (err.response) {
          setError(`Failed to fetch categories. Status: ${err.response.status}`);
        } else if (err.request) {
          setError('No response from server. Please check if the backend is running.');
        } else {
          setError('An unexpected error occurred: ' + err.message);
        }
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle deleting a category
  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      console.log('Deleting category with token:', token); // Debugging

      await axios.delete(`http://localhost:8080/admin/deletecategory/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted category from the list
      setCategories(categories.filter((category) => category.categoryId !== categoryId));
      alert('Category deleted successfully!');
    } catch (err) {
      console.error('Error deleting category:', err);
      if (err.response) {
        if (err.response.status === 401) {
          alert('Unauthorized: Please log in again.');
        } else {
          alert(`Failed to delete category. Status: ${err.response.status}`);
        }
      } else if (err.request) {
        alert('No response from server. Please check your connection.');
      } else {
        alert('An unexpected error occurred: ' + err.message);
      }
    }
  };

  // Handle updating a category
  const handleUpdateCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      console.log('Updating category with token:', token); // Debugging
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      const updatedCategory = {
        categoryname: updatedName,
        priceperkm: updatedPrice,
      };

      const response = await axios.put(
        `http://localhost:8080/admin/updatecategory/${categoryId}`,
        updatedCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the category in the list
      setCategories(
        categories.map((category) =>
          category.categoryId === categoryId
            ? { ...category, categoryname: updatedName, priceperkm: updatedPrice }
            : category
        )
      );

      setEditingCategory(null); // Reset editing state
      alert('Category updated successfully!');
    } catch (err) {
      console.error('Error updating category:', err);
      if (err.response) {
        if (err.response.status === 401) {
          alert('Unauthorized: Please log in again.');
        } else {
          alert(`Failed to update category. Status: ${err.response.status}`);
        }
      } else if (err.request) {
        alert('No response from server. Please check your connection.');
      } else {
        alert('An unexpected error occurred: ' + err.message);
      }
    }
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      const newCategory = {
        categoryname: newCategoryName,
        priceperkm: newCategoryPrice,
      };

      const response = await axios.post(
        'http://localhost:8080/admin/addcategory',
        newCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add the new category to the list
      setCategories([...categories, response.data]);
      setShowAddCategory(false); // Hide the add category form
      setNewCategoryName(''); // Reset the input fields
      setNewCategoryPrice(0);
      alert('Category added successfully!');
    } catch (err) {
      console.error('Error adding category:', err);
      if (err.response) {
        if (err.response.status === 401) {
          alert('Unauthorized: Please log in again.');
        } else {
          alert(`Failed to add category. Status: ${err.response.status}`);
        }
      } else if (err.request) {
        alert('No response from server. Please check your connection.');
      } else {
        alert('An unexpected error occurred: ' + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Manage Categories</h1>
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-x-auto">
        <div className="p-4">
          <button
            onClick={() => setShowAddCategory(!showAddCategory)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {showAddCategory ? 'Cancel' : 'Add Category'}
          </button>
          {showAddCategory && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Category Name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <input
                type="number"
                placeholder="Price per Km"
                value={newCategoryPrice}
                onChange={(e) => setNewCategoryPrice(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save
              </button>
            </div>
          )}
        </div>
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">Price per Km</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.categoryId} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700">
                  {editingCategory === category.categoryId ? (
                    <input
                      type="text"
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="truncate">{category.categoryname}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {editingCategory === category.categoryId ? (
                    <input
                      type="number"
                      value={updatedPrice}
                      onChange={(e) => setUpdatedPrice(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    `$${category.priceperkm.toFixed(2)}` // Display price with 2 decimal places
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    {editingCategory === category.categoryId ? (
                      <button
                        onClick={() => handleUpdateCategory(category.categoryId)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingCategory(category.categoryId);
                          setUpdatedName(category.categoryname);
                          setUpdatedPrice(category.priceperkm);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteCategory(category.categoryId)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCategory;