import { useMutation } from "@tanstack/react-query";
import { refreshToken, signIn, signOut } from "../api/admin_auth";

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: signOut,
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshToken,
  });
};
