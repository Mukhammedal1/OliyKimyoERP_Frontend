import { toast } from "react-toastify";
import { Category, Unit, UpdateInterface } from "../utils/types";
import instance from "./instance";

export const createUnit = async (data: Unit) => {
  try {
    const res = await instance.post("/units", data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getAllUnit = async () => {
  try {
    const res = await instance.get("/units");
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getUnitById = async (id: string) => {
  try {
    const res = await instance.get(`/units/${id}`);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const updateUnit = async ({ id, data }: UpdateInterface) => {
  try {
    const res = await instance.patch(`/units/${id}`, data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const deleteUnit = async (id: string) => {
  try {
    const res = await instance.delete(`/units/${id}`);
    return res.data;
  } catch (e) {
    throw encodeURIComponent;
  }
};
