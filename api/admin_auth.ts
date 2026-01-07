import { toast } from "react-toastify";
import instance from "./instance";

interface SignInData {
  login: string;
  password: string;
}

interface RefreshTokenData {
  adminId: string;
}

export const signIn = async (data: SignInData) => {
  try {
    const res = await instance.post("/admin_auth/signin", data);
    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("adminId", res.data.adminId);
    return res.data;
  } catch (e: any) {
    throw e
  }
};

export const signOut = async () => {
  try {
    const adminId = localStorage.getItem("adminId");
    await instance.post("/admin_auth/signout", { adminId });
    localStorage.removeItem("access_token");
    localStorage.removeItem("adminId");
    // toast.success("Logged out");
  } catch (e) {
    toast.error("Logout xato");
  }
};

export const refreshToken = async () => {
  try {
    const adminId = localStorage.getItem("adminId");
    const res = await instance.post("/admin_auth/refresh", { adminId });
    localStorage.setItem("access_token", res.data.access_token);
    return res.data;
  } catch (e) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("adminId");
    toast.error("Session expired. Qayta login qiling.");
    throw e;
  }
};
