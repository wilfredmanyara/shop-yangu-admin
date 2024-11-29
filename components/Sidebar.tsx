"use client";

import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { MdOutlineSpaceDashboard, MdStore } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNavbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div>
      <Disclosure as="nav">
        <DisclosureButton className="absolute z-50 top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block lg:hidden h-6 w-6"
            aria-hidden="true"
          />
        </DisclosureButton>
        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-2xl text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              Shop Yangu
            </h1>
            <div className="my-4 border-b border-gray-100 pb-4">
              
              {/* Dashboard Link */}
              <Link href="/admin/dashboard">
                <div
                  className={`flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer ${
                    isActive("/admin/dashboard")
                      ? "bg-gray-900 text-white shadow-lg"
                      : "hover:bg-gray-900 hover:shadow-lg"
                  }`}
                >
                  <MdOutlineSpaceDashboard
                    className={`text-2xl ${
                      isActive("/admin/dashboard")
                        ? "text-white"
                        : "text-gray-600 group-hover:text-white"
                    }`}
                  />
                  <h3
                    className={`text-base font-semibold ${
                      isActive("/admin/dashboard")
                        ? "text-white"
                        : "text-gray-800 group-hover:text-white"
                    }`}
                  >
                    Dashboard
                  </h3>
                </div>
              </Link>

              {/* Shops Link */}
              <Link href="/admin/shops">
                <div
                  className={`flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer ${
                    isActive("/admin/shops")
                      ? "bg-gray-900 text-white shadow-lg"
                      : "hover:bg-gray-900 hover:shadow-lg"
                  }`}
                >
                  <MdStore
                    className={`text-2xl ${
                      isActive("/admin/shops")
                        ? "text-white"
                        : "text-gray-600 group-hover:text-white"
                    }`}
                  />
                  <h3
                    className={`text-base font-semibold ${
                      isActive("/admin/shops")
                        ? "text-white"
                        : "text-gray-800 group-hover:text-white"
                    }`}
                  >
                    Shops
                  </h3>
                </div>
              </Link>

              {/* Products Link */}
              <Link href="/admin/products">
                <div
                  className={`flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer ${
                    isActive("/admin/products")
                      ? "bg-gray-900 text-white shadow-lg"
                      : "hover:bg-gray-900 hover:shadow-lg"
                  }`}
                >
                  <FaBoxOpen
                    className={`text-2xl ${
                      isActive("/admin/products")
                        ? "text-white"
                        : "text-gray-600 group-hover:text-white"
                    }`}
                  />
                  <h3
                    className={`text-base font-semibold ${
                      isActive("/admin/products")
                        ? "text-white"
                        : "text-gray-800 group-hover:text-white"
                    }`}
                  >
                    Products
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;
