import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createSale,
  deleteSale,
  getAllSale,
  getSaleById,
  updateSale,
} from "../api/sale";
import { createPurchase, deletePurchase, getAllPurchase, getPurchaseById, updatePurchase } from "../api/purchase";

export const useCreatePurchase = () => {
  return useMutation({
    mutationFn: createPurchase,
  });
};

export const useGetPurchaseById = (id: string) => {
  return useQuery({
    queryKey: ["Purchase", id],
    queryFn: () => getPurchaseById(id),
    enabled: !!id,
  });
};

export const useUpdatePurchase = () => {
  return useMutation({
    mutationFn: updatePurchase,
  });
};

export const useDeletePurchase = () => {
  return useMutation({
    mutationFn: deletePurchase,
  });
};

export const useGetAllPurchase = () => {
  return useQuery({
    queryKey: ["Purchase"],
    queryFn: getAllPurchase,
  });
};
