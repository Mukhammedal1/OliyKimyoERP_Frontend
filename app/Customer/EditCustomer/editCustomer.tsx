import React, { useEffect, useState } from "react";
import ProfileIcon from "../../../icons/profile-icon";
import {
  ButtonWrapper,
  Container,
  ContentWrapper,
  Input,
  InputWrapper,
  NavWrapper,
  NoteWrapper,
  ProfileIconWrapper,
  ProfileWrapper,
} from "./editCustomer.style";
import {
  useGetCustomerById,
  useUpdateCustomer,
} from "../../../hooks/useCustomer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spinner from "../../../components/LoadingComponent/loading";

const EditCustomerPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useGetCustomerById(id as string);
  const { mutate: updateCustomer } = useUpdateCustomer();
  const [customerData, setCustomerData] = useState({
    _id: "",
    name: "",
    phone_number: "",
    debt_amount: 0,
    note: "",
  });

  useEffect(() => {
    if (data) {
      setCustomerData({
        _id: data._id || "",
        name: data.name || "",
        phone_number: data.phone_number || "",
        debt_amount: data.debt_amount || 0,
        note: data.note || "",
      });
    }
  }, [data]);

  const handleUpdateCustomer = () => {
    if (!customerData.name)
      return toast.error("Iltimos, Mijoz ismini kiriting");
    if (!customerData.phone_number)
      return toast.error("Iltimos, Mijoz telefon raqamini kiriting");

    updateCustomer(
      {
        id: customerData._id,
        data: {
          name: customerData.name,
          phone_number: customerData.phone_number,
          debt_amount: Number(customerData.debt_amount) || 0,
          note: customerData.note,
        },
      },
      {
        onSuccess: () => {
          toast.success("Mijoz ma'lumotlari saqlandi");
          router.push("/customer");
        },
        onError: () => toast.error("Malumotlarni yangilashda xatolik"),
      }
    );
  };

  const handleCancel = () => router.push("/customer");

  //   if (isLoading || !data) return <Spinner />;

  return (
    <Container>
      <NavWrapper>
        <span>Mijozni tahrirlash</span>
        <ProfileWrapper>
          <p>Muhammadali</p>
          <ProfileIconWrapper>
            <ProfileIcon />
          </ProfileIconWrapper>
        </ProfileWrapper>
      </NavWrapper>
      {isLoading || !data || !customerData ? (
        <Spinner />
      ) : (
        <div>
          <ContentWrapper>
            <InputWrapper>
              <p>Mijoz ismi</p>
              <Input>
                <input
                  type="text"
                  placeholder="Mijoz ismi..."
                  value={customerData.name}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, name: e.target.value })
                  }
                />
              </Input>
            </InputWrapper>

            <InputWrapper>
              <p>Mijoz telefon raqami</p>
              <Input>
                <input
                  type="tel"
                  placeholder="Mijoz telefon raqami..."
                  maxLength={9}
                  value={customerData.phone_number}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,9}$/.test(value)) {
                      setCustomerData({ ...customerData, phone_number: value });
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
                  value={customerData.debt_amount}
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      debt_amount: Number(e.target.value),
                    })
                  }
                />
              </Input>
            </InputWrapper>
            <InputWrapper>
              <p>Izoh</p>
              <NoteWrapper>
                <textarea
                  value={customerData.note}
                  onChange={(e) => {
                    setCustomerData({ ...customerData, note: e.target.value });
                  }}
                  name=""
                  id=""
                  placeholder="Izoh..."
                ></textarea>
              </NoteWrapper>
            </InputWrapper>
          </ContentWrapper>

          <ButtonWrapper>
            <button onClick={handleUpdateCustomer}>Saqlash</button>
            <button onClick={handleCancel}>Bekor qilish</button>
          </ButtonWrapper>
        </div>
      )}
    </Container>
  );
};

export default EditCustomerPage;
