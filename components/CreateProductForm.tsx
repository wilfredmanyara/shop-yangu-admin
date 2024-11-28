import { ShopProps } from "@/types";
import { useState } from "react";
import CustomButton from "./CustomButton";

interface CreateProductFormProps {
  shops: ShopProps[];
  setCreate: (value: boolean) => void;
  fetchProducts: () => Promise<void>;
}

const CreateProductForm = ({
  shops,
  setCreate,
  fetchProducts,
}: CreateProductFormProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [shop, setShop] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [stock, setStock] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleShopChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShop(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setPrice(isNaN(value) ? null : value);
  };

  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStock(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form data:", { name, price, stock, description, image, shop });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, stock, description, image, shop }),
    };

    setLoading(true);

    const response = await fetch("/api/products", requestOptions);

    setLoading(false);

    if (!response.ok) {
      console.log("Error creating product.");
      console.log(response);
      return;
    }

    //success
    // console.log(response);
    setCreate(false);
    fetchProducts();

    // Reset form fields
    setName("");
    setPrice(null);
    setStock("");
    setDescription("");
    setImage("");
    setShop("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay with blur effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Modal content */}
      <div className="relative bg-white p-6 rounded-lg shadow-2xl w-80">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={handleDescriptionChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="shop"
            >
              Shop
            </label>
            <select
              id="shop"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={shop}
              onChange={handleShopChange}
              required
            >
              <option value="">Select a shop</option>
              {shops.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={image}
              onChange={handleImageChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              step="any"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={price ?? ""}
              onChange={handlePriceChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="stock"
            >
              Stock
            </label>
            <input
              type="text"
              id="stock"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={stock}
              onChange={handleStockChange}
              required
            />
          </div>

          <div className="flex justify-center">
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
                  containerStyles="w-28 py-[8px] rounded-lg bg-red-500 mx-2"
                  textStyles="text-white text-[14px] leading-[17px] font-bold"
                  handleClick={() => {
                    setCreate(false);
                  }}
                />

                <CustomButton
                  title="Create"
                  btnType="submit"
                  containerStyles="w-28 py-[8px] rounded-lg bg-orange-500 mx-2"
                  textStyles="text-white text-[14px] leading-[17px] font-bold"
                />
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
