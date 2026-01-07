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
} from "./addSupplier.style";
import { useCreateCustomer } from "../../../hooks/useCustomer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useCreateSupplier } from "../../../hooks/useSupplier";

const AddSupplierPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [debt_amount, setDebtAmount] = useState("");

  const { mutate: createSupplier } = useCreateSupplier();

  const handleCreateSupplier = async () => {
    if (!name) {
      toast.error("Iltimos, Kompaniya nomini kiriting");
      return;
    }
    if (!phone_number) {
      toast.error("Iltimos, Kompaniya telefon raqamini kiriting");
      return;
    }
    createSupplier(
      {
        name,
        phone_number,
        debt_amount: Number(debt_amount) || 0,
      },
      {
        onSuccess: () => {
          toast.success("Hamkor qo'shildi");
          router.push("/supplier");
        },
        onError: () => {
          toast.error("Hamkorni qo'shishda xatolik");
        },
      }
    );
  };

  const handleCancel = () => {
    router.push("/supplier");
  };

  return (
    <Container>
      <NavWrapper>
        <span>Hamkor qo'shish</span>
        <ProfileWrapper>
          <p>Muhammadali</p>
          <ProfileIconWrapper>
            <ProfileIcon />
          </ProfileIconWrapper>
        </ProfileWrapper>
      </NavWrapper>
      <ContentWrapper>
        <InputWrapper>
          <p>Hamkor kompaniya nomi</p>
          <Input>
            <input
              type="text"
              placeholder="Kompaniya nomi..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Input>
        </InputWrapper>
        <InputWrapper>
          <p>Hamkor kompaniya telefon raqami</p>
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
          <p>Kompaniyamiz qarz miqdori</p>
          <Input>
            <input
              type="number"
              placeholder="Qarz miqdori..."
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
        <button onClick={handleCreateSupplier}>Qo'shish</button>
        <button onClick={handleCancel}>Bekor qilish</button>
      </ButtonWrapper>
    </Container>
  );
};

export default AddSupplierPage;
