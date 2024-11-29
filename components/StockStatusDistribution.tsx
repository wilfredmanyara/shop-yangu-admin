"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StockStatusDistribution = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categorizeStock = (products: { stock: number }[]) => {
    let inStock = 0;
    let outOfStock = 0;
    let lowStock = 0;

    products.forEach((product: { stock: number }) => {
      if (product.stock > 5) {
        inStock++;
      } else if (product.stock === 0) {
        outOfStock++;
      } else if (product.stock >= 1 && product.stock <= 5) {
        lowStock++;
      }
    });

    return [
      { name: "In Stock", product: inStock },
      { name: "Out of Stock", product: outOfStock },
      { name: "Low Stock", product: lowStock },
    ];
  };

  const stockData = categorizeStock(products);

  const LoadingSpinner = () => (
    <div className="flex flex-col justify-center items-center py-6">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12"></div>
    </div>
  );

  return (
    <div className="p-4">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2 className="text-xl text-black font-semibold mb-4">
            Stock Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="product" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default StockStatusDistribution;
