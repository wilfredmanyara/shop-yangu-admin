import { NextRequest, NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";
import { ProductProps, ShopProps } from "@/types";
import crypto from "crypto";

const shopsFilePath = path.join(process.cwd(), "public/mocks/shops.json");

const productsFilePath = path.join(process.cwd(), "public/mocks/products.json");

export async function GET() {
  try {
    const shops = await fsPromises.readFile(shopsFilePath, "utf-8");
    const json = JSON.parse(shops);
    return NextResponse.json(json);
  } catch {
    return new NextResponse(JSON.stringify({ message: "No shops found!" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const shops = await fsPromises.readFile(shopsFilePath, "utf-8");
    const jsonArray = JSON.parse(shops);
    const { id, name, description, logo } = await req.json();
    const shopIndex = jsonArray.findIndex((shop: ShopProps) => shop.id === id);
    if (shopIndex < 0) {
      return new NextResponse(JSON.stringify({ message: "Shop not found!" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }
    const desiredShop = jsonArray[shopIndex];

    desiredShop.name = name ? name : desiredShop.name;
    desiredShop.description = description
      ? description
      : desiredShop.description;
    desiredShop.logo = logo ? logo : desiredShop.logo;

    jsonArray[shopIndex] = desiredShop;

    const updatedData = JSON.stringify(jsonArray);

    await fsPromises.writeFile(shopsFilePath, updatedData);

    return new NextResponse(
      JSON.stringify({ message: "Shop patched successfully!" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const shops = await fsPromises.readFile(shopsFilePath, "utf-8");

    const jsonArray = JSON.parse(shops);

    const { name, description, logo } = await req.json();

    const id = crypto.randomBytes(16).toString("hex");

    jsonArray.push({ id, name, description, logo });

    const updatedData = JSON.stringify(jsonArray);
    await fsPromises.writeFile(shopsFilePath, updatedData);

    return new NextResponse(
      JSON.stringify({ message: "Shop created successfully!" }),
      { status: 201, headers: { "content-type": "application/json" } }
    );
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const shops = await fsPromises.readFile(shopsFilePath, "utf-8");
    const shopsArray = JSON.parse(shops);

    const shopIndex = shopsArray.findIndex((shop: ShopProps) => shop.id === id);

    if (shopIndex < 0) {
      return new NextResponse(JSON.stringify({ message: "Shop not found!" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    const products = await fsPromises.readFile(productsFilePath, "utf-8");
    const productsArray = JSON.parse(products);
    const shopHasProducts = productsArray.some(
      (product: ProductProps) => product.shop === id
    );

    if (shopHasProducts) {
      return new NextResponse(
        JSON.stringify({
          message:
            "Shop has active products. Please remove or reassign products before deletion.",
        }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    shopsArray.splice(shopIndex, 1);

    const updatedShopsData = JSON.stringify(shopsArray);
    await fsPromises.writeFile(shopsFilePath, updatedShopsData);

    return new NextResponse(
      JSON.stringify({ message: "Shop deleted successfully!" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
