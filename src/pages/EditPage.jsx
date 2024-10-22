import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Use useNavigate instead of useNavigation
import axios from "axios";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";
const EditPage = () => {
  let { id } = useParams();
  const navigate = useNavigate(); // Corrected to useNavigate
  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${VITE_BACKEND_URL}/api/products/${id}`
      );
      setProduct({
        name: response.data.name,
        quantity: response.data.quantity,
        price: response.data.price,
        image: response.data.image,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const updateProduct = async (e) => {
    // Added 'e' to the function parameters
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`${VITE_BACKEND_URL}/api/products/${id}`, product);
      toast.success("Updated the product successfully");
      navigate("/"); // Corrected navigation
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-2xl mb-4 block text-center">
        Update Product
      </h2>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <form onSubmit={updateProduct}>
            <div className="space-y-2">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-200"
                  placeholder="Enter Name"
                />
              </div>
              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    setProduct({ ...product, quantity: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-200"
                  placeholder="Enter Quantity"
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-200"
                  placeholder="Enter Price"
                />
              </div>
              <div>
                <label>Image URL</label>
                <input
                  type="text"
                  value={product.image}
                  onChange={(e) =>
                    setProduct({ ...product, image: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-200"
                  placeholder="Enter URL"
                />
              </div>
              <div>
                {isLoading ? (
                  <button
                    disabled
                    className="block w-full mt-6 bg-gray-500 text-white rounded-sm px-4 py-2 font-bold cursor-not-allowed"
                  >
                    Updating...
                  </button>
                ) : (
                  <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover-cursor-pointer">
                    Update
                  </button>
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EditPage;
