import { toast } from "react-toastify";
import instance from "./instance";
import { Customer, UpdateInterface } from "../utils/types";

export const createCustomer = async (data: Customer) => {
  try {
    const res = await instance.post("/customers", data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getAllCustomer = async () => {
  try {
    const res = await instance.get("/customers");
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getCustomerById = async (id: string) => {
  try {
    const res = await instance.get(`/customers/${id}`);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const updateCustomer = async ({ id, data }: UpdateInterface) => {
  try {
    const res = await instance.patch(`/customers/${id}`, data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const deleteCustomer = async (id: string) => {
  try {
    const res = await instance.delete(`/customers/${id}`);
    return res.data;
  } catch (e) {
    throw e;
  }
};
