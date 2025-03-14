import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
    const [category, setCategory] = useState({
        categoryname: '',
        priceperkm: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwtToken'); // Retrieve JWT token

            if (!token) {
                alert('You are not authenticated. Please log in.');
                return;
            }

            await axios.post(
                'http://localhost:8080/admin/addcategory', // API endpoint
                category,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            alert('Category added successfully!');
            setCategory({ categoryname: '', priceperkm: 0 }); // Reset form
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Failed to add category. Please check your authentication.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Add Category</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category Name:</label>
                        <input
                            type="text"
                            name="categoryname"
                            value={category.categoryname}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price per Kilometer:</label>
                        <input
                            type="number"
                            name="priceperkm"
                            value={category.priceperkm}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
