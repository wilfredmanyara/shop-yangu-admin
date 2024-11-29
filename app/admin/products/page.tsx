"use client";

import CreateProductForm from "@/components/CreateProductForm";
import CustomButton from "@/components/CustomButton";
import EditableProduct from "@/components/EditableProduct";
import { ProductProps, ShopProps } from "@/types";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [shops, setShops] = useState<ShopProps[]>([]);
  const [create, setCreate] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;

  const fetchProducts = async () => {
    try {
      const response = await fetch("/mocks/products.json");
      const data = await response.json();
      setProducts(data.reverse());
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchShops = async () => {
    try {
      const response = await fetch("/mocks/shops.json");
      const data = await response.json();
      setShops(data);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchShops();
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) => (selectedShop ? product.shop === selectedShop : true))
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

  // Pagination logic
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      {!create && (
        <div className="w-full mt-6 mb-4 flex justify-center">
          {/* <CustomButton
            title="Create new product"
            containerStyles="w-36 py-[8px] rounded bg-orange-600 mx-2"
            textStyles="text-white"
            handleClick={() => setCreate(!create)}
          /> */}
        </div>
      )}

      {create && (
        <div className="w-full flex justify-center">
          <CreateProductForm
            shops={shops}
            setCreate={setCreate}
            fetchProducts={fetchProducts}
          />
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-auto border border-gray-300 text-gray-900 p-2.5 rounded focus:ring-2 focus:ring-orange-500 outline-none transition-all"
        />
        <select
          value={selectedShop || ""}
          onChange={(e) => setSelectedShop(e.target.value)}
          className="w-[50%] md:w-auto border border-gray-300 text-gray-900 p-3 rounded focus:ring-2 focus:ring-orange-500 outline-none transition-all"
        >
          <option value="">All Shops</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-full md:w-auto border p-2 rounded"
          />
          <span className="text-gray-900">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        {!create && (
          <div className="mt-4 mb-4 flex justify-center">
            <CustomButton
              title="Create new product"
              containerStyles="w-36 py-[8px] rounded bg-orange-600 mx-2"
              textStyles="text-white"
              handleClick={() => setCreate(!create)}
            />
          </div>
        )}
      </div>

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4 pt-4">
        {paginatedProducts.map(
          ({ id, name, price, stock, description, image, shop }) => (
            <EditableProduct
              key={id}
              productProps={{
                id,
                name,
                price,
                stock,
                description,
                image,
                shop,
              }}
              shops={shops}
              fetchProducts={fetchProducts}
            />
          )
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 text-gray-900 border rounded disabled:text-gray-500"
        >
          Previous
        </button>
        <span className="mx-4 text-gray-900">Page {page}</span>
        <button
          disabled={page * itemsPerPage >= filteredProducts.length}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 text-gray-900 border rounded disabled:text-gray-500"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Products;
