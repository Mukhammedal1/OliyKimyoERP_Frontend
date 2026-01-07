import { toast } from "react-toastify";
import instance from "./instance";
import { Purchase, Sale, UpdateInterface } from "../utils/types";

export const createPurchase = async (data: Purchase) => {
  try {
    const res = await instance.post("/purchase", data);
    // toast.success("purchase added");
    return res.data;
  } catch (e) {
    toast.error("purchase not added");
  }
};

export const getAllPurchase = async () => {
  try {
    const res = await instance.get("/purchase");
    return res.data;
  } catch (e) {
    toast.error("failed to fetch purchase");
  }
};

export const getPurchaseById = async (id: string) => {
  try {
    const res = await instance.get(`/purchase/${id}`);
    return res.data;
  } catch (e) {
    toast.error("purchase not found");
  }
};

export const updatePurchase = async ({ id, data }: UpdateInterface) => {
  try {
    const res = await instance.patch(`/purchase/${id}`, data);
    // toast.success("purchase updated");
    return res.data;
  } catch (e) {
    toast.error("purchase not updated");
  }
};

export const deletePurchase = async (id: string) => {
  try {
    const res = await instance.delete(`/purchase/${id}`);
    // toast.success("purchase deleted");
    return res.data;
  } catch (e) {
    toast.error("purchase not deleted");
  }
};
