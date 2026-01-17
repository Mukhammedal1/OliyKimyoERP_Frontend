import { toast } from "react-toastify";
import instance from "./instance";
import { Sale, UpdateInterface } from "../utils/types";

export const createSale = async (data: Sale) => {
  try {
    const res = await instance.post("/sale", data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getAllSale = async () => {
  try {
    const res = await instance.get("/sale");
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getAllSaleByCustomerId = async (id: string) => {
  try {
    const res = await instance.get(`/sale/customerSales/${id}`);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getSaleById = async (id: string) => {
  try {
    const res = await instance.get(`/sale/${id}`);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const updateSale = async ({ id, data }: UpdateInterface) => {
  try {
    const res = await instance.patch(`/sale/${id}`, data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const deleteSale = async (id: string) => {
  try {
    const res = await instance.delete(`/sale/${id}`);
    return res.data;
  } catch (e) {
    throw e;
  }
};
