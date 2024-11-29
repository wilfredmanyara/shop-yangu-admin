import { useState } from "react";
import CustomButton from "./CustomButton";

interface CreateShopFormProps {
    setCreate: (value: boolean) => void;
    fetchShops: () => Promise<void>;
  }

  const CreateShopForm = ({
    setCreate,
    fetchShops,
  }: CreateShopFormProps) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [logo, setLogo] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
      };
    
    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        setDescription(event.target.value);
      };
    
      const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogo(event.target.value);
      };
    
      const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Form data:", { name, description, logo });
    
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, description, logo }),
        };
    
        setLoading(true);
    
        const response = await fetch("/api/shops", requestOptions);
    
        setLoading(false);
    
        if (!response.ok) {
          // console.log("Error creating shop.");
          // console.log(response);
          return;
        }
    
        //success
        // console.log(response);
        setCreate(false);
        fetchShops();
    
        // Reset form fields
        setName("");
        setDescription("");
        setLogo("");
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
                  htmlFor="logo"
                >
                  Logo
                </label>
                <input
                  type="text"
                  id="logo"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={logo}
                  onChange={handleLogoChange}
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
                      textStyles="text-white"
                      handleClick={() => {
                        setCreate(false);
                      }}
                    />
    
                    <CustomButton
                      title="Create"
                      btnType="submit"
                      containerStyles="w-28 py-[8px] rounded-lg bg-orange-500 mx-2"
                      textStyles="text-white"
                    />
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      );
    };
    
    export default CreateShopForm;
    