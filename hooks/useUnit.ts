import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createUnit,
  deleteUnit,
  getAllUnit,
  getUnitById,
  updateUnit,
} from "../api/unit";

export const useCreateUnit = () => {
  return useMutation({
    mutationFn: createUnit,
  });
};

export const useGetUnitById = (id: string) => {
  return useQuery({
    queryKey: ["Unit", id],
    queryFn: () => getUnitById(id),
    enabled: !!id,
  });
};

export const useUpdateUnit = () => {
  return useMutation({
    mutationFn: updateUnit,
  });
};

export const useDeleteUnit = () => {
  return useMutation({
    mutationFn: deleteUnit,
  });
};

export const useGetAllUnit = () => {
  return useQuery({
    queryKey: ["Unit"],
    queryFn: getAllUnit,
  });
};
