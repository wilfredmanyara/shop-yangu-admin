import { MouseEventHandler, ReactNode } from "react";

export interface ProductProps {
    id: string;
    shop: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    image: string;
}

export interface ShopProps {
    id: string;
    name: string;
    description: string;
    logo: string;
}

export interface CustomButtonProps {
    isDisabled?: boolean;
    btnType?: "button" | "submit";
    containerStyles?: string;
    textStyles?: string;
    title: string;
    rightIcon?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
  }