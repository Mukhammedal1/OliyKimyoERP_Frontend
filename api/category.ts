import { toast } from "react-toastify";
import { Category, UpdateInterface } from "../utils/types";
import instance from "./instance";

export const createCategory = async (data: Category) => {
  try {
    const res = await instance.post("/category", data);
    return res.data;
  } catch (e) {
    throw e
  }
};

export const getAllCategory = async () => {
  try {
    const res = await instance.get("/category");
    return res.data;
  } catch (e) {
    toast.error("failed to fetch category");
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const res = await instance.get(`/category/${id}`);
    return res.data;
  } catch (e) {
    toast.error("category not found");
  }
};

export const updateCategory = async ({ id, data }: UpdateInterface) => {
  try {
    const res = await instance.patch(`/category/${id}`, data);
    return res.data;
  } catch (e) {
   throw e
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const res = await instance.delete(`/category/${id}`);
    return res.data;
  } catch (e) {
    throw e
  }
};
