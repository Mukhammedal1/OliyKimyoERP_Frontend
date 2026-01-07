import { useMutation, useQuery } from "@tanstack/react-query";
import { createSupplier, deleteSupplier, getAllSupplier, getSupplierById, updateSupplier } from "../api/supplier";



export const useCreateSupplier = () => {
  return useMutation({
    mutationFn: createSupplier,
  });
};

export const useGetSupplierById = (id: string) => {
  return useQuery({
    queryKey: ["Supplier", id],
    queryFn: () => getSupplierById(id),
    enabled: !!id,
  });
};

export const useUpdateSupplier = () => {
  return useMutation({
    mutationFn: updateSupplier,
  });
};

export const useDeleteSupplier = () => {
  return useMutation({
    mutationFn: deleteSupplier,
  });
};

export const useGetAllSupplier = () => {
  return useQuery({
    queryKey: ["Supplier"],
    queryFn: getAllSupplier,
  });
};
