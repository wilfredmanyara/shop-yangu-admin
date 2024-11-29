import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";

const shopsFilePath = path.join(process.cwd(), "public/mocks/shops.json");
const productsFilePath = path.join(process.cwd(), "public/mocks/products.json");

export async function GET() {
  try {
    const [shopsData, productsData] = await Promise.all([
      fsPromises.readFile(shopsFilePath, "utf-8"),
      fsPromises.readFile(productsFilePath, "utf-8"),
    ]);

    const shops = JSON.parse(shopsData);
    const products = JSON.parse(productsData);

    const totalShops = shops.length;
    const totalProducts = products.length;

    const totalValue = products.reduce(
      (sum: number, product: { price: number; stock: string | number }) =>
        sum +
        (product.price || 0) * (parseInt(product.stock as string, 10) || 0),
      0
    );

    const totalStock = products.reduce(
      (sum: number, product: { stock: string | number }) =>
        sum + (parseInt(product.stock as string, 10) || 0),
      0
    );

    return NextResponse.json({
      totalShops,
      totalProducts,
      totalValue,
      totalStock,
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error processing request." }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
