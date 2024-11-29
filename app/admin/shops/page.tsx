"use client";

import CreateShopForm from "@/components/CreateShopForm";
import CustomButton from "@/components/CustomButton";
import EditableShop from "@/components/EditableShop";
import { ShopProps } from "@/types";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [shops, setShops] = useState<ShopProps[]>([]);
  const [create, setCreate] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;

  const fetchShops = async () => {
    try {
      const response = await fetch("/mocks/shops.json");
      const data = await response.json();
      setShops(data.reverse());
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);
  

  const filteredProducts = shops
    .filter((shop) =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
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
        <div className="w-full mt-4 mb-4 flex justify-center">
          <CustomButton
            title="Create new shop"
            containerStyles="w-36 py-[8px] rounded bg-orange-600 mx-2"
            textStyles="text-white"
            handleClick={() => setCreate(!create)}
          />
        </div>
      )}

      {create && (
        <div className="w-full flex justify-center">
          <CreateShopForm
            setCreate={setCreate}
            fetchShops={fetchShops}
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
      </div>

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4 pt-4">
        {paginatedProducts.map(
          ({ id, name, description, logo }) => (
            <EditableShop
              key={id}
              shopProps={{
                id,
                name,
                description,
                logo,
              }}
              fetchShops={fetchShops}
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
