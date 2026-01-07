import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, deleteProduct, getAllProduct, getProductById, updateProduct } from "../api/product";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["Product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: updateProduct,
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProduct,
  });
};

export const useGetAllProduct = () => {
  return useQuery({
    queryKey: ["Product"],
    queryFn: getAllProduct,
  });
};
