"use client";

import React, { useEffect, useState } from "react";
import { ProductProps, ShopProps } from "@/types";
import CustomButton from "./CustomButton";
import Image from "next/image";

interface EditableProductProps {
  productProps: ProductProps;
  shops: ShopProps[];
  fetchProducts: () => Promise<void>;
}

interface InputFieldProps {
  label: string;
  id: string;
  value: string | number;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  type?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  value,
  onChange,
  type = "text",
  required = true,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

const EditableProduct = ({
  productProps,
  shops,
  fetchProducts,
}: EditableProductProps) => {
  const { id, name, price, stock, description, image, shop } = productProps;

  // Form states and visibility
  const [formData, setFormData] = useState({
    name,
    description,
    shop,
    image,
    price,
    stock,
  });
  const [beingEdited, setBeingEdited] = useState(false);
  const [isDeletePromptVisible, setDeletePromptVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange =
    (key: string) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFormData({ ...formData, [key]: event.target.value });
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...formData }),
    });

    setLoading(false);
    if (response.ok) {
      setBeingEdited(false);
      fetchProducts();
    } else {
      console.error("Error updating product:", response);
    }
  };

  const deleteProduct = async () => {
    const response = await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setDeletePromptVisible(false);
      fetchProducts();
    } else {
      console.error("Error deleting product:", response);
    }
  };

  const shopName = (id: string) =>
    shops.find((s) => s.id === id)?.name || "undefined";

  useEffect(
    () => setFormData({ name, description, shop, image, price, stock }),
    [description, image, name, price, productProps, shop, stock]
  );

  return beingEdited ? (
    <div className="max-w-sm max-h-[50vh] overflow-y-auto rounded shadow-lg place-self-center">
      <form onSubmit={handleSubmit} className="px-6 py-4">
        <InputField
          label="Name"
          id="name"
          value={formData.name}
          onChange={handleChange("name")}
        />
        <InputField
          label="Description"
          id="description"
          value={formData.description}
          onChange={handleChange("description")}
          type="textarea"
        />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="shop"
          >
            Shop
          </label>
          <select
            id="shop"
            value={formData.shop}
            onChange={handleChange("shop")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a shop</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </select>
        </div>
        <InputField
          label="Image URL"
          id="image"
          value={formData.image}
          onChange={handleChange("image")}
        />
        <InputField
          label="Price"
          id="price"
          value={formData.price}
          onChange={handleChange("price")}
          type="number"
        />
        <InputField
          label="Stock"
          id="stock"
          value={formData.stock}
          onChange={handleChange("stock")}
          type="number"
        />

        <div className="flex justify-center pt-4">
          {loading ? (
            <CustomButton
            title="Processing..."
            containerStyles="w-36 h-15 py-[8px] rounded-lg bg-orange-600 mx-2"
            textStyles="text-white text-[14px] leading-[17px] font-bold mr-1"
          />
          ) : (
            <>
              <CustomButton
                title="Cancel"
                containerStyles="w-28 py-2 rounded-lg bg-red-500 mx-2"
                textStyles="text-white"
                handleClick={() => setBeingEdited(false)}
              />
              <CustomButton
                title="Save"
                btnType="submit"
                containerStyles="w-28 py-2 rounded-lg bg-green-700 mx-2"
                textStyles="text-white"
              />
            </>
          )}
        </div>
      </form>
    </div>
  ) : (
    <div className="w-80 max-w-sm rounded max-h-[60vh] overflow-y-auto shadow-lg place-self-center">
      <div className="w-full h-32 relative">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>
      <div className="px-6 py-4 h-32">
        <div className="font-bold text-black text-xl mb-2">{name}</div>
        <p className="text-gray-700 line-clamp-2">{description}</p>
      </div>
      <div className="flex justify-between px-6 mb-2">
        <span className="text-sm text-black">Shop: {shopName(shop)}</span>
        <span className="text-sm text-black">Price: ${price}</span>
        <span className="text-sm text-black">Stock: {stock}</span>
      </div>
      <div className="flex justify-center mt-4 pb-4">
        <CustomButton
          title="Edit"
          containerStyles="w-28 py-2 rounded-lg bg-orange-500 mx-2"
          textStyles="text-white"
          handleClick={() => setBeingEdited(true)}
        />
        <CustomButton
          title="Delete"
          containerStyles="w-28 py-2 rounded-lg bg-red-500 mx-2"
          textStyles="text-white"
          handleClick={() => setDeletePromptVisible(true)}
        />
      </div>

      {isDeletePromptVisible && (
        <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-orange-300 border-2 border-red-500 text-center p-4">
          <p>Are you sure you want to delete {name}?</p>
          <div className="flex justify-center mt-4">
            <CustomButton
              title="Cancel"
              containerStyles="w-28 py-2 bg-gray-500 mx-2"
              textStyles="text-white"
              handleClick={() => setDeletePromptVisible(false)}
            />
            <CustomButton
              title="Delete"
              containerStyles="w-28 py-2 bg-red-500 mx-2"
              textStyles="text-white"
              handleClick={deleteProduct}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableProduct;
