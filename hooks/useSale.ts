import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createSale,
  deleteSale,
  getAllSale,
  getSaleById,
  updateSale,
} from "../api/sale";

export const useCreateSale = () => {
  return useMutation({
    mutationFn: createSale,
  });
};

export const useGetSaleById = (id: string) => {
  return useQuery({
    queryKey: ["Sale", id],
    queryFn: () => getSaleById(id),
    enabled: !!id,
  });
};

export const useUpdateSale = () => {
  return useMutation({
    mutationFn: updateSale,
  });
};

export const useDeleteSale = () => {
  return useMutation({
    mutationFn: deleteSale,
  });
};

export const useGetAllSale = () => {
  return useQuery({
    queryKey: ["Sale"],
    queryFn: getAllSale,
  });
};
