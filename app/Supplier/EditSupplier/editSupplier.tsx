import React, { useEffect, useState } from "react";
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
} from "./editSupplier.style";
import {
  useGetCustomerById,
  useUpdateCustomer,
} from "../../../hooks/useCustomer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spinner from "../../../components/LoadingComponent/loading";
import { useGetSupplierById, useUpdateSupplier } from "../../../hooks/useSupplier";

const EditSupplierPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useGetSupplierById(id as string);
  const { mutate: updateSupplier } = useUpdateSupplier();
  const [supplierData, setSupplierData] = useState({
    _id: "",
    name: "",
    phone_number: "",
    debt_amount: 0,
  });

  useEffect(() => {
    if (data) {
      setSupplierData({
        _id: data._id || "",
        name: data.name || "",
        phone_number: data.phone_number || "",
        debt_amount: data.debt_amount || 0,
      });
    }
  }, [data]);

  const handleUpdateSupplier = () => {
    if (!supplierData.name)
      return toast.error("Iltimos, Kompaniya nomini kiriting");
    if (!supplierData.phone_number)
      return toast.error("Iltimos, Kompaniya telefon raqamini kiriting");

    updateSupplier(
      {
        id: supplierData._id,
        data: {
          name: supplierData.name,
          phone_number: supplierData.phone_number,
          debt_amount: Number(supplierData.debt_amount) || 0,
        },
      },
      {
        onSuccess: () => {
          toast.success("Hamkor ma'lumotlari saqlandi");
          router.push("/supplier");
        },
        onError: () => toast.error("Malumotlarni yangilashda xatolik"),
      }
    );
  };

  const handleCancel = () => router.push("/supplier");


  return (
    <Container>
      <NavWrapper>
        <span>Hamkorni tahrirlash</span>
        <ProfileWrapper>
          <p>Muhammadali</p>
          <ProfileIconWrapper>
            <ProfileIcon />
          </ProfileIconWrapper>
        </ProfileWrapper>
      </NavWrapper>
      {isLoading || !data || !supplierData ? (
        <Spinner />
      ) : (
        <div>
          <ContentWrapper>
            <InputWrapper>
              <p>Hamkor komaniya nomi</p>
              <Input>
                <input
                  type="text"
                  placeholder="Hamkor kompaniya nomi..."
                  value={supplierData.name}
                  onChange={(e) =>
                    setSupplierData({ ...supplierData, name: e.target.value })
                  }
                />
              </Input>
            </InputWrapper>

            <InputWrapper>
              <p>Hamkor kompaniya telefon raqami</p>
              <Input>
                <input
                  type="tel"
                  placeholder="Kompaniya telefon raqami..."
                  maxLength={9}
                  value={supplierData.phone_number}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,9}$/.test(value)) {
                      setSupplierData({ ...supplierData, phone_number: value });
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
                  placeholder="Kompaniyamiz qarz miqdori..."
                  min={0}
                  value={supplierData.debt_amount}
                  onChange={(e) =>
                    setSupplierData({
                      ...supplierData,
                      debt_amount: Number(e.target.value),
                    })
                  }
                />
              </Input>
            </InputWrapper>
          </ContentWrapper>

          <ButtonWrapper>
            <button onClick={handleUpdateSupplier}>Saqlash</button>
            <button onClick={handleCancel}>Bekor qilish</button>
          </ButtonWrapper>
        </div>
      )}
    </Container>
  );
};

export default EditSupplierPage;
