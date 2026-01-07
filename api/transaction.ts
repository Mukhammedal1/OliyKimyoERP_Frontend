import { toast } from "react-toastify";
import instance from "./instance";
import { Supplier, Transaction, UpdateInterface } from "../utils/types";

export const createTransaction = async (data: Transaction) => {
  try {
    const res = await instance.post("/transactions", data);
    // toast.success("transaction added");
    return res.data;
  } catch (e) {
    throw e
  }
};

export const getAllTransaction = async () => {
  try {
    const res = await instance.get("/transactions");
    return res.data;
  } catch (e) {
    toast.error("failed to fetch transaction");
  }
};

export const getTransactionById = async (id: string) => {
  try {
    const res = await instance.get(`/transactions/${id}`);
    return res.data;
  } catch (e) {
    toast.error("transaction not found");
  }
};

export const updateTransaction = async ({ id, data }: UpdateInterface) => {
  try {
    const res = await instance.patch(`/transactions/${id}`, data);
    // toast.success("transaction updated");
    return res.data;
  } catch (e) {
    // toast.error("transaction not updated");
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    const res = await instance.delete(`/transactions/${id}`);
    // toast.success("transaction deleted");
    return res.data;
  } catch (e) {
    // toast.error("transaction not deleted");
  }
};
