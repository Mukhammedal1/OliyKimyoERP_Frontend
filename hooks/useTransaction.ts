import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createTransaction,
  deleteTransaction,
  getAllTransaction,
  getTransactionById,
  updateTransaction,
} from "../api/transaction";

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: createTransaction,
  });
};

export const useGetTransactionById = (id: string) => {
  return useQuery({
    queryKey: ["Transaction", id],
    queryFn: () => getTransactionById(id),
    enabled: !!id,
  });
};

export const useUpdateTransaction = () => {
  return useMutation({
    mutationFn: updateTransaction,
  });
};

export const useDeleteTransaction = () => {
  return useMutation({
    mutationFn: deleteTransaction,
  });
};

export const useGetAllTransaction = () => {
  return useQuery({
    queryKey: ["Transaction"],
    queryFn: getAllTransaction,
  });
};
