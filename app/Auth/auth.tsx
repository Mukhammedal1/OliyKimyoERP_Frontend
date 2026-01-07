import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  EyeIcon,
  Input,
  InputWrapper,
  LogoWrapper,
} from "./auth.style";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignIn } from "../../hooks/useAdminAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AuthPage = () => {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: signIn, isPending } = useSignIn();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(
      {
        login,
        password,
      },
      {
        onSuccess: (data) => {
          localStorage.setItem("access_token", data.access_token);
          router.push("/dashboard");
          toast.success("Tizimga kirildi");
        },
        onError: (e: any) => {
          toast.error(e.response?.data?.message );
        },
      }
    );
  };

  return (
    <Container>
      <Card>
        <LogoWrapper>
          <img src="/logo.png" alt="" />
        </LogoWrapper>
        <form onSubmit={handleSignIn}>
          <Input
            type="text"
            placeholder="Login..."
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />

          <InputWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Parol..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <EyeIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </EyeIcon>
          </InputWrapper>
          <Button type="submit">
            {isPending ? "Tekshirilmoqda..." : "Kirish"}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default AuthPage;
