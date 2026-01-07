import { toast } from "react-toastify";
import instance from "./instance";
import { Customer, Product, UpdateInterface } from "../utils/types";

export const createProduct = async (data: Product) => {
  try {
    const res = await instance.post("/products", data);
    // toast.success("product added");
    return res.data;
  } catch (e) {
    toast.error("product not added");
  }
};

export const getAllProduct = async () => {
  try {
    const res = await instance.get("/products");
    return res.data;
  } catch (e) {
    toast.error("failed to fetch product");
  }
};

export const getProductById = async (id: string) => {
  try {
    const res = await instance.get(`/products/${id}`);
    return res.data;
  } catch (e) {
    toast.error("product not found");
  }
};

export const updateProduct = async ({ id, data }: UpdateInterface) => {
  try {
    const res = await instance.patch(`/products/${id}`, data);
    // toast.success("product updated");
    return res.data;
  } catch (e) {
    toast.error("product not updated");
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await instance.delete(`/products/${id}`);
    // toast.success("product deleted");
    return res.data;
  } catch (e) {
    toast.error("product not deleted");
  }
};
