import { toast } from "react-toastify";
import instance from "./instance";
import { Supplier, UpdateInterface } from "../utils/types";

export const createSupplier = async (data: Supplier) => {
  try {
    const res = await instance.post("/supplier", data);
    // toast.success("supplier added");
    return res.data;
  } catch (e) {
    // toast.error("supplier not added");
  }
};

export const getAllSupplier = async () => {
  try {
    const res = await instance.get("/supplier");
    return res.data;
  } catch (e) {
    // toast.error("failed to fetch supplier");
  }
};

export const getSupplierById = async (id: string) => {
  try {
    const res = await instance.get(`/supplier/${id}`);
    return res.data;
  } catch (e) {
    toast.error("supplier not found");
  }
};

export const updateSupplier = async ({ id, data }: UpdateInterface) => {
  try {
    const res = await instance.patch(`/supplier/${id}`, data);
    // toast.success("supplier updated");
    return res.data;
  } catch (e) {
    // toast.error("supplier not updated");
  }
};

export const deleteSupplier = async (id: string) => {
  try {
    const res = await instance.delete(`/supplier/${id}`);
    // toast.success("supplier deleted");
    return res.data;
  } catch (e) {
    // toast.error("supplier not deleted");
  }
};
