import React, { useState } from "react";
import ProfileIcon from "../../../icons/profile-icon";
import {
  ButtonWrapper,
  Container,
  ContentWrapper,
  Input,
  InputWrapper,
  NavWrapper,
  ProfileIconWrapper,
  ProfileWrapper,
} from "./addCustomer.style";
import { useCreateCustomer } from "../../../hooks/useCustomer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AddCustomerPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [debt_amount, setDebtAmount] = useState("");

  const { mutate: createCustomer, isPending } = useCreateCustomer();

  const handleCreateCustomer = async () => {
    if (!name) {
      toast.error("Iltimos, Mijoz ismini kiriting");
      return;
    }
    if (!phone_number) {
      toast.error("Iltimos, Mijoz telefon raqamini kiriting");
      return;
    }
    createCustomer(
      {
        name,
        phone_number,
        debt_amount: Number(debt_amount) || 0,
      },
      {
        onSuccess: () => {
          toast.success("Mijoz qo'shildi");
          router.push("/customer");
        },
        onError: (e: any) => {
          toast.error(
            Array.isArray(e.response?.data?.message)
              ? e.response.data.message.join(", ")
              : e.response?.data?.message
          );
        },
      }
    );
  };

  const handleCancel = () => {
    router.push("/customer");
  };

  return (
    <Container>
      <NavWrapper>
        <span>Mijoz qo'shish</span>
        <ProfileWrapper>
          <p>Muhammadali</p>
          <ProfileIconWrapper>
            <ProfileIcon />
          </ProfileIconWrapper>
        </ProfileWrapper>
      </NavWrapper>
      <ContentWrapper>
        <InputWrapper>
          <p>Mijoz ismi</p>
          <Input>
            <input
              type="text"
              placeholder="Mijoz ismi..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Input>
        </InputWrapper>
        <InputWrapper>
          <p>Mijoz telefon raqami</p>
          <Input>
            <input
              type="tel"
              placeholder="90 123 45 67"
              maxLength={9}
              minLength={9}
              value={phone_number}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,9}$/.test(value)) {
                  setPhoneNumber(value);
                }
              }}
            />
          </Input>
        </InputWrapper>
        <InputWrapper>
          <p>Mijoz qarz miqdori</p>
          <Input>
            <input
              type="number"
              placeholder="Mijoz qarz miqdori..."
              min={0}
              value={debt_amount}
              onChange={(e) => {
                setDebtAmount(e.target.value);
              }}
            />
          </Input>
        </InputWrapper>
      </ContentWrapper>
      <ButtonWrapper>
        <button onClick={handleCreateCustomer}>
          {isPending ? "Saqlanmoqda..." : "Qo'shish"}
        </button>
        <button onClick={handleCancel}>Bekor qilish</button>
      </ButtonWrapper>
    </Container>
  );
};

export default AddCustomerPage;
