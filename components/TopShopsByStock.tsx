"use client";

import React, { useEffect, useState, useMemo } from "react";
import { FaStore } from "react-icons/fa";

interface Shop {
  id: number;
  name: string;
}

interface Product {
  id: number;
  shop: number;
  stock: string | number;
}

const TopShopsByStock = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopResponse = await fetch("/api/shops");
        const productResponse = await fetch("/api/products");

        if (!shopResponse.ok || !productResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const shopData: Shop[] = await shopResponse.json();
        const productData: Product[] = await productResponse.json();

        setShops(shopData);
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const topShops = useMemo(() => {
    if (shops.length === 0 || products.length === 0) return [];

    const shopStockMap = shops.map((shop) => {
      const totalStock = products
        .filter((product) => product.shop === shop.id)
        .reduce(
          (sum, product) => sum + (parseInt(String(product.stock), 10) || 0),
          0
        );
      return { shop, totalStock };
    });

    return shopStockMap.sort((a, b) => b.totalStock - a.totalStock).slice(0, 5);
  }, [shops, products]);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-6">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12"></div>
    </div>
  );

  return (
    <div className="p-4">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2 className="text-xl text-black font-semibold mb-6">
            Top 5 Shops by Stock Level
          </h2>
          <ul>
            {topShops.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center">
                  <FaStore className="text-xl mr-3 text-blue-500" />
                  <span className="font-medium text-gray-900">
                    {item.shop.name}
                  </span>
                </div>
                <span className="font-semibold text-gray-700">
                  {item.totalStock} products
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TopShopsByStock;
