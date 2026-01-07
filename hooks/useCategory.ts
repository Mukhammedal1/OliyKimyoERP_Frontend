import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../api/category";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
  });
};

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ["Category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: updateCategory,
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: deleteCategory,
  });
};

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ["Category"],
    queryFn: getAllCategory,
  });
};
