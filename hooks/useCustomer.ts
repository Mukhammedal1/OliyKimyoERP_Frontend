import { useMutation, useQuery } from "@tanstack/react-query";
import { createCustomer, deleteCustomer, getAllCustomer, getCustomerById, updateCustomer } from "../api/customer";



export const useCreateCustomer = () => {
  return useMutation({
    mutationFn: createCustomer,
  });
};

export const useGetCustomerById = (id: string) => {
  return useQuery({
    queryKey: ["Customer", id],
    queryFn: () => getCustomerById(id),
    enabled: !!id,
  });
};

export const useUpdateCustomer = () => {
  return useMutation({
    mutationFn: updateCustomer,
  });
};

export const useDeleteCustomer = () => {
  return useMutation({
    mutationFn: deleteCustomer,
  });
};

export const useGetAllCustomer = () => {
  return useQuery({
    queryKey: ["Customer"],
    queryFn: getAllCustomer,
  });
};
