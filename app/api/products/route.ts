import { NextRequest, NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";
import { ProductProps } from "@/types";
import crypto from "crypto";

const productsFilePath = path.join(process.cwd(), "public/mocks/products.json");

export async function GET() {
  try {
    const products = await fsPromises.readFile(productsFilePath, "utf-8");
    const json = JSON.parse(products);
    return NextResponse.json(json);
  } catch {
    return new NextResponse(JSON.stringify({ message: "No products found!" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const products = await fsPromises.readFile(productsFilePath, "utf-8");
    const jsonArray = JSON.parse(products);
    const { id, name, price, stock, description, image, shop } =
      await req.json();
    const productIndex = jsonArray.findIndex(
      (product: ProductProps) => product.id === id
    );
    if (productIndex < 0) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found!" }),
        { status: 404, headers: { "content-type": "application/json" } }
      );
    }
    const desiredProduct = jsonArray[productIndex];

    desiredProduct.name = name ? name : desiredProduct.name;
    desiredProduct.price = price ? price : desiredProduct.price;
    desiredProduct.stock = stock ? stock : desiredProduct.stock;
    desiredProduct.description = description
      ? description
      : desiredProduct.description;
    desiredProduct.image = image ? image : desiredProduct.image;
    desiredProduct.shop = shop ? shop : desiredProduct.shop;

    jsonArray[productIndex] = desiredProduct;

    const updatedData = JSON.stringify(jsonArray);

    await fsPromises.writeFile(productsFilePath, updatedData);

    return new NextResponse(
      JSON.stringify({ message: "Product patched successfully!" }),
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
    const products = await fsPromises.readFile(productsFilePath, "utf-8");

    const jsonArray = JSON.parse(products);

    const { name, price, stock, description, image, shop } = await req.json();

    const id = crypto.randomBytes(16).toString("hex");

    jsonArray.push({ id, name, price, stock, description, image, shop });

    const updatedData = JSON.stringify(jsonArray);
    await fsPromises.writeFile(productsFilePath, updatedData);

    return new NextResponse(
      JSON.stringify({ message: "Product created successfully!" }),
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

    const products = await fsPromises.readFile(productsFilePath, "utf-8");

    const jsonArray = JSON.parse(products);

    const productIndex = jsonArray.findIndex(
      (product: ProductProps) => product.id === id
    );

    if (productIndex < 0) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found!" }),
        { status: 404, headers: { "content-type": "application/json" } }
      );
    }

    jsonArray.splice(productIndex, 1);

    const updatedData = JSON.stringify(jsonArray);

    await fsPromises.writeFile(productsFilePath, updatedData);

    return new NextResponse(
      JSON.stringify({ message: "Product deleted successfully!" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
